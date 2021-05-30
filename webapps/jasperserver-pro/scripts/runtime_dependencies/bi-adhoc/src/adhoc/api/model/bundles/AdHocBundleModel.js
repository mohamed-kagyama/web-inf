define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var RepositoryBundleFileModel = require('./RepositoryBundleFileModel');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createResource(resourceJson) {
  if (repositoryResourceTypes.FILE in resourceJson) {
    this.resource = new RepositoryBundleFileModel(resourceJson[repositoryResourceTypes.FILE], {
      contextPath: this.collection.CONTEXT_PATH
    });
  } else if (resourceJson.fileReference) {
    this.resource = new RepositoryBundleFileModel(resourceJson.fileReference, {
      contextPath: this.collection.CONTEXT_PATH
    });
  } else {
    throw new Error('Unknown value', resourceJson);
  }
}

var AdhocBundleModel = Backbone.Model.extend({
  idAttribute: 'locale',
  defaults: {
    locale: undefined,
    file: undefined
  },
  initialize: function initialize() {
    this.updateResource();
    this.on('change:file', this.updateResource);
    this.on('change:fileReference', this.updateResource);
  },
  updateResource: function updateResource() {
    var resourceJson = this.get('file') || this.get('fileReference');

    if (resourceJson && _.isObject(resourceJson)) {
      if (!this.resource) {
        createResource.call(this, resourceJson);
      } else {
        this.resource.set(resourceJson);
      }
    }
  },
  toJSON: function toJSON(useFullResource) {
    var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
    json.file = {};

    if (this.resource.isNew() || useFullResource === true) {
      json.file.file = this.resource.toJSON(true);
    } else {
      json.file.fileReference = {
        'uri': this.resource.get('uri')
      };
    }

    return json;
  },
  toLabel: function toLabel(key) {
    return this.resource.contentJSON[key];
  }
});
module.exports = AdhocBundleModel;

});