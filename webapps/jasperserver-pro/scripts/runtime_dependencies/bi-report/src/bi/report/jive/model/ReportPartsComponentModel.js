define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseComponentModel = require('./BaseComponentModel');

var jiveTypes = require('../enum/jiveTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  defaults: function defaults() {
    return {
      reportParts: [],
      id: undefined,
      type: jiveTypes.REPORTPARTS
    };
  },
  constructor: function constructor(attrs, options) {
    options || (options = {});
    options.parse || (options = _.extend({}, options, {
      parse: true
    }));
    BaseComponentModel.call(this, attrs, options);
  },
  parse: function parse(data) {
    var setterObj = {
      id: data.id
    };
    setterObj.reportParts = this._processParts(data.parts);
    return setterObj;
  },
  _processParts: function _processParts(parts) {
    if (parts) {
      return _.map(parts, function (part) {
        return {
          name: part.name,
          page: part.idx + 1
        };
      });
    }

    return null;
  }
});

});