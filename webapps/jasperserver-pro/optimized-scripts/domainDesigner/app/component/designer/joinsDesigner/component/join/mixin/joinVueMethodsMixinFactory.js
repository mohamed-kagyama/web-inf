/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(i,e,n){n.exports={create:function(i){var e=i.joinsDesignerEventBus;return{methods:{toggleJoin:function(){e.trigger("toggle:join",{id:this.join.id,isExpanded:this.join.isExpanded,joinTreeId:this.join.joinTreeId})},removeJoin:function(){e.trigger("remove:join",{id:this.join.id,joinTreeId:this.join.joinTreeId})},selectJoinType:function(i){e.trigger("update:join",{id:this.join.id,joinTreeId:this.join.joinTreeId},{type:i})},selectJoinWeight:function(i){e.trigger("update:join",{id:this.join.id,joinTreeId:this.join.joinTreeId},{weight:i})},isJoinTypeSelected:function(i){return this.join.type===i},isJoinWeightSelected:function(i){return parseInt(this.join.weight,10)===i}}}}}});