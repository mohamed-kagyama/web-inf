define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var request = require("request");

var browserDetection = require("runtime_dependencies/js-sdk/src/common/util/browserDetection");

var LoadingDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/LoadingDialog");

var Notification = require("runtime_dependencies/js-sdk/src/common/component/notification/Notification");

var ViewerToolbarView = require('./view/viewer/ViewerToolbarView');

var DashboardHeaderView = require('./view/base/DashboardHeaderView');

var DashboardMessageView = require('./view/base/DashboardMessageView');

var DashboardModel = require('./model/DashboardModel');

var Dashboard = require('../bi/dashboard/Dashboard');

var DashboardExportUtils = require('./util/DashboardExportUtils');

var dashboardSettings = require('./dashboardSettings');

var i18n = require("bundle!DashboardBundle");

var viewerDashboardContainerTemplate = require("text!./template/viewerDashboardContainerTemplate.htm");

var hyperLinkChartHelper = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/HyperlinkChartHelper");

var domUtil = require("runtime_dependencies/js-sdk/src/common/util/domUtil");

var toggleMenuTemplate = require("text!./template/toggleMenuTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Kostiantyn Tsaregradskyi, Zakhar Tomchenko, Sergii Kylypko
 * @version: $Id$
 */
var hyperlinkHelper = hyperLinkChartHelper.prototype.getHyperlink;

var createHyperlinkMixin = function createHyperlinkMixin(hyperlinkHelper) {
  return {
    getHyperlink: function getHyperlink() {
      return {
        parameters: hyperlinkHelper.apply(this, arguments),
        type: 'AdHocExecution'
      };
    }
  };
};

var hyperlinkHelperMixin = createHyperlinkMixin(hyperlinkHelper);

_.extend(hyperLinkChartHelper.prototype, hyperlinkHelperMixin);

var DashboardViewer = Backbone.View.extend({
  constructor: function constructor(options) {
    options || (options = {});

    if (!options.el || !$(options.el)[0] || !$(options.el)[0].tagName) {
      throw new Error("Container for Dashboard is not specified");
    }

    Backbone.View.apply(this, arguments);
  },
  initialize: function initialize(options) {
    this.params = options.params || {};

    if (options.referenceWidth && options.referenceHeight) {
      this._referenceSize = {
        width: options.referenceWidth,
        height: options.referenceHeight
      };
    }

    this.contextPath = options.contextPath || dashboardSettings.CONTEXT_PATH;
    (_.isUndefined(options.toolbar) || options.toolbar === true) && (this.toolbar = new ViewerToolbarView());

    if (this.toolbar) {
      this.listenTo(this.toolbar, "button:undo", this.undoParameters, this);
      this.listenTo(this.toolbar, "button:undoAll", this.undoAllParameters, this);
      this.listenTo(this.toolbar, "button:redo", this.redoParameters, this);
      this.listenTo(this.toolbar, "button:export", this.exportDashboard, this);
      this.listenTo(this.toolbar, "button:back", this.goBack, this);
    }

    this.message = new DashboardMessageView();

    this._initAdditionalVisualComponents();

    this.header = new DashboardHeaderView({
      model: this.model
    });
    this.header.setTextButton(i18n["dashboard.toggle.menu.viewingText"]);
    this.header.$('.pageHeader-title-controls.pageHeader-title-controlsRight').addClass('hidden');
    this.render();
    this.$el.parents("#dashboard").append(_.template(toggleMenuTemplate, {
      i18n: i18n
    }));
    $(window).on(window.onpagehide || window.onpagehide === null ? 'pagehide' : "unload", _.bind(this._stopHistory, this));

    this._startHistory();

    this._initPreventTextSelection('#banner', '#frame');

    this.initEventHandlers();
    domUtil.disableBackForwordCache();
  },
  render: function render() {
    this.$el.empty();

    if (this.toolbar) {
      this.$el.html(this.header.$el);
      this.header.$(".pageHeader-title-controls:not(.pageHeader-title-controlsRight)").append(this.toolbar.render().el);
      this.toolbar.$el.removeClass("column decorated primary");
    }

    this.$el.append(viewerDashboardContainerTemplate);
    this.$(".dashboardContainer").append(this.message.$el);
    this.showInitialMessage();
    return this;
  },
  showInitialMessage: function showInitialMessage() {
    this.message.show(i18n["dashboard.canvas.error.not.found"]);
  },
  initEventHandlers: function initEventHandlers() {
    var self = this,
        toggleButton = this.header.$el.find('.jr-mButton.jr-mButtonDropdown.jr-mButtonMedium.jr'),
        toggleMenu = $('.menu.toggleView'),
        toggleMenuButton = $('.menu.toggleView').find('#menuList > .leaf > .wrap'),
        menuClass = ['content', 'leaf', 'toggle', 'toggleView'],
        menuButtonClass = ['jr-mButton', 'dashboardToolbar', 'jr-mButton-label'];
    toggleButton.on('click', function () {
      self.showMenuList();
    }).on('mouseleave', function (evt) {
      self.hideMenuList(evt, menuClass);
    });
    toggleMenuButton.on('click', function (event) {
      if (!event.target.classList.contains('down')) {
        $('.menu.toggleView').addClass('hidden');
        self.openInDesignerMode();
      }
    });
    toggleMenu.on('mouseleave', function (evt) {
      self.hideMenuList(evt, menuButtonClass);
    });
  },
  showMenuList: function showMenuList() {
    var menu = $('.menu.toggleView'),
        buttonList = $('.menu.toggleView p');
    menu.hasClass('hidden') ? menu.removeClass('hidden') : '';
    buttonList.last().addClass('down');
  },
  hideMenuList: function hideMenuList(evt, menuButtonClass) {
    var target = $(evt.relatedTarget);
    var containsClass = menuButtonClass.some(function (item) {
      return target.hasClass(item);
    });

    if (!containsClass) {
      $('.menu.toggleView').addClass('hidden');
    }
  },
  _initAdditionalVisualComponents: function _initAdditionalVisualComponents() {
    this.exportLoading = new LoadingDialog({
      cancellable: true
    });
    this.initialLoading = new LoadingDialog({
      cancellable: true
    });
    this.exportLoading.on("button:cancel", this.cancelExportDashboard, this);
    this.initialLoading.on("button:cancel", function () {
      window.history.back();
    }, this);
  },
  _handleDashboardError: function _handleDashboardError(errorObj) {
    var errorMsg = i18n["dashboard.canvas.error." + errorObj.errorCode] || i18n[errorObj.xmlHttpRequest && errorObj.xmlHttpRequest.status === 404 ? "dashboard.canvas.error.not.found" : "dashboard.canvas.error.unexpected.error"];
    this.message.show(errorMsg);
    this.initialLoading && this.initialLoading.close();
  },
  _startHistory: function _startHistory() {
    this.history = new Backbone.History();
    this.history.route(/.*/, _.bind(this._onLocationHashChange, this));
    this.history.start();
  },
  _stopHistory: function _stopHistory() {
    this.history && this.history.stop();

    if (this.toolbar) {
      if (!(this.toolbar.backBtn && this.toolbar.backBtn.visible)) {
        this.dashboard && this.dashboard.destroy();
      }

      this.toolbar.backBtn = {
        visible: false
      };
    }
  },
  _initDashboard: function _initDashboard(uri, params) {
    var self = this;
    this.message.hide();

    if (this.model) {
      this.stopListening(this.model, "change:label");
    } // hack to get access to model to get dashboard label. Saves one REST server call.


    var origModelInitialize = DashboardModel.prototype.initialize;

    DashboardModel.prototype.initialize = function () {
      self.model = this;
      return origModelInitialize.apply(this, arguments);
    };

    this.dashboard = new Dashboard({
      server: this.contextPath,
      container: this.$(".dashboardContainer > .content > .body"),
      resource: uri,
      params: params || this.params,
      report: {
        chart: {
          animation: !this._referenceSize
        }
      }
    }).events({
      canUndo: function canUndo(val) {
        if (self.toolbar) {
          self.toolbar.setEnabled({
            undo: val,
            undoAll: val
          });
        }
      },
      canRedo: function canRedo(val) {
        if (self.toolbar) {
          self.toolbar.setEnabled({
            redo: val
          });
        }
      },
      __canvasReady__: function __canvasReady__() {
        self.initialLoading.close();
      }
    });
    DashboardModel.prototype.initialize = origModelInitialize;

    if (self.toolbar) {
      this.listenTo(this.model, "change:label", function () {
        self.header.setTitle(self.model.get("label"));
      });
      this.listenTo(self.toolbar, "button:filterPopup", function () {
        this.model.currentFoundation.trigger("toggle:filterDialog");
      });
      this.listenTo(this.model.currentFoundation, "close:filterDialog", function () {
        self.toolbar.closeFilterPopupDialog();
      });
    }

    this.initialLoading.open();
    this.dashboard.run().done(function () {
      self.header.setTitle(self.model.get("label"));

      if (self._showopenInDesignerButton(self.model.get('permissionMask'))) {
        self.header.$el.find('.pageHeader-title-controls.pageHeader-title-controlsRight').removeClass('hidden');
      }

      if (self.toolbar) {
        var properties = self.model.currentFoundation.components.getDashboardPropertiesComponent(),
            hasUserWiring = self.model.currentFoundation.wiring.hasUserWiring() && self.model.currentFoundation.components.getValueProducers().length;
        self.toolbar.setVisibility({
          "export": properties.get("showExportButton"),
          "filterPopup": properties.get("dashletFilterShowPopup"),
          "undo": hasUserWiring,
          "undoAll": hasUserWiring,
          "redo": hasUserWiring
        });
      } else {
        self._referenceSize && DashboardExportUtils.applyReferenceSize(self, self._referenceSize);
      }

      checkReadyness.call(self);
    }).fail(_.bind(this._handleDashboardError, this));
  },
  _initPreventTextSelection: function _initPreventTextSelection() {
    var selector = Array.prototype.slice.call(arguments, 0).join(",");

    if (browserDetection.isIE8() || browserDetection.isIE9()) {
      $(selector).on("selectstart", function (e) {
        var tagName = e.target.tagName;

        if (tagName != "INPUT" && tagName != "TEXTAREA") {
          return false;
        }
      });
    }
  },
  _onLocationHashChange: function _onLocationHashChange(hash) {
    if (!hash) {
      return;
    }

    var params = _.extend({}, this.params, DashboardViewer.parseDashboardParamsFromString(hash)),
        uri = hash.split("&")[0];

    try {
      uri = decodeURIComponent(uri);
    } catch (ex) {
      uri = undefined;
    }

    if (!uri) {
      return;
    }

    if (uri.indexOf("/") !== 0) {
      uri = "/" + uri;
    }

    if (this.dashboard) {
      if (this.model.get("uri") !== uri) {
        this.dashboard.destroy().always(_.bind(this._initDashboard, this, uri, params));
      } else {
        this.dashboard.params(params).run().fail(_.bind(this._handleDashboardError, this));
      }
    } else {
      this._initDashboard(uri, params);
    }
  },
  _showopenInDesignerButton: function _showopenInDesignerButton(permissionMask) {
    if (permissionMask === 2 || permissionMask === 18) {
      return false;
    } else {
      return true;
    }
  },
  remove: function remove() {
    $(window).off('pagehide unload');
    this.history && this.history.stop();
    this.dashboard && this.dashboard.destroy();
    this.message && this.message.remove();
    this.toolbar && this.toolbar.remove();
    this.header && this.header.remove();
    Backbone.View.prototype.remove.apply(this, arguments);
  },
  goBack: function goBack() {
    this.toolbar.backBtn = {
      visible: true
    };
    window.history.back();
  },
  openInDesignerMode: function openInDesignerMode() {
    var resource = this.model && _.extend({}, this.model.attributes),
        uri = "designer.html#";

    if (resource) {
      window.location.href = uri + encodeURIComponent(resource.uri);
    }
  },
  undoParameters: function undoParameters() {
    this.dashboard.undoParams();
  },
  undoAllParameters: function undoAllParameters() {
    this.dashboard.undoAllParams();
  },
  redoParameters: function redoParameters() {
    this.dashboard.redoParams();
  },
  exportDashboard: function exportDashboard(options) {
    var self = this,
        dfd = new $.Deferred();
    this.exportLoading.open();
    DashboardExportUtils.requestDashboardExport(this, options).done(function (data) {
      self.currentExportId = data.id;
      DashboardExportUtils.wait.call(self, self.currentExportId, dfd).done(function (result) {
        self.exportLoading.close();

        if (result.status === 'ready') {
          self.currentExportId && self._download(result.href);
        } else {
          Notification.show({
            message: i18n["dashboard.export.unexpected.error"],
            delay: 5000
          });
        }
      });
    }).fail(function () {
      self.exportLoading.close();
      Notification.show({
        message: i18n["dashboard.export.renderer.fail"],
        delay: 5000
      });
    });
  },
  cancelExportDashboard: function cancelExportDashboard() {
    var self = this;

    if (this.currentExportId) {
      return request({
        url: this.contextPath + "/rest_v2/dashboardExecutions/" + this.currentExportId,
        method: "DELETE"
      }).done(function () {
        self.currentExportId = undefined;
      }).fail(function () {
        self.currentExportId = undefined;
      });
    }

    return new $.Deferred().resolve();
  },
  _checkReadyness: checkReadyness,
  _download: function _download(url) {
    window.location.href = url;
  }
}, {
  parseDashboardParamsFromString: function parseDashboardParamsFromString(paramsSourceString) {
    var dashboardParams,
        paramsString = paramsSourceString,
        paramValuePairs = paramsString.split("&");
    dashboardParams = {};

    for (var i = 0; i < paramValuePairs.length; i++) {
      var param = decodeURIComponent(paramValuePairs[i].split("=")[0]),
          value = decodeURIComponent(paramValuePairs[i].split("=")[1]);
      dashboardParams.hasOwnProperty(param) ? dashboardParams[param].push(value) : dashboardParams[param] = [_.isUndefined(value) ? "" : value];
    }

    return dashboardParams;
  },
  readSpecifiedDashboardParameters: function readSpecifiedDashboardParameters() {
    var dashboardParams = {};

    if (window.dashboardParams) {
      dashboardParams = JSON.parse(window.dashboardParams);
    } else if (window.location.search) {
      dashboardParams = DashboardViewer.parseDashboardParamsFromString(window.location.search.toString().substring(1));
    }

    return dashboardParams;
  }
});
module.exports = DashboardViewer;

function checkReadyness() {
  var ready = !_.filter(this.$(".dashboardVisualization"), function (element) {
    return !($(element).hasClass("rendered") && $(element).find(".fusionRendering").length === 0);
  }).length;

  if (ready) {
    if (this.toolbar) {
      this.toolbar.setEnabled({
        "export": true
      });
    }

    if (this.previewToolbar) {
      this.previewToolbar.setEnabled({
        "export": true
      });
    }

    if (!this.toolbar) {
      if (this._referenceSize) {
        DashboardExportUtils.prepareForExport(this);
      }
    }

    $(document.body).addClass("rendered");
  } else {
    setTimeout(_.bind(checkReadyness, this), 1000);
  }
}

});