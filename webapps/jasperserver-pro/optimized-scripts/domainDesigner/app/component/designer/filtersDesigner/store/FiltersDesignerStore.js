/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/util/SimpleModel"],function(e,r,t){var i=(e("underscore"),e("../../../../../model/util/SimpleModel")),n=i.extend({defaults:function(){return{runtime:{canvasDroppableArea:{isHidden:!0},left:{over:!1},right:{over:!1}},ownTab:"",ownDesigner:"",currentTab:"",currentDesigner:"",filters:[],top:0,scrollPos:0,height:0,canvasHeight:0,isDraftFilterPresent:!1,isInitialDroppableZoneActive:!1,isEmptyDataStructure:!1,searchKeyword:""}}});t.exports=n});