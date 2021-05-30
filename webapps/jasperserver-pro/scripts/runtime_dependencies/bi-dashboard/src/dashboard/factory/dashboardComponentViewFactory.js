define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ComponentView = require('../view/base/ComponentView');

var DesignerComponentView = require('../view/designer/DesignerComponentView');

var reportTrait = require('../view/base/componentViewTrait/reportTrait');

var webPageTrait = require('../view/base/componentViewTrait/webPageTrait');

var textTrait = require('../view/base/componentViewTrait/textTrait');

var imageTrait = require('../view/base/componentViewTrait/imageTrait');

var filterGroupTrait = require('../view/base/componentViewTrait/filterGroupTrait');

var inputControlTrait = require('../view/base/componentViewTrait/inputControlTrait');

var dashletTrait = require('../view/base/componentViewTrait/dashletTrait');

var designerDashletTrait = require('../view/designer/componentViewTrait/designerDashletTrait');

var designerInputControlTrait = require('../view/designer/componentViewTrait/designerInputControlTrait');

var designerAdhocViewTrait = require('../view/designer/componentViewTrait/designerAdhocViewTrait');

var designerFilterGroupTrait = require('../view/designer/componentViewTrait/designerFilterGroupTrait');

var designerVisualizationTrait = require('../view/designer/componentViewTrait/designerVisualizationTrait');

var designerTextTrait = require('../view/designer/componentViewTrait/designerTextTrait');

var designerImageTrait = require('../view/designer/componentViewTrait/designerImageTrait');

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

var adhocTrait = require('../view/base/componentViewTrait/adhocTrait');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var viewerTypeToConstructorMap = {};
var designerTypeToConstructorMap = {};
viewerTypeToConstructorMap[dashboardComponentTypes.WEB_PAGE_VIEW] = webPageTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.FILTER_GROUP] = filterGroupTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.FREE_TEXT] = textTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.IMAGE] = imageTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.INPUT_CONTROL] = inputControlTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.REPORT] = reportTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.ADHOC_VIEW] = adhocTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.CROSSTAB] = adhocTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.CHART] = adhocTrait;
viewerTypeToConstructorMap[dashboardComponentTypes.TABLE] = adhocTrait;
designerTypeToConstructorMap[dashboardComponentTypes.INPUT_CONTROL] = designerInputControlTrait;
designerTypeToConstructorMap[dashboardComponentTypes.ADHOC_VIEW] = designerAdhocViewTrait;
designerTypeToConstructorMap[dashboardComponentTypes.CROSSTAB] = designerVisualizationTrait;
designerTypeToConstructorMap[dashboardComponentTypes.CHART] = designerVisualizationTrait;
designerTypeToConstructorMap[dashboardComponentTypes.TABLE] = designerVisualizationTrait;
designerTypeToConstructorMap[dashboardComponentTypes.FILTER_GROUP] = designerFilterGroupTrait;
designerTypeToConstructorMap[dashboardComponentTypes.FREE_TEXT] = designerTextTrait;
designerTypeToConstructorMap[dashboardComponentTypes.IMAGE] = designerImageTrait;
/**
 * @memberof factory:dashboardComponentViewFactory
 * @param {object} type - designerDashletTrait or dashletTrait
 * @param {object} trait - specific component view trait, depends on model.
 * @desc mixes two traits - designerDashletTrait or dashletTrait plus specific component view trait which depends on model.
 */

/**
 * @memberof factory:dashboardComponentViewFactory
 * @param {object} type - designerDashletTrait or dashletTrait
 * @param {object} trait - specific component view trait, depends on model.
 * @desc mixes two traits - designerDashletTrait or dashletTrait plus specific component view trait which depends on model.
 */

function mixin(type, trait) {
  for (var field in trait) {
    if (type[field] && _.isFunction(type[field]) && _.isFunction(trait[field])) {
      type[field] = combineFunctions(type[field], trait[field]);
    } else {
      type[field] = trait[field];
    }
  }
}
/**
 * @memberof factory:dashboardComponentViewFactory
 * @param {object} first - method from designerDashletTrait or dashletTrait trait
 * @param {object} second - method from specific component view trait, depends on model.
 * @desc combines two traits functions (if such, with the same name, exists in each of the traits)
 * @returns {function}
 */

/**
 * @memberof factory:dashboardComponentViewFactory
 * @param {object} first - method from designerDashletTrait or dashletTrait trait
 * @param {object} second - method from specific component view trait, depends on model.
 * @desc combines two traits functions (if such, with the same name, exists in each of the traits)
 * @returns {function}
 */


function combineFunctions(first, second) {
  return function () {
    first.apply(this, arguments);
    return second.apply(this, arguments);
  };
}

module.exports = function (options, isDesigner) {
  var modelType = options.model.get('type'),
      typeMap = isDesigner && modelType in designerTypeToConstructorMap ? designerTypeToConstructorMap : viewerTypeToConstructorMap,
      trait = modelType !== dashboardComponentTypes.INPUT_CONTROL ? _.extend({}, isDesigner ? designerDashletTrait : dashletTrait) : {};
  mixin(trait, modelType in typeMap ? typeMap[modelType] : {});
  var baseConstructor = isDesigner ? DesignerComponentView : ComponentView,
      viewClass = baseConstructor.extend(trait);
  return new viewClass(options);
};

});