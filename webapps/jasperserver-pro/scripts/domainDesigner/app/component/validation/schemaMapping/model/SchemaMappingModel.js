define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../../model/util/SimpleModel");

var schemaMappingType = require("../enum/schemaMappingType");

var specialSchemaNamesEnum = require('../../../../../model/schema/enum/specialSchemaNamesEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SCHEMALESS_NAME_SUBSTITUTION = specialSchemaNamesEnum.SCHEMALESS_NAME_SUBSTITUTION;
module.exports = SimpleModel.extend({
  defaults: function defaults() {
    return {
      existingSchemas: [],
      availableSchemas: [],
      isSelectingExistingSchema: false,
      isSelectingAvailableSchema: false,
      allowLink: false,
      allowUnlink: false,
      isVisible: false
    };
  },
  getMappedResult: function getMappedResult() {
    var result = [];

    var selected = this._getSelectedSchemas();

    if (this.get('isSelectingExistingSchema') && selected.existing) {
      result = [[selected.existing.name, SCHEMALESS_NAME_SUBSTITUTION]];
    } else if (this.get('isSelectingAvailableSchema') && selected.available) {
      result = [[SCHEMALESS_NAME_SUBSTITUTION, selected.available.name]];
    } else {
      result = this.get('existingSchemas').reduce(function (result, schema) {
        if (schema.mappedWith) {
          result.push([schema.name, schema.mappedWith]);
        }

        return result;
      }, []);
    }

    return result;
  },
  updateSelection: function updateSelection(schemaClicked) {
    var list = this._getSchemasListByType(schemaClicked.type),
        oppositeList = this._getOppositeSchemasListByType(schemaClicked.type);

    _.each(list, function (schema) {
      schema.isSelected = schema.name === schemaClicked.name;
    });

    _.each(oppositeList, function (schema) {
      if (schemaClicked.mappedWith) {
        schema.isSelected = schema.name === schemaClicked.mappedWith;
      } else if (schema.mappedWith) {
        schema.isSelected = false;
      }
    });

    var selection = this._getSelectedSchemas();

    this.set('allowLink', Boolean(selection.existing && selection.available && selection.existing.mappedWith !== selection.available.name));
    this.set('allowUnlink', Boolean(selection.existing && selection.available && selection.existing.mappedWith === selection.available.name));
  },
  disableButtons: function disableButtons() {
    this.set('allowLink', false);
    this.set('allowUnlink', false);
  },
  unlinkSelectedSchemas: function unlinkSelectedSchemas() {
    var selected = this._getSelectedSchemas();

    selected.existing.mappedWith = false;
    selected.available.mappedWith = false;

    this._updateIndexes();

    this.set('allowLink', true);
    this.set('allowUnlink', false);
  },
  linkSelectedSchemas: function linkSelectedSchemas() {
    var selected = this._getSelectedSchemas();

    if (selected.existing && selected.available) {
      selected.existing.mappedWith = selected.available.name;
      selected.available.mappedWith = selected.existing.name;
    }

    this._updateIndexes();

    this.set('allowLink', false);
    this.set('allowUnlink', true);
  },
  _getSchemasListByType: function _getSchemasListByType(type) {
    return this.get(type + 'Schemas');
  },
  _getOppositeSchemasListByType: function _getOppositeSchemasListByType(type) {
    type = type === schemaMappingType.EXISTING ? schemaMappingType.AVAILABLE : schemaMappingType.EXISTING;
    return this._getSchemasListByType(type);
  },
  _getSelectedSchemas: function _getSelectedSchemas() {
    var selected = {};

    _.each([schemaMappingType.EXISTING, schemaMappingType.AVAILABLE], function (type) {
      _.some(this._getSchemasListByType(type), function (schema) {
        if (schema.isSelected) {
          selected[type] = schema;
          return true;
        }
      });
    }, this);

    return selected;
  },
  _updateIndexes: function _updateIndexes() {
    var counter = 1;
    var sortedSchemas = this.get('existingSchemas').concat().sort(function (a, b) {
      if (a.index === 0) {
        return 1;
      } else if (b.index === 0) {
        return -1;
      } else {
        return a.index - b.index;
      }
    });
    sortedSchemas = sortedSchemas.map(function (schema) {
      schema.index = schema.mappedWith ? schema.index = counter++ : 0;
      return schema;
    });
    this.get('availableSchemas').forEach(function (schema) {
      var partnerIndex = schema.mappedWith && _.findWhere(sortedSchemas, {
        name: schema.mappedWith
      }).index;

      schema.index = schema.mappedWith ? partnerIndex : 0;
    });
  }
});

});