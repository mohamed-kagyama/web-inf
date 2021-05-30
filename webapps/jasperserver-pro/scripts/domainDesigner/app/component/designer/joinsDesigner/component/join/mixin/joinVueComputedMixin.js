define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var joinsEnum = require("../../../../../../model/enum/joinsEnum");

var joinWeightsEnum = require("../../../enum/joinWeightsEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  computed: {
    joinTypeOptions: function joinTypeOptions() {
      return _.map(joinsEnum.joinTypes, function (joinType) {
        return {
          label: joinType.label,
          value: joinType.name
        };
      });
    },
    joinWeightOptions: function joinWeightOptions() {
      var originalWeight = this.join.originalWeight,
          options = _.cloneDeep(joinWeightsEnum.options),
          isOriginalWeightAlreadyPresent;

      if (!_.isUndefined(originalWeight)) {
        isOriginalWeightAlreadyPresent = _.find(options, function (option) {
          return originalWeight === option.value;
        });

        if (!isOriginalWeightAlreadyPresent) {
          options.push({
            label: String(originalWeight),
            value: originalWeight
          });
        }
      } // Then sort options so they will be in natural order
      // Then sort options so they will be in natural order


      options = _.sortBy(options, 'value');
      return options;
    },
    isJoinWeightDisabled: function isJoinWeightDisabled() {
      return !this.join.isWeightEnabled;
    },
    joinLeftSide: function joinLeftSide() {
      var asLabel = i18nMessage('domain.designer.joinsDesigner.join.asLabel');

      if (this.join.leftTableReference !== this.join.leftTableAlias) {
        return this.join.leftTableReference + ' ' + asLabel + ' ' + this.join.leftTableAlias;
      }

      return this.join.leftTableReference;
    },
    joinRightSide: function joinRightSide() {
      var asLabel = i18nMessage('domain.designer.joinsDesigner.join.asLabel');

      if (this.join.rightTableReference !== this.join.rightTableAlias) {
        return this.join.rightTableReference + ' ' + asLabel + ' ' + this.join.rightTableAlias;
      }

      return this.join.rightTableReference;
    }
  }
};

});