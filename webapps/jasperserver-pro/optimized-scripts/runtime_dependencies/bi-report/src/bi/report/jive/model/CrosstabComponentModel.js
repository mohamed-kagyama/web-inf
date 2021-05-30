/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseComponentModel","../enum/jiveTypes","../enum/interactiveComponentTypes","underscore","../../enum/reportEvents"],function(t,e,o){function r(t,e){var o,n={},s=0;if(!e.length||e[0].columnValues&&e[0].columnValues.length>t){for(var u=0,a=e.length;u<a;u++)o=n[e[u].columnValues[t].value]||(n[e[u].columnValues[t].value]=[]),o.push(e[u]);for(var i in n){o=n[i];for(var u=0,a=o.length;u<a;u++)o[u].id+="/"+s;r(t+1,n[i]),s++}}return e}function n(t){for(var e=0,o=t.length;e<o;e++)t[e].groupIndex=e,t[e].id+="/"+e;return t}var s=t("./BaseComponentModel"),u=t("../enum/jiveTypes"),a=t("../enum/interactiveComponentTypes"),i=t("underscore"),c=t("../../enum/reportEvents");o.exports=s.extend({defaults:function(){return{type:u.CROSSTAB,module:"jive.crosstab",uimodule:"jive.crosstab.interactive",id:void 0,crosstabId:void 0,fragmentId:void 0,startColumnIndex:0,rowGroups:[],dataColumns:[]}},actions:{"change:order":function(t){var e=null;return"asc"===t.sort.order&&(e="ASCENDING"),"desc"===t.sort.order&&(e="DESCENDING"),t.componentType===a.CROSSTAB_COLUMN?{actionName:"sortXTabByColumn",sortData:{crosstabId:this.attributes.crosstabId,order:e,measureIndex:t.sortMeasureIndex,columnValues:t.columnValues}}:{actionName:"sortXTabRowGroup",sortData:{crosstabId:this.attributes.crosstabId,order:e||"NONE",groupIndex:t.groupIndex}}}},initialize:function(t){this.config={},i.extend(this.config,t),this.events={ACTION_PERFORMED:"action",BEFORE_ACTION_PERFORMED:"beforeAction"}},getId:function(){return this.config.id},getCrosstabId:function(){return this.config.crosstabId},getFragmentId:function(){return this.config.fragmentId},sortRowGroup:function(t,e){var o=this,r={action:{actionName:"sortXTabRowGroup",sortData:{crosstabId:this.getCrosstabId(),order:e,groupIndex:t}}};o._notify({name:o.events.BEFORE_ACTION_PERFORMED}),o.trigger(c.ACTION,r.action)},isDataColumnSortable:function(t){return"number"==typeof this.config.dataColumns[t-this.config.startColumnIndex].sortMeasureIndex},getColumnOrder:function(t){return this.config.dataColumns[t-this.config.startColumnIndex].order},sortByDataColumn:function(t,e){var o=this,r=this.config.dataColumns[t-this.config.startColumnIndex],n={action:{actionName:"sortXTabByColumn",sortData:{crosstabId:this.getCrosstabId(),order:e,measureIndex:r.sortMeasureIndex,columnValues:r.columnValues}}};o._notify({name:o.events.BEFORE_ACTION_PERFORMED}),o.trigger(c.ACTION,n.action)},updateFromReportComponentObject:function(t){var e={};"order"in t.sort?e.order=t.sort.order:0===i.keys(t.sort).length&&(e.order=null),this.set(e,t)},toReportComponentObject:function(){return this.getDataColumns(this.attributes.dataColumns).concat(this.getRowGroups(this.attributes.rowGroups))},getDataColumns:function(){var t=function(t){var e={id:this.getId()+"/dataColumns",componentType:a.CROSSTAB_COLUMN};return i.map(t,function(t){return i.extend({},e,t)})},e=i.bind(r,this,0),o=function(t){return i.filter(t,function(t){return"number"==typeof t.sortMeasureIndex})},n=function(t){return i.each(t,function(t){t.sort={},"ASCENDING"===t.order&&(t.sort.order="asc"),"DESCENDING"===t.order&&(t.sort.order="desc"),delete t.order}),t};return i.compose(n,o,e,t)}(),getRowGroups:function(){var t=function(t){var e={id:this.getId()+"/rowGroups",componentType:a.CROSSTAB_ROW};return i.map(t,function(t){return i.extend({},e,t)})},e=n,o=function(t){return i.filter(t,function(t){return t.sortable})},r=function(t){return i.each(t,function(t){t.sort={},"ASCENDING"===t.order&&(t.sort.order="asc"),"DESCENDING"===t.order&&(t.sort.order="desc"),delete t.order,delete t.sortable}),t};return i.compose(r,o,e,t)}()})});