/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/util/SimpleModel"],function(e,t,n){var l=e("underscore"),i=e("../../../../model/util/SimpleModel");n.exports=i.extend({defaults:function(){return{interceptedAction:null,isAllDependenciesExceptDataIslandsVisible:!1,isDataIslandsVisible:!1,allDependenciesExceptDataIslandsAlignment:"",dataIslandsAlignment:""}},reset:function(){var e=this.defaults();l.extend(this.attributes,e)}})});