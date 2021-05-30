define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var $ = require('jquery');

var _ = require('underscore');

var configs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var AdHocBundleModel = require('./AdHocBundleModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  model: AdHocBundleModel,
  initialize: function initialize(ms, args) {
    if (args && args.contextPath) {
      this.CONTEXT_PATH = args.contextPath;
    }
  },
  getByLocale: function getByLocale(locale) {
    var res = this.get(locale);

    if (!res) {
      res = this.get(locale.split('_')[0]);
    }

    if (!res) {
      res = this.get('');
    }

    return res;
  },
  getCurrent: function getCurrent() {
    return this.getByLocale(configs.userLocale);
  },
  bundle: function bundle(locale) {
    var model, res;

    if (_.isUndefined(locale)) {
      locale = configs.userLocale || '';
    }

    if (!this.models.length) {
      res = new $.Deferred().resolve({});
    } else if (!(model = this.getByLocale(locale))) {
      res = new $.Deferred().reject({
        errorCode: 'bundle.not.found',
        message: 'The bundle for locale is not found',
        properties: [locale]
      });
    } else if (model._contentDfd) {
      res = model._contentDfd;
    } else {
      res = model._contentDfd = new $.Deferred();

      if (model.resource.contentJSON) {
        res.resolve(model.resource.contentJSON);
      } else {
        model.resource.fetchContent().done(function () {
          res.resolve(model.resource.contentJSON);
        });
      }
    }

    return res.promise();
  }
});

});