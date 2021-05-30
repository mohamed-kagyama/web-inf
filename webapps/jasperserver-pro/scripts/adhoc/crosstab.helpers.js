define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var AdHocCrosstab = require('./crosstab');

var _ = require('underscore');

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
///////////////////////////////////////////////////////////////
// Helper functions
///////////////////////////////////////////////////////////////
// these are called in other modules, so even though we don't use overlays, leave them stubbed out
AdHocCrosstab.deselectAllSelectedOverlays = function () {};

AdHocCrosstab.deselectAllColumnGroupOverlays = function () {};

AdHocCrosstab.deselectAllRowGroupOverlays = function () {};

AdHocCrosstab.deselectAllMeasureOverlays = function () {};

AdHocCrosstab.removeFromSelectObjects = function (overlayId) {
  var foundObject = null;
  window.selObjects.each(function (object) {
    if (object.id == overlayId) {
      foundObject = object;
    }
  });
  window.selObjects = window.selObjects.without(foundObject);
};

AdHocCrosstab.getSelectedDimensionIndex = function (selectedObject) {
  var index = -1,
      dimensionId;

  if (!selectedObject) {
    return index;
  }

  if (_.isNumber(selectedObject.groupIndex)) {
    return selectedObject.groupIndex;
  }

  dimensionId = selectedObject.isMeasure ? window.adhocDesigner.MEASURES : selectedObject.dimensionId;

  _.find(window.localContext.state.getDimensions(selectedObject.axis), function (elem, ind) {
    if (elem.name === dimensionId) {
      index = ind;
      return true;
    }
  });

  return index;
};

AdHocCrosstab.getSelectedMeasure = function () {
  if (window.selObjects && window.selObjects.length > 0) {
    var object = window.selObjects[0];

    if (object.isMeasure) {
      var measures = AdHocCrosstab.getRefinedMeasuresFromState();
      return measures[object.index];
    }
  }

  return null;
};

AdHocCrosstab.getRefinedMeasuresFromState = function () {
  return _.filter(window.localContext.state.measures, function (measure) {
    return !measure.isSpacer;
  });
};

AdHocCrosstab.getSelectedGroup = function (object) {
  if (!object) {
    return null;
  }

  return object.axis === 'row' ? window.localContext.state.rowGroups[object.groupIndex] : window.localContext.state.columnGroups[object.groupIndex];
};

AdHocCrosstab.getMeasureTypeByFunction = function (thisFunction) {
  var object = AdHocCrosstab.getSelectedMeasure();

  if (object) {
    var type = window.adhocDesigner.getSuperType(object.type);

    if (thisFunction === 'Average') {
      return 'dec';
    } else if (thisFunction === 'Count' || thisFunction === 'DistinctCount') {
      return 'int';
    } else {
      return type;
    }
  }

  return null;
};
/**
* Fills "Add levels" menu items with dynamic values - all sibling levels
*/

/**
 * Fills "Add levels" menu items with dynamic values - all sibling levels
 */


