define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var profileAttributeUtil = require("../../../../../../../model/util/profileAttributeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var SchemaAttributeInputValidator = function SchemaAttributeInputValidator(options) {
  this.initialize(options);
};

_.extend(SchemaAttributeInputValidator.prototype, {
  initialize: function initialize(options) {
    this.domainSchemaSpecification = options.domainSchemaSpecification;
    this.metadataService = options.metadataService;
    this.profileAttributesService = options.profileAttributesService;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
    this.metadataDesignerErrorByXhrFactory = options.metadataDesignerErrorByXhrFactory;
  },
  validate: function validate(model) {
    var self = this;
    return this._checkIfAttributeNotation(model).then(function () {
      return self._checkIfDuplicateExists(model);
    }).then(function () {
      return self._checkIfAttributeExists(model);
    }).then(function (attribute) {
      return self._checkIfSchemaExists(model).then(function () {
        return attribute;
      });
    }).then(null, function (error) {
      return new $.Deferred().reject(error || "");
    });
  },
  _checkIfAttributeNotation: function _checkIfAttributeNotation(model) {
    var dfd = new $.Deferred(),
        isProfileAttributeNotation = profileAttributeUtil.containsProfileAttributeWithPlaceholdersOnly(model.attribute);
    return isProfileAttributeNotation ? dfd.resolve() : dfd.reject(i18nMessage("domain.validation.schemaAttributeDoesNotMatchRegExp"));
  },
  _checkIfAttributeExists: function _checkIfAttributeExists(model) {
    var self = this,
        attrArgs = profileAttributeUtil.extractProfileAttributeArgs(model.attribute),
        attributeName = attrArgs[0],
        level = attrArgs[1] || false;
    return this.profileAttributesService.getProfileAttributes({
      name: attributeName,
      level: level
    }, {
      refresh: true
    }).then(function (attributes) {
      return attributes[0];
    }, function (xhr) {
      return new $.Deferred().reject(self.metadataDesignerErrorByXhrFactory.create(xhr));
    });
  },
  _checkIfSchemaExists: function _checkIfSchemaExists(model) {
    var self = this,
        dataSourceName = this.clientResourcePropertiesService.getDataSourceName(),
        dataSourceUri = this.clientResourcePropertiesService.getDataSourceUri(dataSourceName);
    return this.metadataService.getMetadata(dataSourceUri, [[model.attribute]]).then(function (response) {
      if (_.isUndefined(response)) {
        return new $.Deferred().reject(i18nMessage('profile.attribute.exception.schema.does.not.exist'));
      }

      return response;
    }, function (xhr) {
      return new $.Deferred().reject(self.metadataDesignerErrorByXhrFactory.create(xhr));
    });
  },
  _checkIfDuplicateExists: function _checkIfDuplicateExists(model) {
    var dfd = new $.Deferred(),
        canUpdateOrCreateDataSourceGroup = true;

    if (model.dataSourceGroupId) {
      canUpdateOrCreateDataSourceGroup = this.domainSchemaSpecification.canUpdateDataSourceGroup(model.dataSourceGroupId, model.attribute);
    } else {
      canUpdateOrCreateDataSourceGroup = this.domainSchemaSpecification.canCreateDataSourceGroup(model.attribute, model.parentId);
    }

    return canUpdateOrCreateDataSourceGroup ? dfd.resolve() : dfd.reject(i18nMessage('domain.validation.schemaAttributeAlreadyExists'));
  }
});

module.exports = SchemaAttributeInputValidator;

});