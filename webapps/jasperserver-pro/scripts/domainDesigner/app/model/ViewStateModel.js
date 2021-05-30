define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../model/util/SimpleModel");

var viewStateModelDefaultsEnum = require("./enum/viewStateModelDefaultsEnum");

var columnSetEnum = require("../component/designer/presentationDesigner/enum/columnSetEnum");

var canvasViewDesignersEnum = require("./enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DESIGNER_SPECIFIC_DEFAULTS = {
  'metadataDesigner': '_getMetadataDesignerDefaults',
  'joinsDesigner': '_getJoinsDesignerDefaults',
  'presentationDesigner': '_getPresentationDesignerDefaults',
  'filtersDesigner': '_getFiltersDesignerDefaults'
};
var DESIGNER_RUNTIME_SPECIFIC_DEFAULTS = {
  'metadataDesigner': '_getMetadataDesignerRuntimeDefaults',
  'joinsDesigner': '_getJoinsDesignerRuntimeDefaults',
  'calculatedFieldsDesigner': '_getCalculatedFieldsDesignerRuntimeDefaults',
  'presentationDesigner': '_getPresentationDesignerRuntimeDefaults',
  'filtersDesigner': '_getFiltersDesignerRuntimeDefaults'
};

var ViewStateModel = function ViewStateModel(attrs, defaultOptions) {
  this.defaultOptions = defaultOptions || {};
  SimpleModel.apply(this, arguments);
};

