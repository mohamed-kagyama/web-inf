define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $break = _prototype.$break;

var i18n = require("bundle!adhoc_messages");

var adhocDesigner = require('./designer');

var designerBase = require('../base/designer.base');

var dynamicTree = require("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isNotNullORUndefined = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isNotNullORUndefined;

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var jQuery = require('jquery');

var _ = require('underscore');

var AdHocTable = require('./table.init');

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

var adhocCalculatedFields = require('./designer.calculatedFields');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
     * Used to add fields to the canvas
     * @param event
     */
adhocDesigner.addFieldToCanvas = function () {
  if (window.localContext.getMode() === designerBase.TABLE) {
    AdHocTable.addFieldAsColumn();
  } else if (window.localContext.getMode() === designerBase.CROSSTAB) {
    window.localContext.addFieldAsLastMeasure();
  } else if (window.localContext.getMode() === designerBase.CHART) {
    window.localContext.addFieldAsMeasure();
  }
};
/**
* Check if field is numeric
* @param fieldName
*/

/**
     * Check if field is numeric
     * @param fieldName
     */


adhocDesigner.checkIfFieldIsNumeric = function (fieldName) {
  var col = adhocDesigner.findFieldByName(fieldName);
  return col != null && col.type == 'Numeric';
};
/**
* Used to check if a string is a valid number
* @param number
*/

/*
    adhocDesigner.isValidNumericValue = function(number){
        var numberOfDecimalsPoints = 0;
        var indexOfDecimal = -1;
        var isValid = false;

        if (number.length > 0) {
            for (var index = 0; index < number.length; index++) {
                var character = number.charAt(index);
                if (isNaN(character) && (character === "," || character === ".")) {
                    numberOfDecimalsPoints++;
                    indexOfDecimal = index;
                }
            }

            isValid = !(numberOfDecimalsPoints > 1);
            if ((indexOfDecimal > -1) && isValid) {
                isValid = (indexOfDecimal < (number.length - 1));
            }
        }

        return {
            isValid: isValid,
            errorMessage: dynamicFilterInputError
        };
    };
*/

/**
     * Check if selected fields are numeric
     */

/**
     * Used to check if a string is a valid number
     * @param number
     */

/*
    adhocDesigner.isValidNumericValue = function(number){
        var numberOfDecimalsPoints = 0;
        var indexOfDecimal = -1;
        var isValid = false;

        if (number.length > 0) {
            for (var index = 0; index < number.length; index++) {
                var character = number.charAt(index);
                if (isNaN(character) && (character === "," || character === ".")) {
                    numberOfDecimalsPoints++;
                    indexOfDecimal = index;
                }
            }

            isValid = !(numberOfDecimalsPoints > 1);
            if ((indexOfDecimal > -1) && isValid) {
                isValid = (indexOfDecimal < (number.length - 1));
            }
        }

        return {
            isValid: isValid,
            errorMessage: dynamicFilterInputError
        };
    };
*/

/**
     * Check if selected fields are numeric
     */


adhocDesigner.checkIfAllSelectedAreNumeric = function () {
  var fieldName = null;
  var selected = null;

  for (var index = 0; index < window.selObjects.length; index++) {
    selected = window.selObjects[index];

    if (selected) {
      if (window.selectionCategory.area === designerBase.AVAILABLE_FIELDS_AREA) {
        fieldName = selected.param.id;
      } else if (window.selectionCategory.area === designerBase.COLUMN_LEVEL) {
        fieldName = selected.header.getAttribute('data-fieldName');
      } else {} //must be table group, crosstab or chart//todo work in progress


      if (!adhocDesigner.checkIfFieldIsNumeric(fieldName)) {
        return false;
      }
    }
  }

  return true;
};

adhocDesigner.collectFields = function (nodes, includeSubSets, testFn) {
  var fieldNames = [];

  for (var index = 0; index < nodes.length; index++) {
    var node = nodes[index];

    if (node.isParent() && includeSubSets) {
      fieldNames = fieldNames.concat(this.collectFields(node.childs, includeSubSets, testFn));
    } else {
      if (testFn) {
        testFn(node.param.id) && fieldNames.push(node.param.id);
      } else {
        fieldNames.push(node.param.id);
      }
    }
  }

  return fieldNames;
};
/**
* Returns all fields of the adHocDesigner
*/

/**
     * Returns all fields of the adHocDesigner
     */


adhocDesigner.getAllFields = function () {
  if (!isNotNullORUndefined(window.localContext.state.allColumns)) {
    return [];
  }

  return window.localContext.state.allColumns;
};
/**
* Find the field by its name
* @param fieldName
*/

/**
     * Find the field by its name
     * @param fieldName
     */


adhocDesigner.findFieldByName = function (fieldName) {
  var node = null;

  if (window.localContext.state.allColumns) {
    window.localContext.state.allColumns.each(function (field) {
      if (field.name) {
        if (field.name == fieldName) {
          node = field;
          throw $break;
        }
      }
    });
  }

  return node;
};
/**
* Used to get the name of a field from the selected object
* @param object
*/

/**
     * Used to get the name of a field from the selected object
     * @param object
     */


adhocDesigner.getNameForSelected = function (object) {
  if (window.selectionCategory.area === designerBase.AVAILABLE_FIELDS_AREA) {
    return object ? object.param.id : '';
  } else if (object.chartMeasureId) {
    return object.chartMeasureId;
  } else if (window.selectionCategory.area === designerBase.COLUMN_LEVEL) {
    return object.header.getAttribute('data-fieldName');
  } else if (window.selectionCategory.area === designerBase.GROUP_LEVEL) {
    return object.fieldName;
  } else if (window.selectionCategory.area === designerBase.ROW_GROUP_MENU_LEVEL || window.selectionCategory.area === designerBase.COLUMN_GROUP_MENU_LEVEL) {
    return object.name;
  } else if (window.selectionCategory.area === designerBase.SUMMARY_LEVEL) {
    return object.model.name;
  } else if (window.selectionCategory.area === designerBase.LEGEND_MENU_LEVEL) {
    return object.legendName;
  }
};
/**
* Get the field name of a selected object
*/

/**
     * Get the field name of a selected object
     */


adhocDesigner.getFieldName = function () {
  var so = designerBase.getSelectedObject();
  return so ? this.getNameForSelected(so) : '';
};
/**
* Find the field index based on the field name
* @param fieldName
*/

/**
     * Find the field index based on the field name
     * @param fieldName
     */


adhocDesigner.getFieldIndexByName = function (fieldName) {
  if (isNotNullORUndefined(window.localContext.state.allColumns)) {
    var size = window.localContext.state.allColumns.length;

    for (var i = 0; i < size; i++) {
      var f = window.localContext.state.allColumns[i];

      if (f.name == fieldName) {
        return i;
      }
    }
  }

  return -1;
};

adhocDesigner.moveToDimensions = function () {
  if (window.selObjects.first()) {
    var nodes = window.selObjects.clone();
    adhocDesigner.moveToMeasuresOrAttributes(nodes);
    var ids = nodes.collect(function (node) {
      return node.param.id;
    }).join(',');
    adhocDesigner.changeFieldAttributeOrMeasure(ids, 'attribute');
  }
};

adhocDesigner.moveToMeasures = function () {
  if (window.selObjects.first()) {
    var nodes = window.selObjects.clone();
    adhocDesigner.moveToMeasuresOrAttributes(nodes);
    var ids = nodes.collect(function (node) {
      return node.param.id;
    }).join(',');
    adhocDesigner.changeFieldAttributeOrMeasure(ids, 'measures');
  }
};
/*
* method to be called when a a field is selected from the available fields list
* @param event
* @param node
*/

/*
     * method to be called when a a field is selected from the available fields list
     * @param event
     * @param node
     */


adhocDesigner.selectFromAvailableFields = function (event, node) {
  // If method was invoked not through event machinery, then simply add node to selection.
  if (!event) {
    this.addSelectedObject(event, node, false, true);
  }

  var isMultiSelect = this.isMultiSelect(event, designerBase.AVAILABLE_FIELDS_AREA); //update select area
  //update select area

  window.selectionCategory.area = designerBase.AVAILABLE_FIELDS_AREA;
  var isSelected = this.isAlreadySelected(node);
  this.addSelectedObject(event, node, isMultiSelect, isSelected);
  actionModel.setSelected(_.map(dynamicTree.trees[node.getTreeId()].selectedNodes, function (n) {
    return n.param.extra;
  })); //Event.stop(event); // iPad: Node of the tree stays selected after context menu has been opened.
};
/**
* Update fields in use.
* @param fieldName
*/

/**
     * Update fields in use.
     * @param fieldName
     */


adhocDesigner.updateFieldsInUse = function (fieldName) {
  [].push.apply(window.localContext.state.fieldsInUse, fieldName);
};
/**
* Remove fields from fields in use.
* @param fieldNames - fields to remove
*/

/**
     * Remove fields from fields in use.
     * @param fieldNames - fields to remove
     */


adhocDesigner.removeFromFieldsInUse = function (fieldNames) {
  if (window.localContext.state.fieldsInUse) {
    window.localContext.state.fieldsInUse = _.difference(window.localContext.state.fieldsInUse, fieldNames);
  }
};
/**
* Check to see if the field is currently in use
* @param fieldName
*/

/**
     * Check to see if the field is currently in use
     * @param fieldName
     */


adhocDesigner.isInUse = function (fieldName) {
  var inUse = _.find(window.localContext.state.fieldsInUse, function (usedField) {
    return usedField === fieldName;
  });

  return inUse || adhocDesigner.hasDependencyOnIt(fieldName);
};

adhocDesigner.isInError = function (fieldName) {
  var isInError = _.find(window.localContext.state.unresolvedMetadataReferences, function (usedField) {
    return usedField === fieldName;
  });

  return isInError;
};
/**
* Used to create a new calculated field
*/

/**
     * Used to create a new calculated field
     */


adhocDesigner.createCalculatedField = function () {
  adhocCalculatedFields.createField('DIMENSION');
};
/**
* Used to create a new calculated measure
*/

/**
     * Used to create a new calculated measure
     */


adhocDesigner.createCalculatedMeasure = function () {
  adhocCalculatedFields.createField('MEASURE');
};
/**
* Used to edit the calculated field
*/

/**
     * Used to edit the calculated field
     */


adhocDesigner.editCalculatedField = function () {
  adhocCalculatedFields.updateField();
};
/**
* Used to delete a calculated field
*/

/**
     * Used to delete a calculated field
     */


adhocDesigner.deleteCalculatedField = function () {
  var selectedObject = designerBase.getSelectedObject();
  var confirmDialog = jQuery('#' + adhocDesigner.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.DIALOG_ID);
  dialogs.popupConfirm.show(confirmDialog[0], false, {
    message: i18n['ADH_436_CALCULATED_FIELD_REMOVE_CONFIRM'] + ' "' + selectedObject.name.unescapeHTML() + '".',
    okButtonSelector: '#' + adhocDesigner.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.OK_BUTTON_ID,
    cancelButtonSelector: '#' + adhocDesigner.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.CANCEL_BUTTON_ID
  }).done(adhocCalculatedFields.deleteField.bind(adhocCalculatedFields));
};
/**
* Used to determine if a selected object is a percent based calculated field
*/

/**
     * Used to determine if a selected object is a percent based calculated field
     */


adhocDesigner.isPercentOfParentCalcSelected = function (object) {
  return adhocDesigner.isAggregateSelected(object); // TODO: make sure the logic is correct and get rid of duplicate function.
};
/**
* Used to determine if a selected object is an aggregate
*/

/**
     * Used to determine if a selected object is an aggregate
     */


adhocDesigner.isAggregateSelected = function (object) {
  if (!object) {
    object = designerBase.getSelectedObject();
  }

  if (object) {
    var fieldName = adhocDesigner.getNameForSelected(object);
    var field = adhocDesigner.findFieldByName(fieldName);
    return field && field.aggregateField;
  }

  return false;
};
/**
* Tests to see if field is a percent of parent calc.
* @param fieldName
*/

/**
     * Tests to see if field is a percent of parent calc.
     * @param fieldName
     */


adhocDesigner.isPercentOfParentCalc = function (fieldName) {
  // In new Calculated Fields (JRS 5.6) we have no formulaRef any more. Using aggregateField property instead
  // TODO: make sure the logic is correct and rename isPercentOfParentCalc() to isAggregateCalc()
  var field = adhocDesigner.findFieldByName(fieldName);
  return field && field.aggregateField;
};
/**
* Check to see if the field has a dependency in another calculated field
* @param fieldName
*/

/**
     * Check to see if the field has a dependency in another calculated field
     * @param fieldName
     */


adhocDesigner.hasDependencyOnIt = function (fieldName) {
  var field = adhocDesigner.findFieldByName(fieldName);
  return field && field.isUsed;
};
/**
* Used to update a calculated fields css leaf's
*/

/**
     * Used to update a calculated fields css leaf's
     */


adhocDesigner.updateAllFieldLabels = function () {
  if (!window.isDesignView) {
    return;
  }

  var it = adhocDesigner;
  var trees = [it.dimensionsTree, it.measuresTree];

  _.each(trees, function (tree) {
    _.each(it.getAllLeaves(null, tree), function (leaf) {
      var field = it.findFieldByName(leaf.param.id);

      if (field && field.isCustomField) {
        adhocDesigner.updateTreeFieldLabel(leaf, field.defaultDisplayName);
        leaf.param.cssClass = it.isInUse(leaf.param.id) ? 'calculatedField dependency' : 'calculatedField';
        leaf.refreshStyle();
      }
    });

    tree.renderTree();
  });
};

adhocDesigner.updateTreeFieldLabel = function (nodeOrLeaf, label) {
  nodeOrLeaf.name = label.replace(/\\'/g, '\'');
  nodeOrLeaf.param.label = label.replace(/\\'/g, '\'');
};

module.exports = adhocDesigner;

});