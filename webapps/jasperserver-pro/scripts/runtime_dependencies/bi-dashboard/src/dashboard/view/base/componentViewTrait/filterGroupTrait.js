define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var FilterGroupView = require('./../FilterGroupView');

var _ = require('underscore');

var Backbone = require('backbone');

var LoadingOverlay = require("runtime_dependencies/bi-report/src/bi/report/view/LoadingOverlay");

var dashboardSettings = require('../../../dashboardSettings');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @description Mixin that adds methods to ComponentView.
 * @mixin filterGroupTrait
 */
module.exports = {
  /**
   * Creates FilterGroupView.
   * @memberof filterGroupTrait
   * @private
   */
  _initComponent: function _initComponent() {
    this.component = new FilterGroupView({
      model: this.model,
      el: this.$content
    });

    if (this.dashboardProperties && this.dashboardProperties.get('dashletFilterShowPopup')) {
      this.component.model.set('floating', true);
    }

    this._openOverlay = 0;
    this.overlay = new LoadingOverlay({
      propertiesModel: new Backbone.Model(),
      externalContainer: this.$el,
      biComponentContainer: this.component.$el.parent(),
      biComponent: this.component.$el
    });
    this.listenTo(this.model, 'beforeChildUpdate', this.showOverlay);
    this.listenTo(this.model, 'afterChildUpdate', this.hideOverlay);
  },

  /**
   * Renders component, toggle buttons.
   * @fires "componentRendered"
   * @memberof filterGroupTrait
   * @private
   */
  _renderComponent: function _renderComponent() {
    var self = this;
    this.$content.css('overflow-x', 'hidden');
    this.component && this.component.render(); // dashboardSettings.VISUALIZE_MODE is here for not show broken ICs in Viz.js mode
    // dashboardSettings.VISUALIZE_MODE is here for not show broken ICs in Viz.js mode

    if (dashboardSettings.VISUALIZE_MODE) {
      this.$content.hide();
      this.$('.filterGroupButtons').hide();
      this.showMessage({
        errorCode: 'not.supported.in.visualize'
      });
    } // When filter dashlet is floating, we set the dashlet's styles
    // When filter dashlet is floating, we set the dashlet's styles


    if (this.model.get('floating')) {
      if (this.component && this.component.setFloatingStyle) {
        _.defer(_.bind(this.component.setFloatingStyle, self));
      }
    }

    this._toggleButtons();

    this.trigger('componentRendered', this);
  },

  /**
   * Resizes input controls width.
   * @memberof filterGroupTrait
   * @private
   */
  _resizeComponent: function _resizeComponent() {
    this.component.resizeInputControlsWidth();
  },

  /**
   * Removes component.
   * @memberof filterGroupTrait
   * @private
   */
  _removeComponent: function _removeComponent() {
    this.component.remove();
  },

  /**
   * Enables buttons.
   * @memberof filterGroupTrait
   * @private
   */
  _toggleButtons: function _toggleButtons() {
    this.component.enableButtons();
  },

  /**
   * Refreshes component.
   * @memberof filterGroupTrait
   */
  refreshFilterGroup: function refreshFilterGroup() {
    this.component.refresh();
  },
  showOverlay: function showOverlay() {
    var self = this;
    this._openOverlay++;
    setTimeout(function () {
      if (self._openOverlay) {
        self.overlay.show();
        self.overlay.$overlayHolder.css({
          width: '100%',
          height: '100%'
        });
      }
    }, 700);
  },
  hideOverlay: function hideOverlay() {
    var self = this;
    this._openOverlay--;

    if (this._openOverlay < 0) {
      this._openOverlay = 0;
    }

    _.defer(function () {
      if (!self._openOverlay) {
        self.overlay.hide();
      }
    });
  }
};

});