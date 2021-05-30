/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseComponentModel","../enum/jiveTypes","jquery","backbone","./ColumnGroupModel"],function(e,n,t){var r=e("./BaseComponentModel"),o=e("../enum/jiveTypes"),i=e("jquery"),l=e("backbone"),s=e("./ColumnGroupModel"),u=null,a=l.Collection.extend({model:s});t.exports=r.extend({defaults:function(){return{calendarPatterns:{},filterPatterns:{},fontSizes:[],fonts:{},operators:{},patterns:{},id:null,genericProperties:{},module:"jive.table",type:o.TABLE,uimodule:"jive.interactive.column",hasFloatingHeader:null}},constructor:function(){this.columnGroups=new a,r.prototype.constructor.apply(this,arguments)},initialize:function(e){this.config={id:null,allColumnsData:null},i.extend(this.config,e),e.genericProperties?u=e.genericProperties:this.config.genericProperties=u,this.columns=[],this.columnMap={}},parse:function(e){var n=this;return e.allColumnGroupsData&&(this.columnGroups.reset(e.allColumnGroupsData,{silent:!0,parse:!0}),this.columnGroups.each(function(e){e.parent=n})),e},registerPart:function(e){e.parent=this,e.trigger("parentTableComponentAttached"),this.columns[e.get("columnIndex")]=e,this.columnMap[e.get("id")]=e},getId:function(){return this.config.id},handleServerError:function(e){this.trigger("serverError",e)},handleClientError:function(e){this.trigger("serverError",e)}})});