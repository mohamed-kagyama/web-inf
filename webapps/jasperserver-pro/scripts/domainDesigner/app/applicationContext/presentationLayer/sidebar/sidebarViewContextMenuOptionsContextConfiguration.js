define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var isItemJoinAliasOrTableReferenceUtil = require("../../../component/layout/sidebarView/factory/contextMenu/util/isItemJoinAliasOrTableReferenceUtil");

var getTableReferenceIdByItemUtil = require("../../../component/layout/sidebarView/factory/contextMenu/util/getTableReferenceIdByItemUtil");

var copyDerivedTableMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/copyDerivedTableMenuEventHandlerFactory");

var copyTableReferenceMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/copyTableReferenceMenuEventHandlerFactory");

var createCalcFieldMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/createCalcFieldMenuEventHandlerFactory");

var editCalcFieldMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/editCalcFieldMenuEventHandlerFactory");

var createDerivedTableMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/createDerivedTableMenuEventHandlerFactory");

var editDerivedTableMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/editDerivedTableMenuEventHandlerFactory");

var removeCalcFieldMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/removeCalcFieldMenuEventHandlerFactory");

var removeDerivedTableMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/removeDerivedTableMenuEventHandlerFactory");

var removeTableReferenceMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/removeTableReferenceMenuEventHandlerFactory");

var copyDerivedTableMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/copyDerivedTableMenuOptionFactory");

var copyTableReferenceMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/copyTableReferenceMenuOptionFactory");

var createCalcFieldMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/createCalcFieldMenuOptionFactory");

var createConstantCalcFieldMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/createConstantCalcFieldMenuOptionFactory");

var editCalcFieldMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/editCalcFieldMenuOptionFactory");

var createDerivedTableMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/createDerivedTableMenuOptionFactory");

var editDerivedTableMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/editDerivedTableMenuOptionFactory");

var generateJoinsMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/generateJoinsMenuOptionFactory");

var removeCalcFieldMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/removeCalcFieldMenuOptionFactory");

var removeDerivedTableMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/removeDerivedTableMenuOptionFactory");

var removeTableReferenceMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/removeTableReferenceMenuOptionFactory");

var renameTableReferenceMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/renameTableReferenceMenuOptionFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  context.register('copyDerivedTableMenuEventHandler', copyDerivedTableMenuEventHandlerFactory.create({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('copyDerivedTableMenuOption', copyDerivedTableMenuOptionFactory.create({
    isItemJoinAliasOrTableReference: isItemJoinAliasOrTableReferenceUtil
  }));
  context.register('copyTableReferenceMenuEventHandler', copyTableReferenceMenuEventHandlerFactory.create({
    getTableReferenceIdByItem: getTableReferenceIdByItemUtil,
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('copyTableReferenceMenuOption', copyTableReferenceMenuOptionFactory.create({
    isItemJoinAliasOrTableReference: isItemJoinAliasOrTableReferenceUtil
  }));
  context.register('createCalcFieldMenuEventHandler', createCalcFieldMenuEventHandlerFactory.create({
    calcFieldContextFactory: context.get('calcFieldContextFactory'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('createCalcFieldMenuOption', createCalcFieldMenuOptionFactory.create({
    isItemJoinAliasOrTableReference: isItemJoinAliasOrTableReferenceUtil
  }));
  context.register('createConstantCalcFieldMenuOption', createConstantCalcFieldMenuOptionFactory.create({}));
  context.register('editCalcFieldMenuEventHandler', editCalcFieldMenuEventHandlerFactory.create({
    calcFieldContextFactory: context.get('calcFieldContextFactory'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('editCalcFieldMenuOption', editCalcFieldMenuOptionFactory.create({}));
  context.register('editDerivedTableMenuEventHandler', editDerivedTableMenuEventHandlerFactory.create({
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus')
  }));
  context.register('generateJoinsMenuOption', generateJoinsMenuOptionFactory.create({}));
  context.register('createDerivedTableMenuEventHandler', createDerivedTableMenuEventHandlerFactory.create({
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus')
  }));
  context.register('createDerivedTableMenuOption', createDerivedTableMenuOptionFactory.create({}));
  context.register('editDerivedTableMenuOption', editDerivedTableMenuOptionFactory.create({
    isItemJoinAliasOrTableReference: isItemJoinAliasOrTableReferenceUtil
  }));
  context.register('removeCalcFieldMenuEventHandler', removeCalcFieldMenuEventHandlerFactory.create({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('removeCalcFieldMenuOption', removeCalcFieldMenuOptionFactory.create({}));
  context.register('removeDerivedTableMenuEventHandler', removeDerivedTableMenuEventHandlerFactory.create({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('removeDerivedTableMenuOption', removeDerivedTableMenuOptionFactory.create({
    isItemJoinAliasOrTableReference: isItemJoinAliasOrTableReferenceUtil
  }));
  context.register('removeTableReferenceMenuEventHandler', removeTableReferenceMenuEventHandlerFactory.create({
    getTableReferenceIdByItem: getTableReferenceIdByItemUtil,
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('removeTableReferenceMenuOption', removeTableReferenceMenuOptionFactory.create({
    isItemJoinAliasOrTableReference: isItemJoinAliasOrTableReferenceUtil
  }));
  context.register('renameTableReferenceMenuOption', renameTableReferenceMenuOptionFactory.create({
    isItemJoinAliasOrTableReference: isItemJoinAliasOrTableReferenceUtil
  }));
};

});