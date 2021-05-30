/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!AdHocBundle"],function(e,t,n){function a(e,t){var n=r.cloneDeep(e.columnsOutputParams);if(n=n.concat(t.rowsOutputParams),"Measures"!==n[0].name.name){var a=t.options?t.options.x:t.x;r.isUndefined(a)||(n[0].value=e.heatmapXCategories[a])}return n}var r=e("underscore"),o=e("bundle!AdHocBundle"),s=function(){this._timestampToMemberMapping={}};r.extend(s.prototype,{perform:function(e,t){var n=e.options.linkOptions,a=this;n&&n.events&&("timeseries_heatmap"===t.series[0].chartType&&(t.chart.events||(t.chart.events={}),n.events.click&&(t.chart.events.click=function(t){var r=this.hoverPoint,o=r.series.options;n.events.click.call(this,t,a.getHyperlink(o,r,e))})),r.forEach(t.series,function(t){t.cursor="pointer",t.point||(t.point={}),t.point.events={},"timeseries_heatmap"!==t.chartType&&a.attachEvent.call(a,"click",n,t,e),a.attachEvent.call(a,"mouseOver",n,t,e),a.attachEvent.call(a,"mouseOut",n,t,e)}))},getOutputParamsForTreemap:function(e,t,n){var a=n.adHocModel.component.getChartComponent(),o=a.components.findComponentDeep("measure"),s=r.pluck(n.adHocModel.dataSet.attributes.dataset.axes[1].levels,"level"),i=s.length>1?t.id.split("/@#/").slice(1):[t.name];return r.map(i,function(e,t){return{value:e,name:{name:s[t].referenceObject.name}}}).concat({value:r.map(o,function(e){return e.label(!0)}),name:{name:"Measures"}})},getOutputParams:function(e,t,n){var o=[];return e.columnsOutputParams&&(o=o.concat(e.columnsOutputParams)),t&&t.rowsOutputParams&&(o=o.concat(t.rowsOutputParams)),"treemap"===e.chartType&&t&&(o=o.concat(this.getOutputParamsForTreemap(e,t,n))),"heatmap"===e.chartType&&t&&(o=a(e,t)),o=r.filter(o,function(e){return!r.isUndefined(e.value)})},getMeasureReferenceByLabel:function(e,t){return r.find(e,function(e){return e.label(!0)===t}).get("reference")},getMeasures:function(e,t){var n=t.adHocModel.component.getChartComponent(),a=n.components.findComponentDeep("measure");return r.isArray(e)?r.map(e,function(e){return this.getMeasureReferenceByLabel(a,e)},this):[this.getMeasureReferenceByLabel(a,e)]},getHyperlink:function(e,t,n){return r.reduce(this.getOutputParams(e,t,n),function(e,t){return"Measures"===t.name.name||"MeasuresLevel"===t.name.name?e.Measures=this.getMeasures(t.value,n):e[t.name.name]=this.loadInitialValue(this.encodeFieldValue(t.value)),e},{},this)},getHyperlinks:function(e,t){var n=this;return r.map(r.flatten(r.map(e.series,function(e){return r.map(e.data,function(a){return n.getHyperlink(e,a,t)})})),function(e){return{element:null,data:e}})},encodeFieldValue:function(e){switch(e){case o["adhoc.node.other.node"]:e="other_node";break;case o["adhoc.node.total.node"]:e="total_node"}return e},attachEvent:function(e,t,n,a){var r=this;t.events[e.toLowerCase()]&&(n.point.events[e]=function(o){var s=this;t.events[e.toLowerCase()].call(r,o,r.getHyperlink(n,s,a),null,null)})},saveInitialValue:function(e,t){this._timestampToMemberMapping[e]=t},loadInitialValue:function(e){return r.isUndefined(this._timestampToMemberMapping[e])?e:this._timestampToMemberMapping[e]}}),n.exports=s});