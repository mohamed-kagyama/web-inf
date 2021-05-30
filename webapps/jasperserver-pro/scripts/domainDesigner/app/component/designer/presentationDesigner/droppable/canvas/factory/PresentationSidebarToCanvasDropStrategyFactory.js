define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationSidebarToCanvasDropStrategyFactory = function PresentationSidebarToCanvasDropStrategyFactory(options) {
  this.initialize(options);
};

_.extend(PresentationSidebarToCanvasDropStrategyFactory.prototype, {
  initialize: function initialize(options) {
    this.addDataIslandsBasedOnJoinTreeToCanvasDropStrategy = options.addDataIslandsBasedOnJoinTreeToCanvasDropStrategy;
    this.addDataIslandsBasedOnTableReferenceToCanvasDropStrategy = options.addDataIslandsBasedOnTableReferenceToCanvasDropStrategy;
    this.addPresentationItemsBasedOnJoinTreeToCanvasDropStrategy = options.addPresentationItemsBasedOnJoinTreeToCanvasDropStrategy;
    this.addPresentationItemsBasedOnTableReferenceToCanvasDropStrategy = options.addPresentationItemsBasedOnTableReferenceToCanvasDropStrategy;
    this.addConstantDataIslandToCanvasDropStrategy = options.addConstantDataIslandToCanvasDropStrategy;
    this.addPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy = options.addPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy;
  },
  create: function create(options) {
    if (options.areResourcesReferencedByDataIsland) {
      return this._getDropResourcesStrategy(options);
    } else if (options.isAcceptsSetsOrFields && options.isConstantGroupCalcFieldsAreDropped) {
      return this._getDropResourcesStrategy(options);
    } else {
      return this._getAddDataIslandsStrategy(options);
    }
  },
  _getDropResourcesStrategy: function _getDropResourcesStrategy(options) {
    var parentId = options.targetParentId,
        position = options.position;

    if (options.isMiddleDropZone) {
      parentId = options.targetId;
    }

    var strategyOptions = {
      items: options.items,
      parentId: parentId,
      position: position
    };

    if (options.isConstantGroupCalcFieldsAreDropped) {
      return getDropStrategy(this.addPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy, strategyOptions);
    } else if (options.areResourcesLocatedUnderAJoinTree) {
      return getDropStrategy(this.addPresentationItemsBasedOnJoinTreeToCanvasDropStrategy, strategyOptions);
    } else {
      return getDropStrategy(this.addPresentationItemsBasedOnTableReferenceToCanvasDropStrategy, strategyOptions);
    }
  },
  _getAddDataIslandsStrategy: function _getAddDataIslandsStrategy(options) {
    var strategyOptions = {
      items: options.items,
      position: options.position
    };
    var strategy;

    if (options.isConstantGroupCalcFieldsAreDropped) {
      strategy = getDropStrategy(this.addConstantDataIslandToCanvasDropStrategy, strategyOptions);
    } else if (options.areResourcesLocatedUnderAJoinTree) {
      strategy = getDropStrategy(this.addDataIslandsBasedOnJoinTreeToCanvasDropStrategy, strategyOptions);
    } else {
      strategy = getDropStrategy(this.addDataIslandsBasedOnTableReferenceToCanvasDropStrategy, strategyOptions);
    }

    return strategy;
  }
});

function getDropStrategy(strategy, options) {
  return {
    execute: _.partial(strategy.execute, options)
  };
}

module.exports = PresentationSidebarToCanvasDropStrategyFactory;

});