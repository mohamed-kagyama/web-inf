define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var columnSetEnum = require("../enum/columnSetEnum");

var scrollBarWidth = require("../../../../../util/scrollBarWidthUtil");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var SimpleModel = require("../../../../../model/util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = SimpleModel.extend({
  defaults: function defaults() {
    return {
      isVisible: false,
      ownDesigner: '',
      columnSet: columnSetEnum.DEFAULT,
      scrollBarWidth: scrollBarWidth,
      isScrollBarPresent: false,
      resizer: {},
      column0Width: 0,
      column1Width: 0,
      models: [],
      searchKeyword: '',
      top: 0,
      scrollPos: 0,
      height: 0,
      canvasWidth: 0,
      canvasHeight: 0,
      isEmptyDataStructure: true,
      emptyDataIslandsDropZone: {
        index: 0,
        isActive: false,
        isOver: false,
        accepts: [schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.TABLE_REFERENCE, schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FIELD]
      },
      editProperty: {},
      isAddSetButtonActive: false,
      moveButtonsStatus: {
        topButtonEnabled: false,
        upButtonEnabled: false,
        downButtonEnabled: false,
        bottomButtonEnabled: false
      }
    };
  }
});

});