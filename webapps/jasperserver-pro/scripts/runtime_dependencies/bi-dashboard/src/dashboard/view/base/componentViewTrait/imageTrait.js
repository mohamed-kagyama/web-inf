define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var hyperlinkHandler = require('../../../hyperlink/handler/dashboardHyperlinkHandlerAdhocExecution');

var dashboardWiringStandardIds = require('../../../enum/dashboardWiringStandardIds');

var ImageView = require('../ImageView');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function signalHandler(payload) {
  if (payload.name === dashboardWiringStandardIds.REFRESH_SLOT) {
    this._renderComponent();
  } else if (payload.name === dashboardWiringStandardIds.APPLY_SLOT) {
    this._renderComponent();
  }
}

module.exports = {
  notify: function notify(signals) {
    this.model.notify(signals);
    this.model.collection.getDashboardPropertiesComponent().applyParameters();
  },
  _initComponent: function _initComponent() {
    var self = this;
    this.component = new ImageView({
      model: this.model,
      el: this.$content
    });
    this.$content.click(function (ev) {
      hyperlinkHandler.events.click(ev, _.reduce(self.model.get('outputParameters'), function (memo, param) {
        memo.parameters[param.id] = param.defaultValue;
        return memo;
      }, {
        parameters: {}
      }), self);
    });
    this.listenTo(this.model, 'signal', signalHandler);

    if (this.model.lastPayload) {
      for (var key in this.model.lastPayload) {
        signalHandler.call(this, {
          name: key,
          value: this.model.lastPayload[key]
        }, this.model.lastSender[key]);
      }
    }
  },

  /**
   * @memberof imageTrait
   * @access protected
   * @desc on component properties change event handler. re-Renders component after properties were changed through properties dialog.
   */
  _onComponentPropertiesChange: function _onComponentPropertiesChange(changedProperties) {
    if (!_.isEmpty(_.omit(changedProperties, 'selected'))) {
      this._renderComponent();
    }
  },
  _renderComponent: function _renderComponent() {
    var uri = this.model.getParametrizationResult('url', this.paramsModel.attributes, {
      tolerateMissing: true
    });
    this.component.render(uri);
    this.trigger('componentRendered', this);
  },
  _onRefreshClick: function _onRefreshClick() {
    this._renderComponent();
  }
};

});