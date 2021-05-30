define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _dragdropextra = require('dragdropextra');

var Droppables = _dragdropextra.Droppables;

var _prototype = require('prototype');

var $ = _prototype.$;

var adhocDesigner = require('./designer');

var LayoutManager = require('./layout.manager');

var treeNodeClassEnum = require('./enum/treeNodeClassEnum');

var _ = require('underscore');

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var _runtime_dependenciesJrsUiSrcNamespaceNamespace = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var jaspersoft = _runtime_dependenciesJrsUiSrcNamespaceNamespace.jaspersoft;

var designerBase = require('../base/designer.base');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var deepClone = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.deepClone;
var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;
var doNothing = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.doNothing;
var enableSelection = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.enableSelection;

var xssUtil = require("runtime_dependencies/js-sdk/src/common/util/xssUtil");

var dynamicTree = require("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var jQuery = require('jquery');

var adhocSort = require('./designer.sort');

var adhocReentrance = require('./designer.reentrant');

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

var TouchController = require("runtime_dependencies/jrs-ui/src/util/touch.controller");

var OlapFiltersController = require('./filter/OlapFiltersController');

var FiltersController = require('./filter/FiltersController');

var FilterService = require('./filter/FilterService');

var AdHocTable = require('./table.init');

var AdHocChart = require('./chart.observers');

var _runtime_dependenciesJrsUiSrcNamespaceNamespace2 = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var JRS = _runtime_dependenciesJrsUiSrcNamespaceNamespace2.JRS;

var AdHocCrosstab = require('./crosstab');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function setDefaultWidthIfMissing(panelId, width) {
  var restoredWidth = parseInt(layoutModule.getPanelWidth(panelId), 10);

  if (!restoredWidth) {
    layoutModule.storePanelWidth(panelId, width);
  }
}

adhocDesigner.getNodes = function () {
  var nodes = [],
      selectedNodes = adhocDesigner.getSelectedTreeNodes(),
      node = getNodeListChild(selectedNodes);
  nodes.push(node);
  return nodes;
};

function getNodeListChild(selectedNodes) {
  if (selectedNodes[0]) {
    if (!(selectedNodes[0].childs && selectedNodes[0].childs.length > 0)) {
      return selectedNodes[0].param && selectedNodes[0].param.extra;
    } else {
      return getNodeListChild(selectedNodes[0].childs);
    }
  }
}

adhocDesigner.fieldsToBeAddedStructure = function () {
  var selectedNodes = adhocDesigner.getSelectedTreeNodes(),
      getUsedFields = window.localContext.state.getFilteredList && window.localContext.state.getFilteredList(),
      getList = getUsedFields ? window.localContext.state.getFilteredList() : window.localContext.state.rowGroups,
      filterList = _.pluck(getList, 'name'),
      filterFieldsArray = [];

  for (var i = 0; i < selectedNodes.length; i++) {
    if (selectedNodes && selectedNodes[i]) {
      var tree = selectedNodes[i] && dynamicTree.trees[selectedNodes[i].getTreeId()];
      var leavesStringObject = window.adhocDesigner.getAllLeaves(selectedNodes[i], tree).collect(function (node) {
        return node.param && node.param.extra;
      });
      var leavesStringArray = window.adhocDesigner.getAllLeaves(selectedNodes[i], tree).collect(function (node) {
        return node.param && node.param.extra.id;
      });

      var alreadyAddedFields = _.intersection(leavesStringArray, filterList),
          fieldToBeAdded = _.difference(leavesStringArray, filterList),
          AddedFieldsName = leavesStringObject.filter(function (leaves) {
        return leaves && alreadyAddedFields.indexOf(leaves.name) !== -1;
      }),
          fieldToBeAddedName = leavesStringObject.filter(function (leaves) {
        return leaves && fieldToBeAdded.indexOf(leaves.name) !== -1;
      }),
          filterOnType = AddedFieldsName.filter(function (leaves) {
        return AdHocCrosstab.isDateField(leaves);
      }),
          filteredArray = filterOnType.concat(fieldToBeAddedName);

      filteredArray.forEach(function (item) {
        filterFieldsArray.push(item);
      });
    }
  }

  return filterFieldsArray;
};

adhocDesigner.layoutManagerProperties = {
  table: function table() {
    return {
      axes: [{
        name: 'column',
        elementId: 'olap_columns'
      }, {
        name: 'group',
        elementId: 'olap_rows'
      }],
      common: {
        mode: 'table',
        id: adhocDesigner.DISPLAY_MANAGER_ID
      }
    };
  },
  crosstab: function crosstab(isOlap) {
    return {
      axes: [{
        name: 'column',
        elementId: 'olap_columns'
      }, {
        name: 'row',
        elementId: 'olap_rows',
        isDependent: !!isOlap
      }],
      common: {
        mode: 'crosstab',
        id: adhocDesigner.DISPLAY_MANAGER_ID,
        measuresGroupId: 'Measures',
        isOlapMode: !!isOlap
      }
    };
  },
  olap_crosstab: function olap_crosstab() {
    return adhocDesigner.layoutManagerProperties.crosstab(true);
  },
  ichart: function ichart(isOlap) {
    return {
      axes: [{
        name: 'column',
        elementId: 'olap_columns'
      }, {
        name: 'row',
        elementId: 'olap_rows',
        isDependent: !!isOlap
      }],
      common: {
        mode: 'crosstab',
        id: adhocDesigner.DISPLAY_MANAGER_ID,
        measuresGroupId: 'Measures',
        isOlapMode: !!isOlap
      }
    };
  },
  olap_ichart: function olap_ichart() {
    return adhocDesigner.layoutManagerProperties.crosstab(true);
  },
  // TODO remove this obsolete type
  chart: function chart() {
    return {
      axes: [{
        name: 'measures',
        elementId: 'olap_columns'
      }, {
        name: 'group',
        elementId: 'olap_rows'
      }],
      common: {
        mode: 'chart',
        id: adhocDesigner.DISPLAY_MANAGER_ID
      }
    };
  }
};

adhocDesigner.initTitle = function () {
  if (window.isEmbeddedDesigner && !_.isBlank(window.embeddedName)) {
    adhocDesigner.ui.header_title.html(xssUtil.hardEscape(window.embeddedName));
  }
};

adhocDesigner.initLayoutManager = function (mode) {
  var props = adhocDesigner.layoutManagerProperties[mode]();
  adhocDesigner.ui.display_manager = new LayoutManager(props);
  adhocDesigner.observeDisplayManagerEvents();
};

adhocDesigner.initDialogs = function () {
  window.isDesignView && adhocReentrance.initialize();
  adhocSort.initialize();
  adhocDesigner.initViewQueryDialog();
  adhocDesigner.initSaveConfirmationDialog();
  adhocDesigner.initDeleteCalculatedFieldConfirmationDialog();
  adhocDesigner.addConfirmDialog = new jaspersoft.components.ConfirmDialog({
    messages: [adhocDesigner.messages['ADH_1216_DIMENSION_HIERARCHY_ADD_WARNING_1'], adhocDesigner.messages['ADH_1216_DIMENSION_HIERARCHY_ADD_WARNING_2']]
  });
};

adhocDesigner.initSaveConfirmationDialog = function () {
  var confirmDialog = jQuery('#standardConfirm').clone();
  confirmDialog.attr('id', adhocDesigner.SAVE_WITHOUT_FILTERS_APPLY_CONFIRMATION_DIALOG.DIALOG_ID);
  confirmDialog.find('.body').text(adhocDesigner.messages.ADH_1236_SAVE_WITHOUT_FILTERS_APPLY_CONFIRMATION);
  confirmDialog.find('.button.action.up').attr('id', adhocDesigner.SAVE_WITHOUT_FILTERS_APPLY_CONFIRMATION_DIALOG.CANCEL_BUTTON_ID);
  confirmDialog.find('.button.action.primary.up').attr('id', adhocDesigner.SAVE_WITHOUT_FILTERS_APPLY_CONFIRMATION_DIALOG.OK_BUTTON_ID);
  confirmDialog.find('.button.action.primary.up .wrap').text(adhocDesigner.messages.ADH_1237_IGNORE);
  confirmDialog.appendTo(jQuery('#frame .content:eq(0)'));
};

adhocDesigner.initDeleteCalculatedFieldConfirmationDialog = function () {
  var confirmDialog = jQuery('#standardConfirm').clone();
  confirmDialog.attr('id', adhocDesigner.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.DIALOG_ID);
  confirmDialog.find('.body').text(adhocDesigner.messages.ADH_436_CALCULATED_FIELD_REMOVE_CONFIRM);
  confirmDialog.find('.button.action.up').attr('id', adhocDesigner.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.CANCEL_BUTTON_ID);
  confirmDialog.find('.button.action.primary.up').attr('id', adhocDesigner.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.OK_BUTTON_ID);
  confirmDialog.appendTo(jQuery('#frame .content:eq(0)'));
};

adhocDesigner.initViewQueryDialog = function () {
  adhocDesigner.viewQueryDialog = new JRS.ViewQueryDialog({
    id: '#queryViewer',
    content: '',
    selectionContainer: $('designer')
  });
};

adhocDesigner.initFieldsPanel = function (onInit) {
  if (!window.isDesignView) {
    return;
  }

  var it = adhocDesigner;

  if (onInit) {
    Event.observe($('topicMutton'), 'click', function (evt) {
      if (actionModel.isMenuShowing() && actionModel.menuDom.hasClassName("openByTopicMutton")) {
        actionModel.hideMenu();
        actionModel.menuDom.removeClassName("openByTopicMutton");
      } else {
        actionModel.showDynamicMenu('topicMenu', evt, "menu vertical dropDown fitable openByTopicMutton", null, window.localContext.state.actionmodel);
      }

      $('menu').clonePosition($('topicMutton'), {
        'setWidth': false,
        'setHeight': false,
        'offsetTop': 30
      });
      Event.stop(evt);
    }.bind(adhocDesigner));

    if (!adhocDesigner.isOlapMode()) {
      Event.observe($('availableFieldsMutton'), 'click', function (evt) {
        if (actionModel.isMenuShowing() && actionModel.menuDom.hasClassName("openByAvailableFieldsMutton")) {
          actionModel.hideMenu();
          actionModel.menuDom.removeClassName("openByAvailableFieldsMutton");
        } else {
          actionModel.showDynamicMenu('availableFieldsMenu', evt, "menu vertical dropDown fitable openByAvailableFieldsMutton", null, window.localContext.state.actionmodel);
        }

        $('menu').clonePosition($('availableFieldsMutton'), {
          'setWidth': false,
          'setHeight': false,
          'offsetTop': 30
        });
        Event.stop(evt);
      }.bind(adhocDesigner));
      Event.observe($('availableMeasuresMutton'), 'click', function (evt) {
        if (actionModel.isMenuShowing() && actionModel.menuDom.hasClassName("openByAvailableMeasuresMutton")) {
          actionModel.hideMenu();
          actionModel.menuDom.removeClassName("openByAvailableMeasuresMutton");
        } else {
          actionModel.showDynamicMenu('availableMeasuresMenu', evt, "menu vertical dropDown fitable openByAvailableMeasuresMutton", null, window.localContext.state.actionmodel);
        }

        $('menu').clonePosition($('availableMeasuresMutton'), {
          'setWidth': false,
          'setHeight': false,
          'offsetTop': 30
        });
        Event.stop(evt);
      }.bind(adhocDesigner));
    }
  }

  var k;
  var trees = {
    dimensions: {
      name: 'dimensionsTree',
      className: 'dimension',
      domId: it.DIMENSIONS_TREE_DOM_ID,
      providerId: it.DIMENSIONS_TREE_PROVIDER_ID
    },
    measures: {
      name: 'measuresTree',
      className: 'measure',
      domId: it.MEASURES_TREE_DOM_ID,
      providerId: it.MEASURES_TREE_PROVIDER_ID
    }
  };

  for (k in trees) {
    var tree = $(trees[k].domId);

    if (tree) {
      var children = tree.childElements();
      children.each(function (object) {
        object.remove();
      });
    }

    it[trees[k].name] = it.getAvailableFieldsTree(trees[k].domId, trees[k].providerId);
    /*
    * Tree customizations
    */

    /*
         * Tree customizations
         */

    var nodeUri = window.localStorage ? localStorage.getItem(it._cookieName) : undefined;
    it._availableTreeLastOpened = nodeUri && nodeUri.length > 0 ? nodeUri : '/';
    it[trees[k].name].DEFAULT_TREE_CLASS_NAME = 'responsive fields';
    it[trees[k].name].multiSelectEnabled = !adhocDesigner.isOlapMode();
    it[trees[k].name].dragClasses = trees[k].className;

    it[trees[k].name].setDragStartState = function (tree) {
      return function (node, draggable, event) {
        adhocDesigner.setDragStartState(tree, node, draggable, event);
        window.selectionCategory.area = designerBase.AVAILABLE_FIELDS_AREA;
        window.localContext.canAddFilter && window.localContext.canAddFilter(node) && draggable.element.addClassName('supportsFilter');
      };
    }(it[trees[k].name]);

    if (isIPad()) {
      tree = document.getElementById(trees[k].domId);
      new TouchController(tree, tree.parentNode, {
        scrollbars: true
      });
    } //Create search component for this tree
    //Create search component for this tree


    (function (name) {
      require(['./DynamicTreeSearch'], function (DynamicTreeSearch) {
        var search = new DynamicTreeSearch({
          tree: it[name],
          depth: adhocDesigner._AVAILABLE_TREE_DEPTH,
          keyword: ''
        });
        jQuery('.j-' + name + '-search').append(search.el);
        it[name + 'Search'] = search;
      });
    })(trees[k].name);
  }

  it.observeTreeEvents(it['dimensionsTree'], it['measuresTree']);
  it.observeTreeEvents(it['measuresTree'], it['dimensionsTree']);
};

adhocDesigner.FILTERS_PANEL_DEFAULT_WIDTH = 300;
adhocDesigner.FILTERS_PANEL_MIN_WIDTH = 250;

adhocDesigner.initPanelsState = function () {
  if (!layoutModule.panelStateWasManuallyChanged('filters', window.clientKey)) {
    // sync markup and storage states if they differ
    // such situation happens when we switch from one Ad Hoc View to another
    if (layoutModule.getPanelMinimizedState('filters') === 'false' && jQuery('#filters').hasClass('minimized')) {
      layoutModule.storePanelMinimizedState('filters', true);
    }
  }

  setDefaultWidthIfMissing('filters', adhocDesigner.FILTERS_PANEL_MIN_WIDTH);
  var mainPanelID = adhocDesigner.CANVAS_PANEL_ID;

  if ($('fields')) {
    layoutModule.resizeOnClient('fields', mainPanelID, 'filters');
  } else {
    layoutModule.resizeOnClient('filters', mainPanelID);
  }

  if (!layoutModule.panelStateWasManuallyChanged('filters', window.clientKey)) {
    // in initial markup of our page filters panel is already minimized
    // in that case layoutModule.resizeOnClient method wrote incorrect value to cookie (17).
    // that caused various UI issues and default size (250) was used when panel was maximized.
    // here we override this behavior by writing correct default width to cookies
    if (layoutModule.getPanelMinimizedState('filters') === 'true' && parseInt(layoutModule.getPanelWidth('filters'), 10) < adhocDesigner.FILTERS_PANEL_MIN_WIDTH) {
      layoutModule.storePanelWidth('filters', adhocDesigner.FILTERS_PANEL_DEFAULT_WIDTH);
    }
  }
};

adhocDesigner.initFiltersPanel = function () {
  var $filters = $('filters'),
      filtersControllerConstructor = adhocDesigner.isOlapMode() ? OlapFiltersController : FiltersController,
      filterService = new FilterService({
    clientKey: window.clientKey,
    mode: adhocDesigner.getMode
  });
  enableSelection($filters);
  adhocDesigner.filtersController = new filtersControllerConstructor({
    el: $filters,
    service: filterService,
    clientKey: window.clientKey,
    onApply: function onApply(state) {
      window.localContext.standardOpCallback(state);
    },
    onSlice: function onSlice(state) {
      designerBase.unSelectAll();
      window.localContext.standardOpCallback(state);
    },
    onStateUpdate: function onStateUpdate(state) {
      window.localContext.state.update ? window.localContext.state.update(state) : window.localContext.update(state);

      if (window.isDesignView) {
        //save and undo buttons are disabled in report display view
        adhocDesigner.enableCanUndoRedo();
      } //fieldsInUse not used in OLAP mode yet.
      //fieldsInUse not used in OLAP mode yet.


      !adhocDesigner.isOlapMode() && adhocDesigner.updateFieldsInUse(_.pluck(state.existingFilters, 'name'));
    },
    onFilterAdd: function onFilterAdd(filterEditors) {
      !adhocDesigner.isOlapMode() && adhocDesigner.applyFilterTitleColor(filterEditors);
    },
    onFilterRemove: function onFilterRemove(filters) {
      adhocDesigner.removeFromFieldsInUse(_.pluck(filters, 'name'));
    },
    resetFilterPanelState: adhocDesigner.resetFilterPanelState
  }); // bind this event here, because we don't want FiltersController classes to be dependent on Prototype
  // this should be refactored with refactoring of designer
  // bind this event here, because we don't want FiltersController classes to be dependent on Prototype
  // this should be refactored with refactoring of designer

  document.observe('dragger:sizer', function (e) {
    var element = e.memo.element;

    if (element == adhocDesigner.filtersController.sizerEl) {
      adhocDesigner.filtersController.onPanelResize();
    }
  });
};

adhocDesigner.initDroppables = function () {
  var drops = {
    'filters': {
      accept: ['draggable', 'wrap'],
      hoverclass: 'dropTarget',
      onDrop: function onDrop(draggable) {
        var errorMessages = [];

        if (!adhocDesigner.canShowFilterOption(errorMessages)) {
          dialogs.systemConfirm.show(errorMessages.join(' '), 5000);
        } else {
          var fields = adhocDesigner.getListOfSelectedFields();
          adhocDesigner.filtersController.addFilter(fields);
        }
      }
    },
    'mainTableContainer': {
      accept: ['measure', 'dimension'],
      hoverclass: 'dropTarget',
      onDrop: function onDrop() {
        switch (window.localContext.getMode()) {
          case 'table':
            AdHocTable.addFieldAsColumn(true);
            break;

          case 'chart':
            AdHocChart.addFieldAsMeasure(true);
        }

        if (window.localContext.getMode().indexOf('crosstab') >= 0 || window.localContext.getMode().indexOf('ichart') >= 0) {
          var olapIChart = window.localContext.getMode() === designerBase.OLAP_ICHART,
              designerMode = window.localContext.getMode() === designerBase.ICHART || olapIChart ? window.AdhocIntelligentChart : AdHocCrosstab,
              selectedNodes = adhocDesigner.getSelectedTreeNodes(),
              filteredFields = adhocDesigner.fieldsToBeAddedStructure(),
              posCol = jQuery('#olap_columns').children().length,
              posRow = jQuery('#olap_rows').children().length,
              nodes = filteredFields && filteredFields.length ? filteredFields : adhocDesigner.getNodes(),
              isMeasure = nodes[0] && nodes[0].isMeasure,
              leavesArray = adhocDesigner.getSelectedNodes();

          if (nodes) {
            if (isMeasure) {
              if (designerMode.canAddDimensionAsColumnGroup(nodes)) {
                designerMode.appendDimensionToColumnAxisWithLevel(nodes, leavesArray, posCol);
              } else if (designerMode.canAddDimensionAsRowGroup(nodes)) {
                designerMode.appendDimensionToRowAxisWithLevel(nodes, leavesArray, posRow);
              }
            } else {
              if (filteredFields.length) {
                if (designerMode.canAddDimensionAsRowGroup(nodes)) {
                  designerMode.appendDimensionToRowAxisWithLevel(nodes, filteredFields, posRow);
                } else if (designerMode.canAddDimensionAsColumnGroup(nodes)) {
                  designerMode.appendDimensionToColumnAxisWithLevel(nodes, filteredFields, posCol);
                }
              }
            }
          }
        }
      }
    },
    'canvasTableFrame': {
      accept: ['draggable', 'wrap'],
      hoverclass: 'dropTarget',
      onDrop: function onDrop() {
        window.localContext.getMode() == 'table' && AdHocTable.addFieldAsColumn(true);
      }
    }
  };

  for (var myId in drops) {
    Droppables.remove(myId);

    if (document.getElementById(myId)) {
      Droppables.add(myId, drops[myId]);
    }
  }
}; ////////////////////////////////////////////////
//Helpers
////////////////////////////////////////////////
////////////////////////////////////////////////
//Helpers
////////////////////////////////////////////////


adhocDesigner.getSelectedNodes = function () {
  var selectedNodes = adhocDesigner.getSelectedTreeNodes(),
      leavesArray = [];

  for (var i = 0; i < selectedNodes.length; i++) {
    var tree = selectedNodes[i] && dynamicTree.trees[selectedNodes[i].getTreeId()],
        leaves = selectedNodes[i] && window.adhocDesigner.getAllLeaves(selectedNodes[i], tree);
    leaves.forEach(function (item) {
      leavesArray.push(item);
    });
  }

  return leavesArray;
};

adhocDesigner.getAvailableFieldsTree = function (id, providerId) {
  function AvailableTreeNode(options) {
    dynamicTree.TreeNode.call(this, options);
    this.Types = {
      Folder: new dynamicTree.TreeNode.Type('ItemGroupType')
    };
    this.nodeHeaderTemplateDomId = 'list_responsive_collapsible_folders_adhocAvailableTrees:folders';
  }

  AvailableTreeNode.prototype = deepClone(dynamicTree.TreeNode.prototype);
  AvailableTreeNode.addMethod('refreshStyle', function (element) {
    element = element || this._getElement();

    if (element) {
      var field = adhocDesigner.findFieldByName(this.param.id);

      if (field && field.isCustomField) {
        this.name = this.param.label = field.defaultDisplayName.replace(/\\'/g, '\'').escapeHTML();
        var classNames = ['calculatedField'];

        if (adhocDesigner.isInUse(this.param.id)) {
          classNames.push('dependency');
        }

        if (adhocDesigner.isInError(this.param.id)) {
          classNames.push('inError');
          var errorIcon = element.getElementsByClassName('icon error');

          if (errorIcon.length == 1) {
            errorIcon = errorIcon[0];
          }

          errorIcon.classList.remove('hidden');
        } else {
          var errorIcon = element.getElementsByClassName('icon error');

          if (errorIcon.length == 1) {
            errorIcon = errorIcon[0];
          }

          errorIcon.classList.add('hidden');
        }

        this.param.cssClass = classNames.join(' ');
      } else if (field) {
        var classNames = [treeNodeClassEnum[this.param.extra.type]];
        this.param.cssClass = classNames.join(' ');
      }

      dynamicTree.TreeNode.prototype.refreshStyle.call(this, element);
    }
  });
  return new dynamicTree.TreeSupport(id, {
    providerId: providerId,
    rootUri: '/',
    showRoot: false,
    resetStatesOnShow: false,
    nodeClass: AvailableTreeNode,
    templateDomId: 'list_responsive_collapsible_folders_adhocAvailableTrees',
    dragPattern: isIPad() ? undefined : '.draggable',
    treeErrorHandlerFn: doNothing,
    selectOnMousedown: !isIPad(),
    regionID: id ? id : designerBase.AVAILABLE_FIELDS_AREA
  });
};

module.exports = adhocDesigner;

});