AdHocCrosstab.updateContextMenuWithSiblingLevels = function (contextName, contextActionModel) {
  if (!window.adhocDesigner.ui.display_manager) {
    return contextActionModel;
  }

  var menuToUpdate = contextActionModel.find(function (item) {
    return item.clientTest === 'AdHocCrosstab.canAddSiblingLevels';
  });

  if (!menuToUpdate) {
    return contextActionModel;
  }

  var siblingLevels = null;
  var rootNode = null;
  var action = null;
  var firstSelected = window.selObjects[0];
  var hierarchyMatch = /.*\[(.*)\]/.exec(firstSelected.level),
      hierarchyName = hierarchyMatch && hierarchyMatch[1];

  if (!firstSelected.isMeasure) {
    if (window.localContext.isOlapMode()) {
      rootNode = window.adhocDesigner.dimensionsTree.getRootNode().childs.find(function (node) {
        return node.param.extra.id === firstSelected.dimensionId;
      });

      if (rootNode.childs[0].param.extra.isHierarchy) {
        rootNode = _.find(rootNode.childs, function (node) {
          return node.param.extra.id === hierarchyName;
        });
      }

      action = firstSelected.axis === 'row' ? 'AdHocCrosstab.appendDimensionToRowAxisWithLevel' : 'AdHocCrosstab.appendDimensionToColumnAxisWithLevel';
    } else {
      //In nonOLAP mode there is only one level for any dimension
      firstSelected.index = 0;
      return contextActionModel;
    }
  } else {
    rootNode = window.adhocDesigner.measuresTree.getRootNode();
    action = firstSelected.axis === 'row' ? 'AdHocCrosstab.appendMeasureToRow' : 'AdHocCrosstab.appendMeasureToColumn';
  }

  if (firstSelected.allLevels === undefined) {
    var metadata = firstSelected;
    metadata.allLevels = AdHocCrosstab.state.getLevelsFromDimension(firstSelected.dimensionId, metadata.axis);
    metadata.index = metadata.allLevels.indexOf(metadata.level);
  }

  if (firstSelected.allLevels) {
    if (window.localContext.isOlapMode()) {
      siblingLevels = rootNode.childs.findAll(function (node) {
        return !firstSelected.allLevels.include(node.param.extra.id);
      });
    } else {
      siblingLevels = window.adhocDesigner.getAllLeaves(rootNode, window.adhocDesigner.measuresTree).findAll(function (node) {
        return !firstSelected.allLevels.include(node.param.extra.id);
      });
    }
  }

  if (!siblingLevels || siblingLevels.length === 0) {
    return contextActionModel;
  }

  menuToUpdate.text = window.adhocDesigner.getMessage(firstSelected.isMeasure ? 'addMeasures' : 'addLevels');
  menuToUpdate.children = siblingLevels.collect(function (node) {
    return actionModel.createMenuElement('optionAction', {
      text: node.name,
      action: action,
      actionArgs: firstSelected.isMeasure ? [node.param.extra.id] : [{
        id: node.param.extra.id,
        groupId: node.param.extra.dimensionId,
        isMeasure: false
      }]
    });
  });
  return contextActionModel;
};

AdHocCrosstab.generateAvailableSummaryCalculationsMenu = function (context, menuActionModel) {
  var availableSummariesMenu = _.find(menuActionModel, function (item) {
    return item.clientTest === 'AdHocCrosstab.selectedMeasureShowsSummaryOptions';
  });

  if (availableSummariesMenu) {
    var model = actionModel.selObjects[0],
        field = _.findWhere(window.localContext.state.measures, {
      name: model.name
    });

    field && window.adhocDesigner.generateAvailableSummaryCalculationsMenu(field.fieldName, availableSummariesMenu, {
      action: AdHocCrosstab.selectFunction,
      isSelectedTest: AdHocCrosstab.isSelectedSummaryFunction
    });
  }

  return menuActionModel;
};

AdHocCrosstab.getTopBottomFilter = function () {
  //use memoizing to store calculated value of topbottom filter
  if (typeof window.localContext.state.crosstab.topBottomFilter === 'undefined') {
    window.localContext.state.crosstab.topBottomFilter = null;
    var transforms = window.localContext.state.crosstab.axisTransforms;
    var rowTransforms = transforms && transforms['ROWS'];

    if (rowTransforms && rowTransforms.length > 0) {
      for (var i = 0; i < rowTransforms.length; i++) {
        var rowTransform = rowTransforms[i];

        if (rowTransform && rowTransform.type === 'com.jaspersoft.commons.dimengine.axistransform.TopOrBottomN') {
          window.localContext.state.crosstab.topBottomFilter = {
            path: '/' + rowTransform.path.join('/'),
            //"asc" and "desc" are not very descriptive for top/bottom filtering
            type: rowTransform.asc ? 'bottom' : 'top',
            aggregateUnranked: rowTransform.createOtherBucket,
            applyAcrossGroups: rowTransform.limitAllLevels,
            limit: rowTransform.limit
          };
          break;
        }
      }
    }
  }

  return window.localContext.state.crosstab.topBottomFilter;
};

module.exports = AdHocCrosstab;

});