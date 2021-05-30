define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerDraftJoinTreeController = function JoinsDesignerDraftJoinTreeController(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerDraftJoinTreeController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    _.bindAll(this, "_renameDraftJoinTree", "_onRenameDialogInput", "_onRenameDialogCancel");

    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.renameDraftJoinTreeDialog = options.renameDraftJoinTreeDialog;
    this.renameDraftJoinTreeDialogStore = options.renameDraftJoinTreeDialogStore;
    this.renameJoinTreeValidator = options.renameJoinTreeValidator;
    this.joinsDesignerViewStateModelService = options.joinsDesignerViewStateModelService;
    this.advancedJoinsMappingSpecification = options.advancedJoinsMappingSpecification;
    this.joinExpressionByJoinConstructorAndResourceFactory = options.joinExpressionByJoinConstructorAndResourceFactory;
    this.openCannotCreateJoinAttentionDialogStrategy = options.openCannotCreateJoinAttentionDialogStrategy;
    this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification = options.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'remove:draftJoinTree', this._onRemoveDraftJoinTree);
    this.listenTo(this.joinsDesignerEventBus, 'remove:draftJoinTreeJoin', this._onRemoveDraftJoinTree);
    this.listenTo(this.joinsDesignerEventBus, 'draftJoinTree:joinConstructor:rightField:drop', this._onRightFieldDrop);
    this.listenTo(this.joinsDesignerEventBus, 'draftJoinTree:joinConstructor:leftField:remove', this._onRemoveDraftJoinTree);
    this.listenTo(this.joinsDesignerEventBus, 'toggle:draftJoinTree', this._onToggleDraftJoinTree);
    this.listenTo(this.joinsDesignerEventBus, 'toggle:draftJoinTreeJoin', this._onToggleDraftJoinTreeJoin);
    this.listenTo(this.joinsDesignerEventBus, 'update:draftJoinTreeJoin:type', this._updateDraftJoinTreeJoin);
    this.listenTo(this.joinsDesignerEventBus, 'update:draftJoinTreeJoin:weight', this._updateDraftJoinTreeJoin);
    this.listenTo(this.joinsDesignerEventBus, 'draftJoinTree:toggle:useMinimumPathJoins', this._onToggleDraftJoinTreeUseMinimumPathJoins);
    this.listenTo(this.joinsDesignerEventBus, 'draftJoinTree:toggle:useAllDataIslandJoins', this._onToggleDraftJoinTreeUseAllDataIslandJoins);
    this.listenTo(this.joinsDesignerEventBus, 'show:renameDraftJoinTreeDialog', this._onShowRenameDraftJoinTreeDialog);
    this.renameDraftJoinTreeDialog.$on("ok", this._renameDraftJoinTree);
    this.renameDraftJoinTreeDialog.$on("input", this._onRenameDialogInput);
    this.renameDraftJoinTreeDialog.$on("cancel", this._onRenameDialogCancel);
  },
  _onRightFieldDrop: function _onRightFieldDrop(joinConstructor, resource) {
    var draftJoinTree = this.joinsDesignerViewStateModelService.getDraftJoinTree();
    var item = {
      label: resource.label,
      resource: resource
    };
    var joinExpression = this.joinExpressionByJoinConstructorAndResourceFactory.create(joinConstructor, resource);
    joinExpression = _.extend({}, joinExpression, {
      joinType: draftJoinTree.join.type,
      joinWeight: draftJoinTree.join.weight
    });
    var joinTree = {
      name: draftJoinTree.name,
      index: draftJoinTree.index,
      includeAllDataIslandJoins: draftJoinTree.includeAllDataIslandJoins,
      suppressCircularJoins: draftJoinTree.suppressCircularJoins,
      joinExpression: joinExpression
    };

    if (this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.isSatisfiedBy(item)) {
      this.openCannotCreateJoinAttentionDialogStrategy.execute({
        item: item
      });
    } else {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_CREATE_JOIN_TREE_WITH_JOIN_EXPRESSION, joinTree);
    }
  },
  _onRemoveDraftJoinTree: function _onRemoveDraftJoinTree() {
    this._setDraftJoinTreeState({});
  },
  _onToggleDraftJoinTree: function _onToggleDraftJoinTree(options) {
    this._updateDraftJoinTree({
      isExpanded: !options.isExpanded
    });
  },
  _onToggleDraftJoinTreeUseMinimumPathJoins: function _onToggleDraftJoinTreeUseMinimumPathJoins(options) {
    var advancedOptions = this._getAdvancedDraftJoinTreeOptions({
      useMinimumPathJoins: !options.joinTree.useMinimumPathJoins,
      useAllDataIslandJoins: false
    });

    this._updateDraftJoinTree(advancedOptions);
  },
  _onToggleDraftJoinTreeUseAllDataIslandJoins: function _onToggleDraftJoinTreeUseAllDataIslandJoins(options) {
    var advancedOptions = this._getAdvancedDraftJoinTreeOptions({
      useMinimumPathJoins: false,
      useAllDataIslandJoins: !options.joinTree.useAllDataIslandJoins
    });

    this._updateDraftJoinTree(advancedOptions);
  },
  _onToggleDraftJoinTreeJoin: function _onToggleDraftJoinTreeJoin(options) {
    this._updateDraftJoinTreeJoin({
      isExpanded: !options.isExpanded
    });
  },
  _onShowRenameDraftJoinTreeDialog: function _onShowRenameDraftJoinTreeDialog(options) {
    this.renameDraftJoinTreeDialogStore.show = true;
    this.renameDraftJoinTreeDialogStore.value = options.joinTree.name;
    this.renameDraftJoinTreeDialogStore.originalValue = options.joinTree.name;
    this.renameDraftJoinTreeDialogStore.validationMessage = '';
  },
  _renameDraftJoinTree: function _renameDraftJoinTree(name) {
    var validationMessage = this.renameJoinTreeValidator.validate(this.renameDraftJoinTreeDialogStore);

    if (validationMessage) {
      this.renameDraftJoinTreeDialogStore.validationMessage = validationMessage;
    } else {
      this._updateDraftJoinTree({
        name: name
      });

      this.renameDraftJoinTreeDialogStore.show = false;
    }
  },
  _onRenameDialogInput: function _onRenameDialogInput(value) {
    this.renameDraftJoinTreeDialogStore.value = value;
    this.renameDraftJoinTreeDialogStore.validationMessage = '';
  },
  _onRenameDialogCancel: function _onRenameDialogCancel() {
    this.renameDraftJoinTreeDialogStore.show = false;
  },
  _updateDraftJoinTreeJoin: function _updateDraftJoinTreeJoin(options) {
    var draftJoinTree = this.joinsDesignerViewStateModelService.getDraftJoinTree();
    draftJoinTree = _.extend({}, draftJoinTree, {
      join: _.extend({}, draftJoinTree.join, options)
    });

    this._setDraftJoinTreeState(draftJoinTree);
  },
  _updateDraftJoinTree: function _updateDraftJoinTree(options) {
    var draftJoinTree = this.joinsDesignerViewStateModelService.getDraftJoinTree();
    draftJoinTree = _.extend({}, draftJoinTree, options);

    this._setDraftJoinTreeState(draftJoinTree);
  },
  _getAdvancedDraftJoinTreeOptions: function _getAdvancedDraftJoinTreeOptions(options) {
    var useMinimumPathJoins = options.useMinimumPathJoins,
        useAllDataIslandJoins = options.useAllDataIslandJoins;
    return {
      suppressCircularJoins: this.advancedJoinsMappingSpecification.isSuppressCircularJoinOn(useMinimumPathJoins, useAllDataIslandJoins),
      includeAllDataIslandJoins: this.advancedJoinsMappingSpecification.isIncludeAllDataIslandJoinsOn(useMinimumPathJoins, useAllDataIslandJoins)
    };
  },
  _setDraftJoinTreeState: function _setDraftJoinTreeState(state) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_SET_DRAFT_JOIN_TREE_STATE, state);
  }
});

module.exports = JoinsDesignerDraftJoinTreeController;

});