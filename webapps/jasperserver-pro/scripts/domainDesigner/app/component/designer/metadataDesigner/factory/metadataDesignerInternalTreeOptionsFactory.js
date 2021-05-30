define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var availableSchemasTreeItemsTemplate = require("text!../template/availableSchemasTreeItemsTemplate.htm");

var addToSelectionModelTrait = require("runtime_dependencies/js-sdk/src/components/scalableList/model/trait/addToSelectionModelTrait");

var ListWithSelectionModelConstructor = require("runtime_dependencies/js-sdk/src/components/scalableList/model/ListWithSelectionModel");

var TooltipPlugin = require("../../../layout/sidebarView/tree/plugin/TooltipPlugin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ListWithSelectionModel = ListWithSelectionModelConstructor.extend(addToSelectionModelTrait);

function getTreeOptions(options) {
  var Model = options.ListModel || ListWithSelectionModel,
      metadataDesignerMetadataResourcesTooltipOptionsFactory = options.metadataDesignerMetadataResourcesTooltipOptionsFactory;
  return {
    itemsTemplate: options.template || availableSchemasTreeItemsTemplate,
    listItemHeight: options.listItemHeight,
    lazy: true,
    selection: {
      multiple: true,
      allowed: true
    },
    model: new Model({
      bufferSize: options.bufferSize,
      getData: options.getData
    }),
    plugins: [{
      constr: TooltipPlugin,
      options: {
        getTooltipOptions: metadataDesignerMetadataResourcesTooltipOptionsFactory.create
      }
    }]
  };
}

module.exports = {
  getTreeOptions: getTreeOptions
};

});