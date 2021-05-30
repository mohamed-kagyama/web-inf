define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseComponentModel = require('./BaseComponentModel');

var jiveTypes = require('../enum/jiveTypes');

var $ = require('jquery');

var Backbone = require('backbone');

var ColumnGroupModel = require('./ColumnGroupModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var genericProperties = null;
var ColumnGroupCollection = Backbone.Collection.extend({
  model: ColumnGroupModel
});
module.exports = BaseComponentModel.extend({
  defaults: function defaults() {
    return {
      calendarPatterns: {},
      filterPatterns: {},
      fontSizes: [],
      fonts: {},
      operators: {},
      patterns: {},
      id: null,
      genericProperties: {},
      module: 'jive.table',
      type: jiveTypes.TABLE,
      uimodule: 'jive.interactive.column',
      hasFloatingHeader: null
    };
  },
  constructor: function constructor() {
    this.columnGroups = new ColumnGroupCollection();
    BaseComponentModel.prototype.constructor.apply(this, arguments);
  },
  initialize: function initialize(o) {
    this.config = {
      id: null,

      /**
           * {"1":{"index":"1","label":"Name","uuid":"ace5fd47-03c8-4d26-b2c0-354ca60560e0","visible":false,"interactive":true},..}
           */
      allColumnsData: null
    };
    $.extend(this.config, o);

    if (o.genericProperties) {
      genericProperties = o.genericProperties;
    } else {
      this.config.genericProperties = genericProperties;
    }

    this.columns = [];
    this.columnMap = {};
  },
  parse: function parse(response) {
    var self = this;

    if (response.allColumnGroupsData) {
      this.columnGroups.reset(response.allColumnGroupsData, {
        silent: true,
        parse: true
      });
      this.columnGroups.each(function (group) {
        group.parent = self;
      });
    }

    return response;
  },
  registerPart: function registerPart(column) {
    column.parent = this;
    column.trigger('parentTableComponentAttached');
    this.columns[column.get('columnIndex')] = column;
    this.columnMap[column.get('id')] = column;
  },
  getId: function getId() {
    return this.config.id;
  },
  handleServerError: function handleServerError(result) {
    this.trigger("serverError", result);
  },
  handleClientError: function handleClientError(result) {
    this.trigger("serverError", result);
  }
});

});