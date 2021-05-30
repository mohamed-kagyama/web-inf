define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseComponentModel = require('./BaseComponentModel');

var jiveTypes = require('../enum/jiveTypes');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Igor Nesterenko
 * @version: $Id$
 */
var localResourceTemplate = _.template("{{=uri}}?noext");

module.exports = BaseComponentModel.extend({
  defaults: function defaults() {
    return {
      id: null,
      type: jiveTypes.CUSTOM_VISUALIZATION_COMPONENT,
      script: null,
      css: null
    };
  },
  parse: function parse(attributes, options) {
    attributes = _.defaults(attributes, {
      server: options.parent.contextPath,
      report: options.parent.get('reportURI')
    });
    attributes.script = {
      name: attributes.renderer,
      href: localResourceTemplate({
        uri: attributes.instanceData.script_uri
      })
    };

    if (attributes.instanceData.css_uri) {
      attributes.css = {
        name: attributes.id + "_css",
        href: localResourceTemplate({
          uri: attributes.instanceData.css_uri
        })
      };
    }

    return attributes;
  },
  constructor: function constructor(attributes, options) {
    attributes || (attributes = {});

    if (!attributes.instanceData.script_uri) {
      throw new Error('Can\'t initialize without script name');
    }

    BaseComponentModel.prototype.constructor.apply(this, arguments);
  }
});

});