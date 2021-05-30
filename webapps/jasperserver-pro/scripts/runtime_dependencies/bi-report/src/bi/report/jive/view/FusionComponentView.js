define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var BaseJiveComponentView = require('./BaseJiveComponentView');

var FusionCharts = require("fusioncharts");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FusionElement = function FusionElement(config) {
  this.config = config;
  this.parent = null;
  this.loader = null;
  this.fusionInstance = null;

  this._init();
};

FusionElement.prototype = {
  // internal API
  _init: function _init() {
    var self = this,
        instData = this.config.instanceData,
        fcConfig;

    if (!document.getElementById(instData.id)) {
      if (typeof window.printRequest === 'function') {
        //FIXME: is this still necessary?
        window.printRequest();
      }

      fcConfig = {
        id: instData.id,
        type: instData.type,
        width: instData.width,
        height: instData.height,
        renderAt: instData.renderAt,
        dataFormat: instData.dataFormat,
        dataSource: instData.dataSource
      }; //remove instance if it already exists
      //to avoid memory leaks
      //remove instance if it already exists
      //to avoid memory leaks

      FusionCharts.items[fcConfig.id] && FusionCharts.items[fcConfig.id].dispose();
      this.fusionInstance = new FusionCharts(fcConfig);
      this.fusionInstance.addEventListener('BeforeRender', function (event, eventArgs) {
        if (eventArgs.renderer === 'javascript') {
          event.sender.setChartAttribute('exportEnabled', '0');
        }
      });
      this.fusionInstance.addEventListener('JR_Hyperlink_Interception', function (event, eventArgs) {
        var handler;
        self.config.linksOptions.events && (handler = self.config.linksOptions.events.click);
        handler && handler.call(this, event, eventArgs);
      });
      this.fusionInstance.setTransparent(instData.transparent);
      this.fusionInstance.render();
    }
  },
  remove: function remove() {
    this.fusionInstance && this.fusionInstance.dispose();
  }
};
module.exports = BaseJiveComponentView.extend({
  render: function render($el) {
    var dfd = new $.Deferred(),
        linkOptions = this.model.collection ? this.model.collection.linkOptions : null,
        data = _.extend(this.model.toJSON(), {
      chart: _.clone(this.stateModel.get('chart'))
    });

    if (linkOptions) {
      data.linkOptions = linkOptions;
    }

    this.fusionElement = new FusionElement(data);
    dfd.resolve();
    return dfd;
  },
  remove: function remove() {
    this.fusionElement && this.fusionElement.remove();
    BaseJiveComponentView.prototype.remove.apply(this, arguments);
  }
});

});