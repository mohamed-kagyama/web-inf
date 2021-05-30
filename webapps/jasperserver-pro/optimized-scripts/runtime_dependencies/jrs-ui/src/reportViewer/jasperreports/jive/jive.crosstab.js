/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(t,n,o){var e=t("jquery"),r=function(t){this.config={},e.extend(this.config,t),this.parent=null,this.loader=null,this.events={ACTION_PERFORMED:"action",BEFORE_ACTION_PERFORMED:"beforeAction"}};r.prototype={getId:function(){return this.config.crosstabId},getFragmentId:function(){return this.config.fragmentId},sortRowGroup:function(t,n){var o=this,e={action:{actionName:"sortXTabRowGroup",sortData:{crosstabId:this.getId(),order:n,groupIndex:t}}};return o._notify({name:o.events.BEFORE_ACTION_PERFORMED}),this.loader.runAction(e).then(function(t){return o._notify({name:o.events.ACTION_PERFORMED,type:"sortXTabRowGroup",data:t}),o})},isDataColumnSortable:function(t){return"number"==typeof this.config.dataColumns[t-this.config.startColumnIndex].sortMeasureIndex},getColumnOrder:function(t){return this.config.dataColumns[t-this.config.startColumnIndex].order},sortByDataColumn:function(t,n){var o=this,e=this.config.dataColumns[t-this.config.startColumnIndex],r={action:{actionName:"sortXTabByColumn",sortData:{crosstabId:this.getId(),order:n,measureIndex:e.sortMeasureIndex,columnValues:e.columnValues}}};return o._notify({name:o.events.BEFORE_ACTION_PERFORMED}),this.loader.runAction(r).then(function(t){return o._notify({name:o.events.ACTION_PERFORMED,type:"sortXTabByColumn",data:t}),o})},_notify:function(t){this.parent._notify(t)}},o.exports=r});