/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../common/mixin/selection/selectionMixin"],function(e,i,t){var n=e("underscore"),s=e("../../../../../common/mixin/selection/selectionMixin"),o=function(e){this.initialize(e)};n.extend(o.prototype,{selection:{selector:"li",attrs:["id"],onSelection:"selectItem"},initialize:function(e){this.$el=e.el,this.metadataDesignerEventBus=e.metadataDesignerEventBus,this.sidebarTreeModel=e.sidebarTreeModel,this._initializeSelectable&&this._initializeSelectable()},selectItem:function(e){var i=this.sidebarTreeModel.getNode(e.id);this.metadataDesignerEventBus.trigger("sidebar:selectItem",i.resource)}},s),t.exports=o});