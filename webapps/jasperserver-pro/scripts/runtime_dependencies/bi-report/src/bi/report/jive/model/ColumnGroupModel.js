define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var FormatModel = require('./FormatModel');

var jiveDataConverter = require('../util/jiveDataConverter');

var ConditionCollection = require('../collection/ConditionCollection');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Model.extend({
  defaults: function defaults() {
    return {
      id: null,
      groupType: '',
      groupName: '',
      dataType: '',
      forColumns: [],
      conditionalFormattingData: null,
      groupData: {}
    };
  },
  constructor: function constructor() {
    this.format = new FormatModel();
    this.conditions = new ConditionCollection();
    Backbone.Model.prototype.constructor.apply(this, arguments);
  },
  parse: function parse(response) {
    if (response.groupData) {
      this.format.dataType = jiveDataConverter.dataTypeToSchemaFormat[response.dataType];
      this.format.set(this.format.parse(response.groupData), {
        silent: true
      });
    }

    if (response.conditionalFormattingData) {
      this.conditions.dataType = jiveDataConverter.dataTypeToSchemaFormat[response.dataType];
      this.conditions.conditionPattern = response.conditionalFormattingData.conditionPattern;
      this.conditions.reset(response.conditionalFormattingData.conditions, {
        silent: true,
        parse: true
      });
    }

    return response;
  },
  actions: {
    'change:format': function changeFormat() {
      return {
        'actionName': 'editTextElement',
        'editTextElementData': {
          'applyTo': this.get('groupType'),
          'tableUuid': this.parent.get('id'),
          'columnIndex': this.get('forColumns')[0],
          'groupName': this.get('groupName'),
          'fontName': this.format.get('font').name,
          'fontSize': this.format.get('font').size + '',
          'fontBold': this.format.get('font').bold,
          'fontItalic': this.format.get('font').italic,
          'fontUnderline': this.format.get('font').underline,
          'fontColor': this.format.get('font').color,
          'formatPattern': this.format.toJiveFormat(),
          'fontHAlign': this.format.get('align').charAt(0).toUpperCase() + this.format.get('align').slice(1),
          'fontBackColor': this.format.get('backgroundColor') === 'transparent' ? '000000' : this.format.get('backgroundColor'),
          'mode': this.format.get('backgroundColor') === 'transparent' ? 'Transparent' : 'Opaque'
        }
      };
    },
    'change:conditions': function changeConditions() {
      var genericProperties = this.parent && this.parent.config ? this.parent.config.genericProperties : undefined;
      return {
        'actionName': 'conditionalFormatting',
        'conditionalFormattingData': {
          'applyTo': this.get('groupType'),
          'tableUuid': this.parent.get('id'),
          'columnIndex': this.get('forColumns')[0],
          'groupName': this.get('groupName'),
          'conditionPattern': this.get('conditionalFormattingData').conditionPattern,
          'conditionType': this.get('conditionalFormattingData').conditionType,
          'conditions': this.conditions.map(function (conditionModel) {
            return conditionModel.toJiveFormat(genericProperties);
          })
        }
      };
    }
  },
  updateFromReportComponentObject: function updateFromReportComponentObject(obj) {
    var setterObj = {};

    if (obj.format) {
      obj.format.font = _.extend({}, this.format.get('font'), obj.format.font || {});

      if (_.isObject(this.format.get('pattern'))) {
        if (!('Numeric' === this.get('dataType') && jiveDataConverter.DURATION_PATTERN === obj.format.pattern)) {
          obj.format.pattern = _.extend({}, this.format.get('pattern'), obj.format.pattern || {});
        }
      }

      if (obj.format.backgroundColor && obj.format.backgroundColor !== 'transparent') {
        obj.format.backgroundColor = obj.format.backgroundColor.toUpperCase();
      }

      if (obj.format.font && obj.format.font.color) {
        obj.format.font.color = obj.format.font.color.toUpperCase();
      }

      this.format.set(obj.format);
    }

    if (obj.conditions) {
      this.conditions.reset(obj.conditions);
    }

    this.set(setterObj);
  }
});

});