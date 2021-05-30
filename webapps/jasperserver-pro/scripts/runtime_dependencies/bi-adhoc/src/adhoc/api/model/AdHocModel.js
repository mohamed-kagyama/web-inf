define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var AdHocDataSetModel = require('./AdHocDataSetModel');

var AdHocSchemaModel = require('./AdHocSchemaModel');

var ResourceModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");

var biComponentErrorFactory = require("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory");

var AdHocBundlesCollection = require('./bundles/AdHocBundlesCollection');

var componentsFactory = require('./factory/componentsFactory');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AdHocModel = ResourceModel.extend({
  initialize: function initialize(attributes, options) {
    this.contextPath = options && options.server;
    this.schema = new AdHocSchemaModel({}, {
      contextPath: this.contextPath
    });
    this.bundles = new AdHocBundlesCollection([], {
      contextPath: this.contextPath
    });
    this.dataSet = new AdHocDataSetModel({
      dataSourceUri: attributes.uri
    }, _.extend({
      adHocModel: this
    }, options));
    this.componentsFactory = componentsFactory(this);
    this.listenTo(this.dataSet.query, 'query:componentsDataChange', function (query) {
      this.component.parseQuery(query);
    }, this);
    this.on('change:uri', function () {
      this._metadata = false;
    }, this);
  },
  parse: function parse(response) {
    if (response.schema) {
      this.schema.set(response.schema);
      response.schema = undefined;
    }

    if (response.component) {
      this.component = this.componentsFactory.create(response.component, {
        adHocModel: this
      });
      response.component = undefined;
    }

    if (response.query) {
      this.dataSet.query.acquire(response.query);
      response.query = undefined;
    }

    if (response.bundles) {
      this.bundles.set(response.bundles);
      response.bundles = undefined;
    }

    return response;
  },
  metadata: function metadata() {
    if (!this._metadata) {
      this._metadata = new $.Deferred();
      this.fetch().done(_.bind(onMetadataFetched, this)).fail(_.bind(onMetadataError, this));
    }

    return this._metadata;
  },
  toJSON: function toJSON() {
    var json = ResourceModel.prototype.toJSON.call(this);
    json.query = this.dataSet.query.toJSON();
    json.component = this.component.toJSON();
    json.schema = this.schema.toJSON();
    json.bundles = this.bundles.toJSON();
    return json;
  }
});
module.exports = AdHocModel;

function onMetadataFetched(data, result, xhr) {
  var error,
      contentType = xhr.getResponseHeader('Content-Type');

  if (!contentType || contentType.indexOf('application/repository.adhocDataView') !== 0) {
    error = {
      message: 'Resource ' + data.uri + ' is not an Ad Hoc View.',
      errorCode: 'resource.not.adhoc',
      parameters: [data.uri]
    };
  } else if (contentType.indexOf('application/repository.adhocDataView') === 0 && !Object.prototype.hasOwnProperty.call(data, 'query')) {
    // Data.query has been set to undefined during parse, but it still exist as a property. For OLAP based views it is not present at all.
    error = {
      message: 'OLAP based Ad Hoc view is not supported',
      errorCode: 'resource.is.olap.adhoc',
      parameters: [data.uri]
    };
  }

  if (error) {
    this._metadata.reject(error);
  } else {
    // start load locale bundle if any
    if (this.bundles.length) {
      this.bundles.bundle();
    }

    this._metadata.resolve();
  }
}

function onMetadataError(xhr) {
  var err = biComponentErrorFactory.requestError(xhr);

  this._metadata.reject(err);
}

});