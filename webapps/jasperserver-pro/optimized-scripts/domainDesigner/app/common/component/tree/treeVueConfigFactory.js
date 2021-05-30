/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../treeItem/treeItemVueConfigFactory","text!./template/treeTemplate.htm"],function(e,t,r){var m=e("../treeItem/treeItemVueConfigFactory"),n=e("text!./template/treeTemplate.htm");r.exports={create:function(e){return e=e||{},{components:{treeItem:e.TreeItem||m.create({debounceTime:e.debounceTime||0})},mixins:e.mixins,template:e.template||n,props:{nodes:{type:Array,default:function(){return[]}},selection:{type:Object}},methods:{toggle:function(e){this.$emit("toggle",e)},select:function(e){this.$emit("select",e)}}}}}});