/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/enum/schemaEntitiesEnum","../../../../../model/util/SimpleModel"],function(e,t,r){var i=e("underscore"),n=e("../../../../../model/schema/enum/schemaEntitiesEnum"),s=e("../../../../../model/util/SimpleModel"),l=s.extend({defaults:function(){return{id:null,type:n.DERIVED_TABLE,dataSourceId:null,parentId:null,name:"",originalName:"",query:"",isQueryRunning:!1,queryRunningSource:"",tableNameErrorMessage:"",queryErrorMessage:"",selectedFieldsErrorMessage:"",queryAfterPreviousExecution:"",listWithSelectionHeight:0,visibleFields:[],selection:{rangeStart:0,fields:{}},top:0,scrollPos:0,height:0,queryResultSetHeight:0}},reset:function(e){this.set(i.extend({},this.defaults(),e))}});r.exports=l});