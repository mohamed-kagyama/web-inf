/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!./template/presentationItemTemplate.htm","../../util/columnSetUtil"],function(e,t,o){var r=e("underscore"),n=e("text!./template/presentationItemTemplate.htm"),s=e("../../util/columnSetUtil");o.exports={create:function(e){return{template:n,props:["item","isAdvancedPropertiesPresent","tableRowClass","nestingLevelClass","treeNodeClass","treeIconClass","toggleNodeClass","column0Width","column1Width","eventName"],mixins:e.mixins,components:{treeNode:e.treeNode,togglePropertiesEditor:e.togglePropertiesEditor,removeItem:e.removeItem},methods:r.extend({},s)}}}});