define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var biComponentUtil = require("runtime_dependencies/js-sdk/src/common/bi/component/util/biComponentUtil");

var BiComponent = require("runtime_dependencies/js-sdk/src/common/bi/component/BiComponent");

var InputControlPropertiesModel = require('./model/InputControlPropertiesModel');

var InputControlCollection = require('./collection/InputControlCollection');

var InputControlCollectionView = require('./view/InputControlCollectionView');

var biComponentErrorFactoryInputControlsProxy = require('./error/biComponentErrorFactoryInputControlsProxy');

var schema = require("json!./schema/InputControls.json");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var propertyNames = _.keys(schema.properties);

var fieldNames = ['properties'];
var readOnlyFieldNames = ['data'];

function run(dfd, instanceData, inputControlCollection, inputControlCollectionView) {
  var validationResult = this.validate(),
      self = this,
      options = {};

  if (validationResult) {
    dfd.reject(biComponentErrorFactoryInputControlsProxy.validationError(validationResult));
    return;
  }

  var stateValidationResult = inputControlCollection.validate();

  if (stateValidationResult) {
    dfd.reject(biComponentErrorFactoryInputControlsProxy.inputControlsValidationError(stateValidationResult));
    return;
  }

  extendCollectionWithOptions(instanceData, inputControlCollection);
  options.params = _.cloneDeep(instanceData.properties.params) || {};

  _.defaults(options.params, inputControlCollection.getState());

  var method = _.isEmpty(options.params) ? 'fetch' : 'update';

  if (instanceData.properties.container) {
    var $container = $(instanceData.properties.container);

    if (!($container.length && $container[0].nodeType == '1')) {
      dfd.reject(biComponentErrorFactoryInputControlsProxy.containerNotFoundError(instanceData.properties.container));
    }

    inputControlCollectionView.setContainer($container);
  }

  inputControlCollection[method](options).done(function (response) {
    instanceData.data = inputControlCollection.toJSON();
    instanceData.data.parameters = inputControlCollection.getState();
    dfd.resolve(self.data());
  }).fail(function (xhr) {
    if (xhr.responseJSON.errorCode === 'generic.error.message' && xhr.responseJSON.message.search(/Parameter [\S]+ does not exist/) != -1) {
      dfd.reject(biComponentErrorFactoryInputControlsProxy.inputControlParameterNotFound(xhr.responseJSON.message));
    } else {
      dfd.reject(biComponentErrorFactoryInputControlsProxy.requestError(xhr));
    }
  });
}

function reset(dfd, instanceData, inputControlCollection) {
  var self = this;
  instanceData.properties.params = {};
  inputControlCollection.fetch().done(function (response) {
    instanceData.data = inputControlCollection.toJSON();
    instanceData.data.parameters = inputControlCollection.getState();
    dfd.resolve(self.data());
  }).fail(function (xhr) {
    if (xhr.responseJSON.errorCode === 'generic.error.message' && xhr.responseJSON.message.search(/Parameter [\S]+ does not exist/) != -1) {
      dfd.reject(biComponentErrorFactoryInputControlsProxy.inputControlParameterNotFound(xhr.responseJSON.message));
    } else {
      dfd.reject(biComponentErrorFactoryInputControlsProxy.requestError(xhr));
    }
  });
}

function extendCollectionWithOptions(instanceData, inputControlCollection) {
  _.extend(inputControlCollection, {
    resourceUri: instanceData.properties.resource,
    contextPath: instanceData.properties.server
  });
}

var InputControls = function InputControls(properties) {
  var instanceData = {
    properties: _.extend({}, properties),
    data: []
  };
  var stateModel = new InputControlPropertiesModel(properties || {});
  biComponentUtil.createInstancePropertiesAndFields(this, instanceData, propertyNames, fieldNames, readOnlyFieldNames, stateModel);
  var inputControlCollection = new InputControlCollection([], {
    stateModel: stateModel
  });
  var inputControlCollectionView = new InputControlCollectionView({
    collection: inputControlCollection,
    stateModel: stateModel
  });

  var eventManager = _.extend({}, Backbone.Events);

  eventManager.listenTo(inputControlCollection, 'changeState', function () {
    instanceData.data = inputControlCollection.toJSON();
    instanceData.data.parameters = inputControlCollection.getState();
  });

  _.extend(this, {
    validate: biComponentUtil.createValidateAction(instanceData, schema, stateModel),
    run: biComponentUtil.createDeferredAction(run, stateModel, instanceData, inputControlCollection, inputControlCollectionView),
    reset: biComponentUtil.createDeferredAction(reset, stateModel, instanceData, inputControlCollection)
  });
};

InputControls.prototype = new BiComponent();
module.exports = InputControls;

});