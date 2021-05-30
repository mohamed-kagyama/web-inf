define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (model) {
  this.controls = [];

  this.validate = function () {
    var res = new $.Deferred(),
        defs = this.controls.map(function (control) {
      var id = control.model.getOwnerParameterName(),
          values = model.get('source').parameters.parameterValues,
          params = {};

      if (_.isUndefined(values[id])) {
        params[id] = values[control.model.id];
      } else {
        params[id] = values[id];
      }

      return control.inputControlCollection.updateState({
        params: params
      });
    });

    if (defs.length) {
      if (defs.length === 1) {
        defs[0].done(function (val) {
          res.resolve(!val.inputControlState[0].error);
        }).fail(function () {
          res.fail();
        });
      } else {
        $.when.apply($, defs).done(function () {
          res.resolve(_.reduce(arguments, function (memo, result) {
            return memo && !result[0].inputControlState[0].error;
          }), true);
        }).fail(function () {
          res.reject();
        });
      }
    } else {
      res.resolve(true);
    }

    return res;
  };
};

});