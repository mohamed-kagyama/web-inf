define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var SidebarView = require('./view/designer/SidebarView');

var DashboardViewer = require('./DashboardViewer');

var DashboardHeaderView = require('./view/base/DashboardHeaderView');

var DesignerCanvasView = require('./view/designer/DesignerCanvasView');

var DesignerToolbarView = require('./view/designer/DesignerToolbarView');

var CanvasView = require('./view/base/CanvasView');

var DashboardModel = require('./model/DashboardModel');

var DashboardStateCollection = require('./collection/DashboardStateCollection');

var GridLayoutStrategy = require('./layout/GridLayoutStrategy');

var dashboardMessageBus = require('./dashboardMessageBus');

var dashboardMessageBusEvents = require('./enum/dashboardMessageBusEvents');

var sandboxFactory = require('./factory/sandboxFactory');

var welcomeTextTemplate = require("text!./template/welcomeTextTemplate.htm");

var dashboardSettings = require('./dashboardSettings');

var i18n = require("bundle!DashboardBundle");

var toggleMenuTemplate = require("text!./template/toggleMenuTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = DashboardViewer.extend({
  initialize: function initialize(options) {
    _.bindAll(this, '_onPageLeave', '_onSessionExpired', '_onUnload'); //This string is disable default collapseble handler in the core.event.bis.js.
    // This was did for proper work dashboard Designer collapseble handler


    $('#frame').off('touchend mouseup', '.minimize');
    this.contextPath = options.contextPath || dashboardSettings.CONTEXT_PATH;
    this.model = new DashboardModel({}, {
      isDesigner: true,
      contextPath: this.contextPath
    });
    this.dashboardId = this._generateDashboardId();
    sandboxFactory.get(this.dashboardId).set('dashboardModel', this.model);
    this.state = new DashboardStateCollection([], {
      model: this.model
    });
    this.strategy = new GridLayoutStrategy(this.model);
    this.header = new DashboardHeaderView({
      model: this.model
    });
    this.header.setTextButton(i18n['dashboard.toggle.menu.editingText']);
    this.sidebar = new SidebarView({
      model: this.model,
      strategy: this.strategy,
      dashboardId: this.dashboardId
    });
    this.designerCanvas = new DesignerCanvasView({
      model: this.model,
      strategy: this.strategy,
      state: this.state,
      dashboardId: this.dashboardId
    });
    this.toolbar = new DesignerToolbarView({
      model: this.model,
      state: this.state,
      dashboardId: this.dashboardId
    });
    this.canvas = new CanvasView({
      model: this.model,
      dashboardId: this.dashboardId
    });
    this.$el.parents("#dashboard").append(_.template(toggleMenuTemplate, {
      i18n: i18n
    }));

    this._initAdditionalVisualComponents(); // canvas will work as preview, we need only render functionality from it, that is why we
    // unsubscribe from from other events to improve performance and hide it


    this.canvas.stopListening();
    this.canvas.$el.hide();
    this.canvas.model = undefined;
    this.listenTo(this.toolbar, 'preview:on', _.bind(function () {
      this.enterPreviewMode();
    }, this));
    this.listenTo(this.toolbar, 'preview:off', _.bind(function () {
      this.exitPreviewMode();
    }, this));
    this.listenTo(this.toolbar, 'grid:on', _.bind(function () {
      this.showLayoutGrid();
    }, this));
    this.listenTo(this.toolbar, 'grid:off', _.bind(function () {
      this.hideLayoutGrid();
    }, this));
    this.listenTo(this.toolbar, 'dashboard:save', this._onDashboardSave);
    this.listenTo(this.toolbar, 'button:filterPopup', _.bind(function () {
      this.toggleFilterPopup();
    }, this));
    this.listenTo(this.toolbar, 'button:undo', this.undoParameters, this);
    this.listenTo(this.toolbar, 'button:undoAll', this.undoAllParameters, this);
    this.listenTo(this.toolbar, 'button:redo', this.redoParameters, this);
    this.listenTo(this.model, 'error:all', this._onAllModelErrors);
    this.listenTo(this.model, 'propertiesAvailable', _.bind(this._onDashboardPropertiesAvailable, this));
    this.listenTo(this.sidebar, 'open', _.bind(this._onSidebarToggle, this, false));
    this.listenTo(this.sidebar, 'close', _.bind(this._onSidebarToggle, this, true));
    this.listenTo(this.sidebar, 'resize', _.bind(this._onSidebarResize, this));
    this.listenTo(this.sidebar, 'resizeStop', _.bind(this._resizeComponents, this));
    this.listenTo(this.designerCanvas.model.currentFoundation, 'open:filterDialog', this.openDesignerFilterDialog);
    this.listenTo(this.designerCanvas.model.currentFoundation, 'close:filterDialog', this.closeFilterDialog);
    this.listenTo(dashboardMessageBus, dashboardMessageBusEvents.SAVE_DASHBOARD_STATE, _.bind(this.state.saveState, this.state));
    this.listenTo(dashboardMessageBus, dashboardMessageBusEvents.SESSION_EXPIRED, this._onSessionExpired);
    this.listenTo(this.toolbar, 'button:export', this.exportDashboard, this);
    this.render();
    this.initEventHandlers();

    this._startHistory();

    this._initPreventTextSelection('#banner', '#frame');

    this._checkPreviewMode();

    $(window).on(window.onpagehide || window.onpagehide === null ? 'pagehide' : 'unload', this._onUnload);
    $(window).on('beforeunload', this._onPageLeave);
    $(window).on(dashboardMessageBusEvents.SESSION_EXPIRED, this._onSessionExpired);
  },
  showInitialMessage: function showInitialMessage() {
    this.designerCanvas.message.show(_.template(welcomeTextTemplate, {
      i18n: i18n
    }));
  },
  hideMessageBox: function hideMessageBox() {
    this.designerCanvas.message.hide();
  },
  initEventHandlers: function initEventHandlers() {
    var self = this,
        toggleButton = this.header.$el.find('.jr-mButton.jr-mButtonDropdown.jr-mButtonMedium.jr'),
        toggleMenu = $('.menu.toggleView'),
        toggleMenuButton = $('.menu.toggleView p.button'),
        menuClass = ['content', 'leaf', 'toggle', 'toggleView'],
        menuButtonClass = ['jr-mButton', 'dashboardToolbar', 'jr-mButton-label'];
    toggleButton.on('click', function () {
      self.showMenuList();
    }).on('mouseleave', function (evt) {
      DashboardViewer.prototype.hideMenuList(evt, menuClass);
    });
    toggleMenuButton.on('click', function (event) {
      if (!event.target.classList.contains('down') && !event.target.hasAttribute('disabled')) {
        $('.menu.toggleView').addClass('hidden');
        self.toolbar.togglePreviewMode();
      }
    });
    toggleButton.attr('disabled', 'disabled');
    $('.menu.toggleView p:last').attr('disabled', 'disabled');
    toggleMenu.on('mouseleave', function (evt) {
      DashboardViewer.prototype.hideMenuList(evt, menuButtonClass);
    });
  },
  enterPreviewMode: function enterPreviewMode() {
    var hasUserWiring = this.model.currentFoundation.wiring.hasUserWiring() && this.model.currentFoundation.components.getValueProducers().length;
    sandboxFactory.get(this.getDashboardId()).set('previewMode', true);
    this.$el.removeClass('twoColumn').addClass('oneColumn');
    this.header.setTextButton(i18n["dashboard.toggle.menu.viewingText"]);
    this.sidebar.$el.hide();
    this.designerCanvas.filterDialog.close();
    this.designerCanvas.hide();
    this.canvas.$el.show();
    this.canvas.model = this.model.clone(this.dashboardId);

    if (hasUserWiring) {
      this.canvas.model.currentFoundation.components.on('parametersState:canUndo', _.bind(this.canUndo, this));
      this.canvas.model.currentFoundation.components.on('parametersState:canRedo', _.bind(this.canRedo, this));
      this.canRedo(false);
      this.canUndo(false);
    }

    this.toolbar.setVisibility({
      undo: hasUserWiring,
      redo: hasUserWiring,
      undoAll: hasUserWiring
    });
    this.canvas.render();
    this.canvas.applyCanvasSize();
    this.canvas.applyCanvasColor();
    this.toolbar.$el.detach().appendTo(this.header.$toolbarPlaceholder);
    this.designerCanvas.getRootElement().addClass('previewMode');
    this.canvas.model.currentFoundation.startLoadingSequence();

    this._checkReadyness();

    this._modifyUri();
  },
  exitPreviewMode: function exitPreviewMode() {
    sandboxFactory.get(this.getDashboardId()).set('previewMode', false);
    this.$el.removeClass('oneColumn').addClass('twoColumn');
    this.header.setTextButton(i18n['dashboard.toggle.menu.editingText']);
    this.designerCanvas.getRootElement().removeClass('previewMode');

    if (!this.model.currentFoundation.wiring.hasUserWiring()) {
      this.toolbar.setVisibility({
        undo: true,
        redo: true,
        undoAll: true
      });
    }

    this.canvas.$el.removeClass('previewMode');
    this.canvas.$el.removeClass('maximizedDashlet');
    this.history.navigate(this.history.getFragment().replace(/previewMode&/g, ''));
    this.canvas.filterDialog.close();
    this.canvas.$el.hide();
    this.canvas.disableAutoRefresh();
    this.canvas.removeAllComponentViews();
    this.toolbar.$el.detach().insertAfter(this.header.$el);
    this.sidebar.$el.show();
    this.designerCanvas.show();
    delete this.canvas.model;

    this._resizeComponents();

    this.sidebar.accordion.fit();
  },
  showMenuList: function showMenuList() {
    var menu = $('.menu.toggleView'),
        buttonList = $('.menu.toggleView p');
    menu.hasClass('hidden') ? menu.removeClass('hidden') : '';

    if (this.isPreviewMode()) {
      buttonList.last().addClass('down');
      buttonList.first().removeClass('down');
    } else {
      buttonList.first().addClass('down');
      buttonList.last().removeClass('down');
    }
  },
  isPreviewMode: function isPreviewMode() {
    return sandboxFactory.get(this.getDashboardId()).get('previewMode');
  },
  showLayoutGrid: function showLayoutGrid() {
    this.designerCanvas.getElement().find('.grid').show();
  },
  hideLayoutGrid: function hideLayoutGrid() {
    this.designerCanvas.getElement().find('.grid').hide();
  },
  toggleFilterPopup: function toggleFilterPopup() {
    if (this.isPreviewMode()) {
      this.canvas.filterDialog.isVisible() ? this.canvas.filterDialog.close() : this.canvas.filterDialog.open();
    } else {
      this.designerCanvas.filterDialog.isVisible() ? this.designerCanvas.filterDialog.close() : this.designerCanvas.filterDialog.open();
    }
  },
  // openDesignerFilterDialog is used to only open the dialog.
  // This prevents us from maintaining unnecessary state in FilterDialogHelper
  openDesignerFilterDialog: function openDesignerFilterDialog() {
    if (!this.designerCanvas.filterDialog.isVisible()) {
      this.designerCanvas.filterDialog.open();
      this.toolbar.trigger('filterButtonStyle:open');
    }
  },
  closeFilterDialog: function closeFilterDialog() {
    this.isPreviewMode() ? this.canvas.filterDialog.close() : this.designerCanvas.filterDialog.close();
    this.toolbar.trigger('filterButtonStyle:close');
  },
  canUndo: function canUndo(val) {
    if (this.toolbar) {
      this.toolbar.setEnabled({
        undo: val,
        undoAll: val
      });
    }

    if (this.toolbar && val) {
      this.toolbar.$('#undo, #undoAll').removeAttr('disabled').removeClass('over disabledButton');
    } else if (this.toolbar && !val) {
      this.toolbar.$('#undo, #undoAll').attr('disabled', 'disabled').addClass('disabledButton').removeClass('over');
    }
  },
  canRedo: function canRedo(val) {
    if (this.toolbar) {
      this.toolbar.setEnabled({
        redo: val
      });
    }

    if (this.toolbar && val) {
      this.toolbar.$('#redo').removeAttr('disabled').removeClass('over disabledButton');
    } else if (this.toolbar && !val) {
      this.toolbar.$('#redo').attr('disabled', 'disabled').addClass('disabledButton').removeClass('over');
    }
  },
  undoParameters: function undoParameters() {
    if (this.isPreviewMode()) {
      this.canvas.model.currentFoundation.components.popParametersState(-1);
      this.canvas.model.currentFoundation.components.getDashboardPropertiesComponent().applyParameters(true);
    } else {
      this.state.setPreviousState();
    }
  },
  undoAllParameters: function undoAllParameters() {
    if (this.isPreviewMode()) {
      this.canvas.model.currentFoundation.components.resetParametersState();
      this.canvas.model.currentFoundation.components.getDashboardPropertiesComponent().applyParameters(true);
    } else {
      this.state.setFirstState();
    }
  },
  redoParameters: function redoParameters() {
    if (this.isPreviewMode()) {
      this.canvas.model.currentFoundation.components.popParametersState(1);
      this.canvas.model.currentFoundation.components.getDashboardPropertiesComponent().applyParameters(true);
    } else {
      this.state.setNextState();
    }
  },
  _onPageLeave: function _onPageLeave(e) {
    if (this.sessionExpired) {
      //force reload without any check in case of session expiration
      return undefined;
    }

    if (this.downloading) {
      // skip checks if downloading
      this.downloading = false;
      return undefined;
    }

    if (sandboxFactory.get(this.getDashboardId()).get('disablePageLeaveConfirmation')) {
      return undefined;
    }

    if (!this.model.isNew() && this.state.hasPreviousState() || this.model.isNew() && this.model.currentFoundation.hasVisualComponents()) {
      (e || window.event).returnValue = i18n['dashboard.dialog.unsaved.changes'];
      return i18n['dashboard.dialog.unsaved.changes'];
    }
  },
  _onDashboardPropertiesAvailable: function _onDashboardPropertiesAvailable(propertiesModel) {
    this.toolbar.setVisibility({
      'filterPopup': propertiesModel.get('dashletFilterShowPopup')
    });
  },
  _generateDashboardId: function _generateDashboardId() {
    return this.model.cid;
  },
  getDashboardId: function getDashboardId() {
    return this.dashboardId;
  },
  _onDashboardSave: function _onDashboardSave() {
    this.state.init();

    this._updateLocationHash();
  },
  _updateLocationHash: function _updateLocationHash() {
    if (this.model.has('uri')) {
      var encodedUri = encodeURIComponent(this.model.get('uri'));

      if (this.isPreviewMode()) {
        this.history.navigate('previewMode&' + encodedUri, {
          trigger: false,
          replace: false
        });
      } else {
        this.history.navigate(encodedUri, {
          trigger: false,
          replace: false
        });
      }
    }
  },
  _loadModelByUri: function _loadModelByUri(uri) {
    var self = this;

    try {
      uri = decodeURIComponent(uri);
    } catch (ex) {
      uri = undefined;
    }

    if (uri && uri.indexOf('/') !== 0) {
      uri = '/' + uri;
    }

    if (uri == this.model.get('uri')) {
      return;
    }

    this.model.resetToInitialCondition();

    if (!uri) {
      this.showInitialMessage();
      this.model.currentFoundation.startLoadingSequence();
      this.state.init();
    } else {
      this.hideMessageBox();
      this.model.set({
        uri: uri
      });
      this.model.fetch().fail(function () {
        self.model.currentFoundation.startLoadingSequence();
      }).always(function () {
        self.state.init();
      });
    }
  },
  _onLocationHashChange: function _onLocationHashChange(uri) {
    var uri = uri.replace(/previewMode&/g, '');

    if (!this.model.isNew() && this.state.hasPreviousState() || this.model.isNew() && this.model.currentFoundation.hasVisualComponents()) {
      if (window.confirm(i18n['dashboard.dialog.unsaved.changes'])) {
        this._loadModelByUri(uri);
      } else {
        this.history.navigate(this.model.get('uri'), {
          trigger: false,
          replace: true
        });
      }
    } else {
      this._loadModelByUri(uri);
    }
  },
  _modifyUri: function _modifyUri() {
    if (this.history.getFragment()) {
      this.history.navigate('previewMode&' + this.history.getFragment().replace(/previewMode&/g, ''));
    }
  },
  _checkPreviewMode: function _checkPreviewMode() {
    var self = this;

    function togglePreviewMode() {
      if (self.model.currentFoundation.hasVisualComponents()) {
        self.enterPreviewMode();
      } else {
        setTimeout(togglePreviewMode, 100);
      }
    }

    if (/previewMode&/.test(this.history.getFragment())) {
      self.toolbar.togglePreviewMode();
      togglePreviewMode();
    }
  },
  _onAllModelErrors: function _onAllModelErrors(model, errorObj, xhr) {
    this.model.unset('uri');
    var errorMsg = i18n['dashboard.canvas.error.' + errorObj.errorCode] || i18n[xhr.status === 404 ? 'dashboard.canvas.error.not.found' : 'dashboard.canvas.error.unexpected.error'];
    this.designerCanvas.message.show(errorMsg);
  },
  _onSidebarToggle: function _onSidebarToggle(sidebarIsHided) {
    var $designerCanvasEl = this.designerCanvas.getElement(),
        left = this.sidebar.$contentContainer[sidebarIsHided ? 'outerWidth' : 'width']() - (sidebarIsHided ? parseInt($designerCanvasEl.css('marginLeft')) / 2 : 0);
    this.designerCanvas.getRootElement().css({
      left: left
    });
    this.toolbar.$el.css({
      left: left
    });

    this._resizeComponents();
  },
  _onSidebarResize: function _onSidebarResize(e, ui) {
    var left = ui.size.width;
    this.designerCanvas.getRootElement().css({
      left: left
    });
    this.toolbar.$el.css({
      left: left
    });
  },
  _onSessionExpired: function _onSessionExpired() {
    this.sessionExpired = true;
    window.location.reload();
  },
  _onUnload: function _onUnload() {
    var options = _.pick(this, 'sessionExpired');

    this.designerCanvas.remove(options);
  },
  _resizeComponents: function _resizeComponents() {
    _.invoke(this.designerCanvas.componentViews, 'resize');
  },
  _download: function _download(url) {
    this.downloading = true;

    DashboardViewer.prototype._download.call(this, url);
  },
  render: function render() {
    this.$el.empty();
    this.$el.html(this.header.$el); // do not render viewer canvas, because it's hidden by default. it will be rendered only when preview mode
    // will be enabled

    this.designerCanvas.render();
    this.designerCanvas.getRootElement().prepend(this.canvas.$el);
    this.toolbar.$el.insertAfter(this.header.$el);
    this.canvas.$el.addClass('column decorated primary');
    this.$el.append(this.designerCanvas.getRootElement());
    this.$el.append(this.sidebar.render().$el);
    return this;
  },
  remove: function remove() {
    this.toolbar.remove();
    this.header.remove();
    this.sidebar.remove();
    this.canvas.remove();
    this.strategy.remove();
    this.designerCanvas.remove();
    $(window).off(dashboardMessageBusEvents.SESSION_EXPIRED, this._onSessionExpired);
    $(window).off('beforeunload', this._onPageLeave);
    $(window).off('pagehide unload');
    DashboardViewer.prototype.remove.apply(this, arguments);
  }
});

});