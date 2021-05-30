/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,i,n){var t=e("underscore"),o=e("backbone"),s=e("../../../../dispatcher/enum/applicationStateEventsEnum"),r=function(e){this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.joinsDesignerEventBus=e.joinsDesignerEventBus,this.joinConstructorFactory=e.joinConstructorFactory,this.openCannotCreateJoinAttentionDialogStrategy=e.openCannotCreateJoinAttentionDialogStrategy,this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification=e.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification,this._initEvents()};t.extend(r.prototype,o.Events,{_initEvents:function(){this.listenTo(this.joinsDesignerEventBus,"joinTree:drop",this._onJoinTreeDrop),this.listenTo(this.joinsDesignerEventBus,"remove:joinAlias",this._onBeforeRemoveJoinAlias),this.listenTo(this.joinsDesignerEventBus,"remove:joinTree",this._onBeforeRemoveJoinTree),this.listenTo(this.joinsDesignerEventBus,"toggle:joinTree",this._onBeforeToggleJoinTree)},_onJoinTreeDrop:function(e){this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.isSatisfiedBy(e.item)?this.openCannotCreateJoinAttentionDialogStrategy.execute({item:e.item}):this.applicationDispatcherEventBus.trigger(s.JOINS_DESIGNER_SET_JOIN_CONSTRUCTOR_STATE,this.joinConstructorFactory.create(e))},_onBeforeRemoveJoinAlias:function(e){this.applicationDispatcherEventBus.trigger(s.JOINS_DESIGNER_REMOVE_JOIN_ALIAS,e)},_onBeforeRemoveJoinTree:function(e){this.applicationDispatcherEventBus.trigger(s.JOINS_DESIGNER_REMOVE_JOIN_TREE,e)},_onBeforeToggleJoinTree:function(e){this.applicationDispatcherEventBus.trigger(s.JOINS_DESIGNER_TOGGLE_JOIN_TREE,{joinTreeId:e.id,isExpanded:!e.isExpanded})}}),n.exports=r});