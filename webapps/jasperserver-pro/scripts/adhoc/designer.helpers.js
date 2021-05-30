define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;
var $$ = _prototype.$$;
var Template = _prototype.Template;
var Position = _prototype.Position;

var adhocDesigner = require('./designer');

var aggregateFieldLabelFactory = require('./designer/aggregateFieldLabelFactory');

var _ = require('underscore');

var jQuery = require('jquery');

var dynamicTree = require("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils");

var buttonManager = require("runtime_dependencies/jrs-ui/src/core/core.events.bis");

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var disableSelectionWithoutCursorStyle = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.disableSelectionWithoutCursorStyle;
var enableSelection = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.enableSelection;

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

var designerBase = require('../base/designer.base');

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var jrs_measure = '_JRS_Measure';

adhocDesigner.setDragStartState = function (tree, node, draggable, ev) {
  var pointer = [Event.pointerX(ev), Event.pointerY(ev)];
  var oldDraggable = draggable.element;
  var el = draggable.element = new Element('LI').update(jQuery(oldDraggable).html());
  el.classNames().set(oldDraggable.classNames());
  el.writeAttribute('fieldname', adhocDesigner.getFieldName());
  el.setStyle({
    'z-index': oldDraggable.getStyle('z-index')
  });
  el.hide();
  oldDraggable.parentNode.appendChild(el);
  Element.clonePosition(el, oldDraggable);
  Position.absolutize(el);
  oldDraggable.remove();
  dynamicTree.Tree.prototype.setDragStartState.apply(tree, Array.prototype.slice.call(arguments, 1));
  draggable.draw(pointer);
  el.show();
};

adhocDesigner.deSelectAllPressedNavMuttons = function () {
  var navMuttons = $$('UL#navigationOptions li');

  if (navMuttons) {
    navMuttons.each(function (mutton) {
      buttonManager.out($(mutton), function (mutton) {
        return $(mutton).down(layoutModule.LIST_ITEM_WRAP_PATTERN);
      });
    });
  }
};

adhocDesigner.hideAllDialogsAndMenus = function () {
  //hide menu if showing
  actionModel.hideMenu();
  var functions = Object.values(this.dialogESCFunctions);
  functions.each(function (dialogId) {
    var dialog = $(dialogId);

    if (dialog) {
      dialogs.popup.hide(dialog);
    }
  }.bind(this));
};

adhocDesigner.initPreventBrowserSelection = function (domObject) {
  disableSelectionWithoutCursorStyle($(domObject));
};

adhocDesigner.initEnableBrowserSelection = function (domObject) {
  enableSelection($(domObject));
};
/*
* looks for data added to canvas
*/

/*
     * looks for data added to canvas
     */


adhocDesigner.isNoDataToDisplay = function () {
  if (window.localContext.getMode() === designerBase.TABLE) {
    return jQuery('#nothingToDisplay').is(':visible');
  }
};
/*
* Used to show notification for the user,
* about truncated data when max rows limit is reached
*/

/*
     * Used to show notification for the user,
     * about truncated data when max rows limit is reached
     */


adhocDesigner.checkMaxRowsLimit = function () {
  if (window.localContext.state.hitMaxRows && !this.isNoDataToDisplay()) {
    //use full full rows count as a system max row limit if hitMaxRows is true
    var msg = window.rowLimitMessage.replace('{0}', window.localContext.state.maxDataRowsCount);
    dialogs.systemConfirm.show(msg, 5000);
  }
};

adhocDesigner.isOnlyFieldsSelected = function () {
  var detectParentNodes = function detectParentNodes(node) {
    return node.hasChilds();
  };

  return this.getSelectedTreeNodes().detect(detectParentNodes) == null;
};

adhocDesigner.showButtonMenuMouseOut = function (object) {
  actionModel.hideMenu();
  Event.stopObserving($(object), 'mouseleave', adhocDesigner.showButtonMenuMouseOut);
};
/**
* Tests for custom fields
*/

/**
     * Tests for custom fields
     */


adhocDesigner.isSelectedFieldCustom = function () {
  if (window.selObjects.length == 1) {
    var selected = designerBase.getSelectedObject();

    if (selected.model) {
      return selected.model.isCustomField;
    } else {
      var f = adhocDesigner.findFieldByName(adhocDesigner.getNameForSelected(selected));
      return f && f.isCustomField;
    }
  }
};

adhocDesigner.isSelectFieldsAllowed = function () {
  return window.isDomainType;
};
/**
* Check to see if the delete option is allowed
*/

/**
     * Check to see if the delete option is allowed
     */


adhocDesigner.isDeleteAllowed = function () {
  if (window.selObjects.length != 1) {
    return false;
  }

  var fieldName = designerBase.getSelectedObject() ? designerBase.getSelectedObject().param.id : null;
  var field = adhocDesigner.findFieldByName(fieldName); // Delete allowed for custom fields not used in another fields, filters and fields manager.
  // Delete allowed for custom fields not used in another fields, filters and fields manager.

  return field != null && field.isCustomField && !field.isUsed && !adhocDesigner.isInUse(fieldName);
};

adhocDesigner.isUsedInRowsOrColumns = function (fieldName) {
  return _.find(window.localContext.state.fieldsInUse, function (field) {
    return field.split(jrs_measure)[0] === fieldName;
  });
};

adhocDesigner.canMoveToDimensions = function () {
  var aggFields = window.selObjects.find(function (obj) {
    var f = adhocDesigner.findFieldByName(adhocDesigner.getNameForSelected(obj));
    return f && f.isCustomField && f.aggregateField;
  });
  var fieldInUse = window.selObjects.find(function (obj) {
    return obj.param.id === designerBase.SPACER_NAME || !(obj.param.extra && obj.param.extra.isMeasure) || obj.param.extra && adhocDesigner.isUsedInRowsOrColumns(obj.param.extra.id);
  });
  return !fieldInUse && !aggFields;
};

