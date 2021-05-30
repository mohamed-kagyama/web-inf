define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MultiLevelAdhocQueryToAvailableValuesConverter = function MultiLevelAdhocQueryToAvailableValuesConverter(options) {
  this.initialize(options);
};

_.extend(MultiLevelAdhocQueryToAvailableValuesConverter.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_memberToAvailableItemEntryMapper');

    this.availableValuesLabelConverter = options.availableValuesLabelConverter;
    this.availableValuesValueConverter = options.availableValuesValueConverter;
  },
  convert: function convert(queryResult, dataType) {
    var memberToAvailableItemEntryMapper = _.partial(this._memberToAvailableItemEntryMapper, dataType);

    var members = queryResult.dataset.levels[0].group.members || [];
    return {
      data: members.map(memberToAvailableItemEntryMapper),
      total: queryResult.totalCounts
    };
  },
  _memberToAvailableItemEntryMapper: function _memberToAvailableItemEntryMapper(dataType, member) {
    var formattedLabel = this.availableValuesLabelConverter.convert(member, dataType),
        formattedValue = this.availableValuesValueConverter.convert(member, dataType);
    return {
      label: formattedLabel,
      value: formattedValue
    };
  }
});

module.exports = MultiLevelAdhocQueryToAvailableValuesConverter;

});