/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../../../model/schema/enum/schemaEntitiesEnum","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,i,n){var t=e("underscore"),o=e("backbone"),s=e("../../../../../model/schema/enum/schemaEntitiesEnum"),r=e("../../../../dispatcher/enum/applicationStateEventsEnum"),a=function(e){this.initialize(e)};t.extend(a.prototype,o.Events,{initialize:function(e){this.joinsDesignerEventBus=e.joinsDesignerEventBus,this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.joinExpressionByJoinConstructorAndResourceFactory=e.joinExpressionByJoinConstructorAndResourceFactory,this.openCannotCreateJoinAttentionDialogStrategy=e.openCannotCreateJoinAttentionDialogStrategy,this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification=e.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification,this._initEvents()},_initEvents:function(){this.listenTo(this.joinsDesignerEventBus,"joinConstructor:leftField:remove",this._onLeftDropAreaResourceRemove),this.listenTo(this.joinsDesignerEventBus,"joinConstructor:rightField:drop",this._onRightFieldDrop)},_onRightFieldDrop:function(e,i){var n=this.joinExpressionByJoinConstructorAndResourceFactory.create(e,i),t={label:i.label,resource:i};this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.isSatisfiedBy(t)?this.openCannotCreateJoinAttentionDialogStrategy.execute({item:t}):this._addJoinExpression(n)},_onLeftDropAreaResourceRemove:function(){this.applicationDispatcherEventBus.trigger(r.JOINS_DESIGNER_SET_JOIN_CONSTRUCTOR_STATE,{})},_addJoinExpression:function(e){this.applicationDispatcherEventBus.trigger(r.JOINS_DESIGNER_CREATE_JOIN_EXPRESSION,e,s.JOIN_TREE)}}),n.exports=a});