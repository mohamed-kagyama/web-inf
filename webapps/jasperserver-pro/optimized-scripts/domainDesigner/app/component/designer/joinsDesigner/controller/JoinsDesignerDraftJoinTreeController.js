/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,i,n){var t=e("underscore"),o=e("backbone"),a=e("../../../../dispatcher/enum/applicationStateEventsEnum"),s=function(e){this.initialize(e)};t.extend(s.prototype,o.Events,{initialize:function(e){t.bindAll(this,"_renameDraftJoinTree","_onRenameDialogInput","_onRenameDialogCancel"),this.joinsDesignerEventBus=e.joinsDesignerEventBus,this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.renameDraftJoinTreeDialog=e.renameDraftJoinTreeDialog,this.renameDraftJoinTreeDialogStore=e.renameDraftJoinTreeDialogStore,this.renameJoinTreeValidator=e.renameJoinTreeValidator,this.joinsDesignerViewStateModelService=e.joinsDesignerViewStateModelService,this.advancedJoinsMappingSpecification=e.advancedJoinsMappingSpecification,this.joinExpressionByJoinConstructorAndResourceFactory=e.joinExpressionByJoinConstructorAndResourceFactory,this.openCannotCreateJoinAttentionDialogStrategy=e.openCannotCreateJoinAttentionDialogStrategy,this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification=e.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification,this._initEvents()},_initEvents:function(){this.listenTo(this.joinsDesignerEventBus,"remove:draftJoinTree",this._onRemoveDraftJoinTree),this.listenTo(this.joinsDesignerEventBus,"remove:draftJoinTreeJoin",this._onRemoveDraftJoinTree),this.listenTo(this.joinsDesignerEventBus,"draftJoinTree:joinConstructor:rightField:drop",this._onRightFieldDrop),this.listenTo(this.joinsDesignerEventBus,"draftJoinTree:joinConstructor:leftField:remove",this._onRemoveDraftJoinTree),this.listenTo(this.joinsDesignerEventBus,"toggle:draftJoinTree",this._onToggleDraftJoinTree),this.listenTo(this.joinsDesignerEventBus,"toggle:draftJoinTreeJoin",this._onToggleDraftJoinTreeJoin),this.listenTo(this.joinsDesignerEventBus,"update:draftJoinTreeJoin:type",this._updateDraftJoinTreeJoin),this.listenTo(this.joinsDesignerEventBus,"update:draftJoinTreeJoin:weight",this._updateDraftJoinTreeJoin),this.listenTo(this.joinsDesignerEventBus,"draftJoinTree:toggle:useMinimumPathJoins",this._onToggleDraftJoinTreeUseMinimumPathJoins),this.listenTo(this.joinsDesignerEventBus,"draftJoinTree:toggle:useAllDataIslandJoins",this._onToggleDraftJoinTreeUseAllDataIslandJoins),this.listenTo(this.joinsDesignerEventBus,"show:renameDraftJoinTreeDialog",this._onShowRenameDraftJoinTreeDialog),this.renameDraftJoinTreeDialog.$on("ok",this._renameDraftJoinTree),this.renameDraftJoinTreeDialog.$on("input",this._onRenameDialogInput),this.renameDraftJoinTreeDialog.$on("cancel",this._onRenameDialogCancel)},_onRightFieldDrop:function(e,i){var n=this.joinsDesignerViewStateModelService.getDraftJoinTree(),o={label:i.label,resource:i},s=this.joinExpressionByJoinConstructorAndResourceFactory.create(e,i);s=t.extend({},s,{joinType:n.join.type,joinWeight:n.join.weight});var r={name:n.name,index:n.index,includeAllDataIslandJoins:n.includeAllDataIslandJoins,suppressCircularJoins:n.suppressCircularJoins,joinExpression:s};this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.isSatisfiedBy(o)?this.openCannotCreateJoinAttentionDialogStrategy.execute({item:o}):this.applicationDispatcherEventBus.trigger(a.JOINS_DESIGNER_CREATE_JOIN_TREE_WITH_JOIN_EXPRESSION,r)},_onRemoveDraftJoinTree:function(){this._setDraftJoinTreeState({})},_onToggleDraftJoinTree:function(e){this._updateDraftJoinTree({isExpanded:!e.isExpanded})},_onToggleDraftJoinTreeUseMinimumPathJoins:function(e){var i=this._getAdvancedDraftJoinTreeOptions({useMinimumPathJoins:!e.joinTree.useMinimumPathJoins,useAllDataIslandJoins:!1});this._updateDraftJoinTree(i)},_onToggleDraftJoinTreeUseAllDataIslandJoins:function(e){var i=this._getAdvancedDraftJoinTreeOptions({useMinimumPathJoins:!1,useAllDataIslandJoins:!e.joinTree.useAllDataIslandJoins});this._updateDraftJoinTree(i)},_onToggleDraftJoinTreeJoin:function(e){this._updateDraftJoinTreeJoin({isExpanded:!e.isExpanded})},_onShowRenameDraftJoinTreeDialog:function(e){this.renameDraftJoinTreeDialogStore.show=!0,this.renameDraftJoinTreeDialogStore.value=e.joinTree.name,this.renameDraftJoinTreeDialogStore.originalValue=e.joinTree.name,this.renameDraftJoinTreeDialogStore.validationMessage=""},_renameDraftJoinTree:function(e){var i=this.renameJoinTreeValidator.validate(this.renameDraftJoinTreeDialogStore);i?this.renameDraftJoinTreeDialogStore.validationMessage=i:(this._updateDraftJoinTree({name:e}),this.renameDraftJoinTreeDialogStore.show=!1)},_onRenameDialogInput:function(e){this.renameDraftJoinTreeDialogStore.value=e,this.renameDraftJoinTreeDialogStore.validationMessage=""},_onRenameDialogCancel:function(){this.renameDraftJoinTreeDialogStore.show=!1},_updateDraftJoinTreeJoin:function(e){var i=this.joinsDesignerViewStateModelService.getDraftJoinTree();i=t.extend({},i,{join:t.extend({},i.join,e)}),this._setDraftJoinTreeState(i)},_updateDraftJoinTree:function(e){var i=this.joinsDesignerViewStateModelService.getDraftJoinTree();i=t.extend({},i,e),this._setDraftJoinTreeState(i)},_getAdvancedDraftJoinTreeOptions:function(e){var i=e.useMinimumPathJoins,n=e.useAllDataIslandJoins;return{suppressCircularJoins:this.advancedJoinsMappingSpecification.isSuppressCircularJoinOn(i,n),includeAllDataIslandJoins:this.advancedJoinsMappingSpecification.isIncludeAllDataIslandJoinsOn(i,n)}},_setDraftJoinTreeState:function(e){this.applicationDispatcherEventBus.trigger(a.JOINS_DESIGNER_SET_DRAFT_JOIN_TREE_STATE,e)}}),n.exports=s});