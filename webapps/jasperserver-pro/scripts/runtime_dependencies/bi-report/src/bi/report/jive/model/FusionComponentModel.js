define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var BaseComponentModel = require('./BaseComponentModel');

var jiveTypes = require('../enum/jiveTypes');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var localLogger = logger.register("FusionComponentModel");
module.exports = BaseComponentModel.extend({
  defaults: {
    id: null,
    instanceData: null,
    module: 'jive.fusion',
    type: jiveTypes.FUSION_WIDGET,
    linksOptions: {}
  },
  initialize: function initialize(attr, options) {
    this.on('change:linksOptions', processLinkOptions);
    options.linkOptions && this.set('linksOptions', options.linkOptions);
  }
});

function processLinkOptions(model, linkOptions) {
  if (linkOptions.events && !model.collection.fusionChartsLinkOptionsProcessed) {
    model.collection.fusionChartsLinkOptionsProcessed = true;
    linkOptions.events.mouseout && localLogger.info('Fusion charts does not support mouseout events for hyperlinks');
    linkOptions.events.mouseover && localLogger.info('Fusion charts does not support mouseover events for hyperlinks');
    linkOptions.events.click && (linkOptions.events.click = _.wrap(linkOptions.events.click, function (func, ev, link) {
      // handle case when we receive event from fusion charts - it's not a jQuery.Event instance
      if (link instanceof $.Event) {
        func.call(this, ev, link);
      } else {
        func.call(this, link.id, ev);
      }
    }));
  }
}

});