adhocDesigner.canMoveToMeasures = function () {
  var fieldInUse = window.selObjects.find(function (obj) {
    if (!obj.param) {
      return false;
    }

    return obj.param.id === designerBase.SPACER_NAME || obj.param.extra && obj.param.extra.isMeasure || obj.param.extra && adhocDesigner.isUsedInRowsOrColumns(obj.param.extra.id);
  });
  return !fieldInUse;
};

adhocDesigner.getMessage = function (messageId, object) {
  var message = adhocDesigner.messages[messageId];
  return message ? new Template(message).evaluate(object ? object : {}) : '';
};
/**
* Compile and register underscore template in given context.
*
* @param context context where template will be used
* @param templateVar name of template variable in given context
* @param templateId id od template scipt tag in DOM
*/

/**
     * Compile and register underscore template in given context.
     *
     * @param context context where template will be used
     * @param templateVar name of template variable in given context
     * @param templateId id od template scipt tag in DOM
     */


adhocDesigner.registerTemplate = function (context, templateId) {
  if (!context || !templateId) {
    throw 'Some of required params to register template are missing';
  }

  if (!context[templateId]) {
    //temporary replace default template settings
    context[templateId] = _.template(jQuery('#' + templateId).html(), null, {
      evaluate: /\{\{([\s\S]+?)\}\}/g,
      interpolate: /\{\{=([\s\S]+?)\}\}/g,
      escape: /\{\{-([\s\S]+?)\}\}/g
    });
  }

  return context[templateId];
};
/**
* Compile underscore template and return it.
*
* @param templateId id od template scipt tag in DOM
*/

/**
     * Compile underscore template and return it.
     *
     * @param templateId id od template scipt tag in DOM
     */


adhocDesigner.createTemplate = function (templateId) {
  if (!templateId) {
    throw 'Some of required params to register template are missing';
  } //temporary replace default template settings
  //temporary replace default template settings


  var oldSettings = _.templateSettings;
  _.templateSettings = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    escape: /\{\{-([\s\S]+?)\}\}/g
  };

  var template = _.template(jQuery('#' + templateId).html());

  _.templateSettings = oldSettings;
  return template;
};

adhocDesigner.hideOnePanel = function () {
  if (window.orientation === 0) {
    var panel;
    var filterPanel = document.getElementById('filters');
    var fieldsPanel = document.getElementById('fields');
    var hasFilters = jQuery('#filter-container').find('div.panel.pane.filter').filter(':visible').length;
    var isMinimized = filterPanel.className.indexOf('minimized') >= 0;

    if (!isMinimized) {
      panel = hasFilters ? fieldsPanel : filterPanel;
      layoutModule.minimize(panel);
    }
  }
};

adhocDesigner.defaultFieldJSONBuilder = function (node) {
  return {
    dimensionId: node.param.extra.dimensionId,
    name: node.param.extra.id
  };
};

adhocDesigner.getListOfSelectedFields = function (builder) {
  var selectedNodes = adhocDesigner.getSelectedTreeNodes();

  if (this.isOlapMode()) {
    builder = Object.isFunction(builder) ? builder : adhocDesigner.defaultFieldJSONBuilder;
    return selectedNodes.collect(function (node) {
      if (node.isParent()) {
        var validatedChilds = node.childs.detect(function (child) {
          return window.localContext.canAddFilter(child);
        });
        return validatedChilds.collect(builder);
      } else {
        return window.localContext.canAddFilter(node) ? builder(node) : null;
      }
    }).compact().flatten();
  } else {
    var fieldNames = [];

    for (var index = 0; index < selectedNodes.length; index++) {
      var node = selectedNodes[index];

      if (node.isParent()) {
        var nodeChildren = node.childs;

        for (var j = 0; j < nodeChildren.length; j++) {
          var fieldName = nodeChildren[j].param.id;

          if (window.localContext.canAddFilter(nodeChildren[j])) {
            fieldNames.push(fieldName);
          }
        }

        if (fieldNames.length === 0) {
          continue; //nothing to add
        }
      } else {
        if (window.localContext.canAddFilter(node)) {
          fieldNames.push(node.param.id);
        } else {
          continue; //nothing to add
        }
      }
    }

    return _.map(fieldNames, function (fieldName) {
      return {
        name: fieldName
      };
    });
  }
};

adhocDesigner.generateAvailableSummaryCalculationsMenu = function (fieldName, availableSummariesMenu, menuOptions) {
  var availableSummaries = _.chain(window.localContext.state.fieldAvailableSummaries[fieldName]).filter(function (func) {
    return func !== 'None';
  }).sortBy().value();

  availableSummaries.unshift('None');
  availableSummariesMenu.children = _.map(availableSummaries, function (summaryFunc) {
    return actionModel.createMenuElement('optionAction', _.extend({
      text: aggregateFieldLabelFactory.localizeAggregation(summaryFunc),
      actionArgs: [summaryFunc],
      isSelectedTestArgs: [summaryFunc]
    }, menuOptions));
  });
};

adhocDesigner.getMissingFieldsCanvasMessage = function (state) {
  var names = _.reduce(state.allColumns, function (result, c) {
    if (_.contains(state.unresolvedMetadataReferences, c.name)) {
      result = result ? result + ', ' : '';
      return result + (c.defaultDisplayName || c.name);
    }

    return result;
  }, '');

  var msg = adhocDesigner.getMessage('adhoc.inuse.designer.canvas.error.message');
  msg = msg.replace('{0}', names);
  return msg;
};

module.exports = adhocDesigner;

});