_.extend(ViewStateModel.prototype, SimpleModel.prototype, {
  defaults: function defaults() {
    var defaultOptions = _.cloneDeep(this.defaultOptions);

    return {
      currentDesigner: defaultOptions.currentDesigner || canvasViewDesignersEnum.METADATA_DESIGNER,
      dataSource: {},
      designer: this._getDesignerDefaults(DESIGNER_SPECIFIC_DEFAULTS),
      runtime: {
        draftState: {},
        designer: this._getRuntimeDesignerDefaults(DESIGNER_RUNTIME_SPECIFIC_DEFAULTS, defaultOptions.runtime)
      }
    };
  },
  reset: function reset() {
    this.set(this.defaults());
  },
  resetDesigner: function resetDesigner(designerName) {
    var designer = _.clone(this.get('designer')),
        defaults = this.defaults();

    designer[designerName] = defaults.designer[designerName];
    this.set('designer', designer);
  },
  clone: function clone() {
    return new ViewStateModel(_.cloneDeep(this.toJSON()));
  },
  _getDesignerDefaults: function _getDesignerDefaults(defaultsMap, optionsToExtendDesignerDefaults) {
    return _.extend({
      sidebar: {
        expandedNodes: {},
        collapsedNodes: {}
      }
    }, this._getRuntimeDesignerDefaults(defaultsMap, optionsToExtendDesignerDefaults));
  },
  _getRuntimeDesignerDefaults: function _getRuntimeDesignerDefaults(defaultsMap, optionsToExtendDesignerDefaults) {
    var defaults = {};
    optionsToExtendDesignerDefaults = optionsToExtendDesignerDefaults || {};

    _.each(canvasViewDesignersEnum, function (value, key) {
      var designerSpecificDefaults = defaultsMap[value];
      defaults[value] = {};

      if (designerSpecificDefaults) {
        _.extend(defaults[value], this[designerSpecificDefaults]());
      }

      if (optionsToExtendDesignerDefaults[value]) {
        _.extend(defaults[value], optionsToExtendDesignerDefaults[value]);
      }
    }, this);

    return defaults;
  },
  _getMetadataDesignerDefaults: function _getMetadataDesignerDefaults() {
    return {
      selectedResource: {
        type: '',
        id: null,
        resourceId: null
      },
      selection: {
        sourceTree: {},
        resultTree: {}
      },
      searchKeyword: {
        sourceTree: {},
        resultTree: {},
        sidebar: ''
      }
    };
  },
  _getJoinsDesignerDefaults: function _getJoinsDesignerDefaults() {
    return {
      selectedResource: {
        type: '',
        id: null,
        resourceId: null,
        parentTableReferenceId: null,
        parentJoinTreeId: null
      },
      joinTrees: {},
      joins: {},
      searchKeyword: {
        sidebar: ''
      }
    };
  },
  _getFiltersDesignerDefaults: function _getFiltersDesignerDefaults() {
    return {
      selectedResource: {
        type: '',
        id: null,
        resourceId: null
      },
      searchKeyword: {
        sidebar: '',
        canvas: ''
      },
      filtersPositions: {}
    };
  },
  _getPresentationDesignerDefaults: function _getPresentationDesignerDefaults() {
    return {
      dropZoneActivator: null,
      searchKeyword: {
        sidebar: '',
        canvas: ''
      },
      defaultPresentationItemsNodeExpandedState: viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.NODE_EXPANSION.value,
      defaultPresentationItemsEditorExpandedState: viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PROPERTY_EDITOR_EXPANSION.value,
      dataIslands: {},
      presentationSets: {},
      presentationFields: {},
      selection: {
        parentId: null,
        items: {}
      },
      sidebarSelection: {
        parentId: null,
        items: {}
      },
      columnSet: columnSetEnum.DEFAULT
    };
  },
  _getMetadataDesignerRuntimeDefaults: function _getMetadataDesignerRuntimeDefaults() {
    return {
      addResourcesError: {
        popoverMessage: '',
        highlightInvalidResources: false
      }
    };
  },
  _getJoinsDesignerRuntimeDefaults: function _getJoinsDesignerRuntimeDefaults() {
    return {};
  },
  _getPresentationDesignerRuntimeDefaults: function _getPresentationDesignerRuntimeDefaults() {
    return {
      cellsWidth: {}
    };
  },
  _getFiltersDesignerRuntimeDefaults: function _getFiltersDesignerRuntimeDefaults() {
    return {};
  },
  _getCalculatedFieldsDesignerRuntimeDefaults: function _getCalculatedFieldsDesignerRuntimeDefaults() {
    return {
      context: {},
      visible: viewStateModelDefaultsEnum.CALCULATED_FIELDS_DESIGNER.VISIBILITY.value
    };
  },
  getCurrentDesigner: function getCurrentDesigner() {
    return this.get('currentDesigner');
  },
  getDataSource: function getDataSource(name) {
    return this.get('dataSource')[name];
  },
  getSidebarExpandedNodes: function getSidebarExpandedNodes() {
    return _.cloneDeep(this.get('designer').sidebar.expandedNodes);
  },
  getSidebarCollapsedNodes: function getSidebarCollapsedNodes() {
    return _.cloneDeep(this.get('designer').sidebar.collapsedNodes);
  },
  setSidebarExpandedNodes: function setSidebarExpandedNodes(expandedNodes) {
    var designer = this.get('designer');
    designer.sidebar.expandedNodes = expandedNodes;
  },
  setSidebarCollapsedNodes: function setSidebarCollapsedNodes(collapsedNodes) {
    var designer = this.get('designer');
    designer.sidebar.collapsedNodes = collapsedNodes;
  },
  setCurrentResource: function setCurrentResource(currentDesigner, resource) {
    this.setDesignerSpecificProperty(currentDesigner, 'selectedResource', resource);
  },
  getCurrentResource: function getCurrentResource(designerName) {
    return this.getDesignerSpecificProperty(designerName, 'selectedResource');
  },
  setDesignerSpecificProperty: function setDesignerSpecificProperty(currentDesigner, propertyName, propertyValue) {
    var designer = this.get('designer');
    var currentDesignerState = designer[currentDesigner];

    if (_.isUndefined(currentDesignerState[propertyName])) {
      throw new Error('Current designer does not have the following property: ' + propertyName);
    }

    currentDesignerState[propertyName] = propertyValue;
  },
  getDesignerSpecificProperty: function getDesignerSpecificProperty(currentDesigner, propertyName) {
    var designer = this.get('designer');
    return designer[currentDesigner][propertyName];
  },
  setDesignerSpecificRuntimeProperty: function setDesignerSpecificRuntimeProperty(currentDesigner, propertyName, propertyValue) {
    var runtime = this.get('runtime'),
        designer = runtime.designer;
    var currentDesignerState = designer[currentDesigner];

    if (_.isUndefined(currentDesignerState[propertyName])) {
      throw new Error('Current designer does not have the following property: ' + propertyName);
    }

    currentDesignerState[propertyName] = propertyValue;
  },
  getDesignerSpecificRuntimeProperty: function getDesignerSpecificRuntimeProperty(currentDesigner, propertyName) {
    var runtime = this.get('runtime'),
        designer = runtime.designer;
    return designer[currentDesigner][propertyName];
  },
  setRuntimeProperty: function setRuntimeProperty(propertyName, propertyValue) {
    var runtime = this.get('runtime');
    runtime[propertyName] = propertyValue;
  },
  getRuntimeProperty: function getRuntimeProperty(propertyName) {
    var runtime = this.get('runtime');
    return runtime[propertyName];
  },
  getDraftState: function getDraftState() {
    return _.cloneDeep(this.getRuntimeProperty('draftState'));
  },
  setDraftState: function setDraftState(draftState) {
    this.setRuntimeProperty('draftState', draftState);
  },
  setCurrentDesigner: function setCurrentDesigner(designer) {
    this.set('currentDesigner', designer);
  },
  setDataSource: function setDataSource(name, options) {
    var dataSource = this.get('dataSource');
    dataSource[name] = options || {};
  },
  getSearchKeyword: function getSearchKeyword(designerName) {
    return this.getDesignerSpecificProperty(designerName, 'searchKeyword');
  },
  getSidebarSearchKeyword: function getSidebarSearchKeyword(designerName) {
    return this.getDesignerSpecificProperty(designerName, 'searchKeyword')['sidebar'];
  },
  getCurrentSelection: function getCurrentSelection(designerName) {
    return this.getDesignerSpecificProperty(designerName, 'selection');
  }
});

module.exports = ViewStateModel;

});