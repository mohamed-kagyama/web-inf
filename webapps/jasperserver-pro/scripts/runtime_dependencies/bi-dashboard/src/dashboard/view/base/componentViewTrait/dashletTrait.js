define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var i18n = require("bundle!DashboardBundle");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

var dashletTemplate = require("text!../../../template/dashletTemplate.htm");

var dashboardWiringStandardIds = require('../../../enum/dashboardWiringStandardIds');

var dashboardComponentTypes = require('../../../enum/dashboardComponentTypes');

var OptionContainer = require("runtime_dependencies/js-sdk/src/common/component/base/OptionContainer");

var dashletToolbarButtonTemplate = require("text!../../../template/dashletToolbarButtonTemplate.htm");

var dashletToolbarTemplate = require("text!../../../template/dashletToolbarTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var log = logger.register("dashletTrait");
/**
 * @description Mixin that adds methods to ComponentView.
 * @mixin dashletTrait
 */

/**
 * Common data signal handler. Catches a signal and stores its payload in paramsModel
 * @memberof dashletTrait
 * @private
 */

function signalHandler(payload) {
  if (payload.name === dashboardWiringStandardIds.APPLY_SLOT) {
    this.updateTitle();
  } else if (_.indexOf(_.values(dashboardWiringStandardIds), payload.name) < 0) {
    if (_.isUndefined(payload.value)) {
      this.paramsModel.unset(payload.name);
    } else {
      this.paramsModel.set(payload.name, payload.value);
    }
  }
}

function format(result, params) {
  if (params && typeof params === 'string') {
    return result.replace('{' + 0 + '}', params);
  }

  params && _.each(params, function (value, idx) {
    result = result.replace('{' + idx + '}', value);
  });
  return result;
}

module.exports = {
  template: _.template(dashletTemplate),

  /**
   * Initializes properties and events.
   * @memberof dashletTrait
   * @private
   */
  _onViewInitialize: function _onViewInitialize() {
    var type = this.model.get('type');
    this.$dashlet = this.$('> .dashletContent');
    this.$content = this.$('> .dashletContent > .content');
    this.$content.addClass("hideVizLauncher");
    this.on('componentRendered', _.bind(this._toggleDashletToolbarButtons, this));
    this.on('componentRendered', function () {
      this.ready.resolve();
    }, this);
    this.paramsModel = this.model.paramsModel;
    this.listenTo(this.model, 'signal', signalHandler);

    if (this.model.lastPayload) {
      for (var key in this.model.lastPayload) {
        signalHandler.call(this, {
          name: key,
          value: this.model.lastPayload[key]
        }, this.model.lastSender[key]);
      }
    }

    if (type === dashboardComponentTypes.FREE_TEXT || type === dashboardComponentTypes.IMAGE) {
      this.listenTo(this.model, 'change:showDashletBorders', this._setDashletVisualAppearance);
      this.listenTo(this.model, 'change:borderColor', this._setDashletVisualAppearance);
    }
  },

  /**
   * Resizes component, sets it's visual appearance and initialize toolbar if necessary.
   * @memberof dashletTrait
   * @private
   */
  _onViewRender: function _onViewRender() {
    this._setDashletVisualAppearance();

    if (this.model.isVisualization()) {
      if (this.model.get('showVizSelectorIcon') === undefined) {
        this.$content.removeClass("hideVizLauncher");
      }

      this._initToolbar();

      this._setDashletToolbarVisualAppearance();
    }

    if (this.component && this.component.isFloating && this.component.isFloating()) {
      return;
    }

    _.defer(_.bind(this.resize, this));
  },

  /**
   *
   * @memberof dashletTrait
   * @private
   */
  _onViewResize: function _onViewResize() {
    if (this.component && this.component.isFloating && this.component.isFloating()) {
      return;
    }

    this.resizeContentContainer();
  },
  resizeContentContainer: function resizeContentContainer() {
    this.$content.height(this.$dashlet.height() - 2 * this.dashboardProperties.get('dashletPadding') - (this.toolbar && this.toolbar.$el.is(':visible') ? this.toolbar.$el.outerHeight(true) : 0) - (this.paginationView && this.paginationView.$el.is(':visible') ? this.paginationView.$el.outerHeight(true) : 0) - (this.component && this.component.$footer && this.component.$footer.is(':visible') ? !this.component.$footer.hasClass('fixed') ? this.component.$footer.outerHeight(true) : 0 : 0));
  },

  /**
   * Updates dashlet title
   * @memberof dashletTrait
   * @public
   */
  updateTitle: function updateTitle() {
    this.toolbar && this.toolbar.$('.innerLabel > p').text(this.model.getParametrizationResult('name', this.paramsModel.attributes, {
      tolerateMissing: true
    }));
  },
  refresh: function refresh() {
    return $.Deferred().resolve();
  },
  cancel: function cancel() {
    return $.Deferred().resolve();
  },

  /**
   * Initializes toolbar.
   * @memberof dashletTrait
   * @private
   */
  _initToolbar: function _initToolbar() {
    this.toolbar && this.toolbar.remove();
    this.toolbar = new OptionContainer({
      options: [{
        cssClass: 'maximizeDashletButton',
        action: 'maximize',
        title: i18n['dashlet.toolbar.button.maximize'],
        text: '',
        disabled: true,
        hidden: false
      }, {
        cssClass: 'text cancelDashletButton',
        action: 'cancel',
        title: i18n['dashlet.toolbar.button.cancel'],
        text: i18n['dashlet.toolbar.button.cancel'],
        hidden: true
      }, {
        cssClass: 'refreshDashletButton',
        action: 'refresh',
        title: i18n['dashlet.toolbar.button.refresh'],
        text: '',
        disabled: true,
        hidden: false
      }, {
        cssClass: 'exportDashletButton',
        action: 'export',
        title: i18n['dashlet.toolbar.button.export'],
        text: '',
        disabled: true,
        hidden: false
      }],
      contextName: 'button',
      contentContainer: '.buttons',
      mainTemplate: dashletToolbarTemplate,
      optionTemplate: dashletToolbarButtonTemplate
    });
    this.updateTitle();
    this.listenTo(this.toolbar, 'button:refresh', this._onRefreshClick);
    this.listenTo(this.toolbar, 'button:maximize', this._onMaximizeClick);
    this.listenTo(this.toolbar, 'button:cancel', this._onCancelClick);
    this.listenTo(this.model, 'change:name', this.updateTitle);
    this.$dashlet.prepend(this.toolbar.$el);
  },

  /**
   * Sets dashlet's toolbar visual appearance.
   * @memberof dashletTrait
   * @private
   */
  _setDashletToolbarVisualAppearance: function _setDashletToolbarVisualAppearance(changedAttrs) {
    if (this.toolbar) {
      this.toolbar[this.model.get('showTitleBar') ? 'show' : 'hide']();
      this.toolbar.getOptionView('refresh')[this.model.get('showRefreshButton') ? 'show' : 'hide']();
      this.toolbar.getOptionView('maximize')[this.model.get('showMaximizeButton') ? 'show' : 'hide']();
      this.toolbar.getOptionView('export')[this.model.get('showExportButton') ? 'show' : 'hide']();

      if (changedAttrs && 'showTitleBar' in changedAttrs) {
        this.resize();
      }

      if (changedAttrs && 'showVizSelectorIcon' in changedAttrs) {
        this.model.get('showVizSelectorIcon') ? this.$content.removeClass("hideVizLauncher") : this.$content.addClass("hideVizLauncher");
      }
    }
  },

  /**
   * Sets dashlet visual appearance.
   * @memberof dashletTrait
   * @private
   */
  _setDashletVisualAppearance: function _setDashletVisualAppearance() {
    this._setColors();

    this._setBorders();
  },
  _setBorders: function _setBorders() {
    var type = this.model.get('type'),
        showDashletBorders;

    switch (type) {
      case dashboardComponentTypes.FREE_TEXT:
      case dashboardComponentTypes.IMAGE:
        showDashletBorders = this.model.get('showDashletBorders');

        if (showDashletBorders) {
          this.$dashlet.css('border', '1px solid ' + this.model.get('borderColor'));
        }

        break;

      default:
        showDashletBorders = this.dashboardProperties.get('showDashletBorders');
    }

    if (!showDashletBorders) {
      this.$dashlet.css('border-width', '0');
    } else {
      this.$dashlet.css('border-width', '1px');
    }

    var margin = this.dashboardProperties.get('dashletMargin');

    if (!showDashletBorders) {
      try {
        var borderWidth = parseInt(this.$dashlet.css('border-width'), 10);
        margin -= isNaN(borderWidth) ? 0 : borderWidth;
      } catch (ex) {}
    }

    this.$el.css('padding', margin + 'px');
    this.$content.css('padding', this.dashboardProperties.get('dashletPadding') + 'px');
  },
  _setColors: function _setColors() {
    var type = this.model.get('type'),
        self = this,
        canvasColor = this.dashboardProperties.get('canvasColor'),
        titleBarColor = this.dashboardProperties.get('titleBarColor'),
        titleTextColor = this.dashboardProperties.get('titleTextColor');
    setTimeout(function () {
      switch (type) {
        case dashboardComponentTypes.REPORT:
        case dashboardComponentTypes.ADHOC_VIEW:
        case dashboardComponentTypes.WEB_PAGE_VIEW:
        case dashboardComponentTypes.CHART:
        case dashboardComponentTypes.TABLE:
        case dashboardComponentTypes.IMAGE:
        case dashboardComponentTypes.CROSSTAB:
          self.$dashlet.find('.dashletToolbar').css('background-color', titleBarColor);
          self.$dashlet.find('.dashletToolbar p').css('color', titleTextColor);
          break;
      }
    }, 0);
  },

  /**
   * Event handler.
   * @listens "button:maximize"
   * @memberof dashletTrait
   * @fires "maximise"
   * @private
   */
  _onMaximizeClick: function _onMaximizeClick() {
    if (this.model.isVisualization()) {
      this.model.set('maximized', !this.model.get('maximized'));
    }
  },

  /**
   * Enables toolbar buttons.
   * @memberof dashletTrait
   * @private
   */
  _toggleDashletToolbarButtons: function _toggleDashletToolbarButtons() {
    if (this.toolbar) {
      this.toolbar.getOptionView('refresh').enable();
      this.toolbar.getOptionView('maximize').enable();
      this.toolbar.getOptionView('export').enable();
    }
  },

  /**
   * Refreshes dashlet.
   * @memberof dashletTrait
   * @param {object} ev - jQuery event.
   * @private
   */
  _onRefreshClick: function _onRefreshClick(ev) {
    this._hideRefreshButton();

    this.refresh().always(_.bind(this._showRefreshButton, this));
  },

  /**
   * Cancel dashlet refreshing.
   * @memberof dashletTrait
   * @private
   */
  _onCancelClick: function _onCancelClick() {
    var self = this;
    this.cancel().done(function () {
      log.debug('canceled dashlet refresh');

      self._showRefreshButton();
    });
  },

  /**
   * Enables "refresh" button and hides "cancel" button.
   * @memberof dashletTrait
   * @private
   */
  _enableRefreshButton: function _enableRefreshButton() {
    if (this.toolbar) {
      this.toolbar.getOptionView('refresh').enable();
      this.toolbar.getOptionView('cancel').hide();
    }
  },

  /**
   * Disables "refresh" button and shows "cancel" button.
   * @memberof dashletTrait
   * @private
   */
  _disableRefreshButton: function _disableRefreshButton() {
    if (this.toolbar) {
      this.toolbar.getOptionView('refresh').disable();
      this.toolbar.getOptionView('cancel').show();
    }
  },

  /**
   * Hides "refresh" button and shows "cancel" button.
   * @memberof dashletTrait
   * @private
   */
  _hideRefreshButton: function _hideRefreshButton() {
    if (this.toolbar) {
      this.toolbar.getOptionView('refresh').hide();
      this.toolbar.getOptionView('cancel').show();
    }
  },

  /**
   * Shows "refresh" button and hides "cancel" button.
   * @memberof dashletTrait
   * @private
   */
  _showRefreshButton: function _showRefreshButton() {
    if (this.toolbar) {
      this.toolbar.getOptionView('refresh').show();
      this.toolbar.getOptionView('cancel').hide();
    }
  },
  _errorMessageFactory: function _errorMessageFactory(messageObj) {
    var defaultError = this.model.attributes.type === 'adhocDataView' ? i18n['dashboard.dashlet.error.adhoc.unexpected.error'] : i18n['dashboard.dashlet.error.unexpected.error'];
    return i18n['dashboard.dashlet.error.' + messageObj.errorCode] ? format(i18n['dashboard.dashlet.error.' + messageObj.errorCode], messageObj.parameters) : defaultError;
  },
  _onPropertiesChange: function _onPropertiesChange() {
    var changedAttrs = this.model.changedAttributes();

    if (changedAttrs && ('showTitleBar' in changedAttrs || 'showRefreshButton' in changedAttrs || 'showExportButton' in changedAttrs || 'showMaximizeButton' in changedAttrs || 'showVizSelectorIcon' in changedAttrs)) {
      this._setDashletToolbarVisualAppearance(changedAttrs);
    }

    this._onComponentPropertiesChange && this._onComponentPropertiesChange(changedAttrs);
  },

  /**
   * Shows error message.
   * @memberof dashletTrait
   * @private
   */
  showMessage: function showMessage(messageObj) {
    if (messageObj && messageObj.errorCode) {
      var message = this._errorMessageFactory(messageObj);

      if (message) {
        this.$('.nothingToDisplay').removeClass('hidden').show().find('.message').text(message);
      } else {
        log.warn('Unhandled message: ' + messageObj.toString());
      }
    }
  },

  /**
   * Hides error message.
   * @memberof dashletTrait
   * @private
   */
  hideMessage: function hideMessage() {
    this.$('.nothingToDisplay').addClass('hidden').hide();
  },

  /**
   * Removes toolbar.
   * @memberof dashletTrait
   * @private
   */
  _onViewRemove: function _onViewRemove() {
    this.toolbar && this.toolbar.remove();
  },
  addOverlay: function addOverlay() {
    if (!this.$overlay) {
      this.$overlay = $('<div></div>').addClass('overlay');
      this.$dashlet.prepend(this.$overlay); // Firefox issue - mousedown on scrollbar fires DOM event, which is not desired for us
      // Firefox issue - mousedown on scrollbar fires DOM event, which is not desired for us

      this.$content.on('mousedown', function (ev) {
        ev.stopPropagation();
      });
    }
  }
};

});