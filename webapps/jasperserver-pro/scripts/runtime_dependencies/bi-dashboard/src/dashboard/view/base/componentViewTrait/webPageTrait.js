define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var dashboardWiringStandardIds = require('../../../enum/dashboardWiringStandardIds');

var WebPageView = require("runtime_dependencies/js-sdk/src/common/component/webPageView/WebPageView");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function signalHandler(payload) {
  if (payload.name === dashboardWiringStandardIds.REFRESH_SLOT) {
    this.applyUrl(true);
  } else if (payload.name === dashboardWiringStandardIds.APPLY_SLOT) {
    this.applyUrl(false);
  }
}

module.exports = {
  /**
   * @memberof webPageTrait
   * @access protected
   * @desc initializes component sets url of webPage from model.
   * @listens change:url
   */
  _initComponent: function _initComponent() {
    this.component = new WebPageView({
      url: this.model.get('url'),
      scrolling: this.model.get('scroll')
    });
    this.$el.addClass('dashboardVisualization');
    this.listenTo(this.component, 'load', function () {
      this.$el.addClass('rendered');
    }, this);
    this.listenTo(this.model, 'signal', signalHandler);

    if (this.model.lastPayload) {
      for (var key in this.model.lastPayload) {
        signalHandler.call(this, {
          name: key,
          value: this.model.lastPayload[key]
        }, this.model.lastSender[key]);
      }
    }

    this.listenTo(this.model, 'change:url', this.applyUrl, this);
  },

  /**
   * @memberof webPageTrait
   * @access protected
   * @desc renders component.
   * @fires componentRendered
   */
  _renderComponent: function _renderComponent() {
    this.component.render(this.$content);
    this.trigger('componentRendered', this);
  },

  /**
   * @memberof webPageTrait
   * @access protected
   * @desc on component properties change event handler. Refreshes web page if scroll property was changed.
   */
  _onComponentPropertiesChange: function _onComponentPropertiesChange() {
    var changedAttrs = this.model.changedAttributes();

    if (changedAttrs && 'scroll' in changedAttrs) {
      this.component.setScrolling(this.model.get('scroll'));
      this.refresh();
    }
  },

  /**
   * @memberof webPageTrait
   * @access protected
   * @desc removes component.
   */
  _removeComponent: function _removeComponent() {
    this.component.remove();
  },

  /**
   * @memberof webPageTrait
   * @access protected
   * @desc Refreshes component.
   */
  refresh: function refresh() {
    this.component.refresh();
    return $.Deferred().resolve();
  },

  /**
   * @memberof webPageTrait
   * @access public
   * @desc Refreshes url depending on template and already passed values. If some values are missing, shows error popup.
   */
  applyUrl: function applyUrl(alwaysRefresh) {
    try {
      var url = this.model.getParametrizationResult('url', this.paramsModel.attributes);

      if (this.component.url !== url) {
        this.hideMessage();
        this.component.setUrl(url);
        this.component.$el.show();
      } else {
        alwaysRefresh && this.component.refresh();
      }
    } catch (errors) {
      this.showMessage({
        errorCode: 'parameter.not.specified'
      });
      this.component.$el.hide();
    }
  }
};

});