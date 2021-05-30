/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","bundle!AdHocBundle","../../model/factory/formattersFactory"],function(e,t,a){var o=e("underscore"),l=e("jquery"),r=e("bundle!AdHocBundle"),s=e("../../model/factory/formattersFactory"),n=function(){this.totalsData={},this.totals=[],this.lastGroupLabel=null,this.lastRowIndex=0,this.grandTotalRow=null,this.nextRowClassName="jr-mDatatable-rowOdd"};n.linkTypes={HEADER:"HEADER",DATA:"DATA",GROUP_LABEL:"GROUP_LABEL",GROUP_TOTAL:"GROUP_TOTAL",GRAND_TOTAL:"GRAND_TOTAL"},n.prototype.reset=function(){n.call(this)},n.prototype.convert=function(e,t){this.metadata=e,this.dataset=t;var a=[],l=(this.hasGroups(t),this.hasTotals(t)),r=this.getColumns(),s=l&&this.getTotals(t),n=this.getGroupLevels(),i=this.getTableProperties();return this.showDetails=i.showDetails,this.showTotals=i.showTotals,t.dataset.levelDataNodes&&t.dataset.levelDataNodes[0].all?o.each(t.dataset.levelDataNodes[0].all.children,function(e){this.processChild({child:e,data:a,label:"",levels:n,levelIdx:0,columns:r,totals:s,hyperlink:{}})},this):o.each(t.dataset.levelDataNodes,function(e){this.processChild({child:e,data:a,label:"",levels:n,levelIdx:0,columns:r,totals:s,hyperlink:{}})},this),l&&t.dataset.levelDataNodes&&!this.grandTotalRow?this.grandTotalRow=this.makeGrandTotalRow(t.dataset.levelDataNodes[0].all.data,s,a.length):this.grandTotalRow||(this.grandTotalRow=[]),this.parseOddEven(this.parseLinks(this.parseRows(a,t),r))},n.prototype.getTotals=function(e){return o.find(e.dataset.levels,function(e){return e.all}).all.aggregations},n.prototype.getColumns=function(){var e=this.metadata.component.findComponentDeep("column"),t=/^_spacer/;return o.map(e,function(e,a){return"_artificial"===e.get("detailFieldReference")||t.test(e.get("detailFieldReference"))?o.extend({},e.attributes,{index:a}):o.extend({},e.attributes,e.level().toJSON(),{index:a})})},n.prototype.getGroups=function(){var e=this.metadata.component.findComponentDeep("group");return o.map(e,function(e,t){return o.extend({},e.attributes,e.level().toJSON(),{index:t})})},n.prototype.makeGrandTotalRow=function(e,t,a){if(!a&&n.totalDataEqualsZero(e))return[];var l=0,r=this.getColumns(),i=this.getGroups(),p=o.pluck(t,"reference"),u=o.pluck(r,"reference"),h="";return o.map(u,function(t,a){return o.contains(p,t)?(h=r[a].showSummary?s(r[a].aggregationType).format(e[l],r[a].aggregationFormat):"",l++,{label:h,colspan:1,rowspan:1,className:"jrs-grid-group",hyperlink:{value:h,id:"f_"+a,linkType:n.linkTypes.GRAND_TOTAL,column:r[a],group:i,row:{relativeIndex:-1,cells:r}}}):{label:"",colspan:1,rowspan:1,className:"jrs-grid-group",hyperlink:{value:"",id:"f_"+a,linkType:n.linkTypes.GRAND_TOTAL,row:{relativeIndex:-1,cells:r},column:r[a],group:i}}})},n.prototype.makeGroupRow=function(e){return[{label:this.getGroupLabelParts(e.hyperlink.groupMembers).join(", "),colspan:e.columns.length,rowspan:1,className:"jr-mDatatable-rowGroup",hyperlink:{value:this.getRawGroupLabel(e.hyperlink.groupMembers),linkType:n.linkTypes.GROUP_LABEL,group:this.getGroupRow(e.hyperlink.groupMembers),row:{}}}]},n.prototype.getRawGroupLabel=function(e){var t=this.getGroupRow(e);return o.map(t,function(e){return e.value}).join(", ")},n.prototype.getGroupLabelParts=function(e){var t=this.getGroupRow(e);return o.map(t,function(e){return s(e.type).format(e.value,e.format)})},n.prototype.makeTotalRow=function(e){var t=0,a=this,l=[e.levels[e.levelIdx].group.members[e.child.group.memberIdx]].concat(e.child.group.data),i=this.getColumns(),p="",u=o.pluck(e.totals,"reference"),h=o.pluck(e.columns,"reference"),c=o.last(this.getGroupLabelParts(e.hyperlink.groupMembers)),d=o.map(h,function(h,d){return 0===d?(p=l[t++],{label:r["adhoc.node.total.node.table"].replace("{0}",c),colspan:1,rowspan:1,className:"jr-mDatatable-rowGrouptotal",hyperlink:{value:r["adhoc.node.total.node.table"].replace("{0}",p),linkType:n.linkTypes.GROUP_LABEL,group:a.getGroupRow(e.hyperlink.groupMembers),column:i[d],row:{cells:i}}}):o.contains(u,h)?(p=i[d].showSummary?s(i[d].aggregationType).format(l[t],i[d].aggregationFormat):"",t++,{label:p,colspan:1,rowspan:1,className:"jr-mDatatable-rowGrouptotal",hyperlink:{value:p,linkType:n.linkTypes.GROUP_TOTAL,group:a.getGroupRow(e.hyperlink.groupMembers),column:i[d],row:{cells:i}}}):{label:"",colspan:1,rowspan:1,className:"jr-mDatatable-rowGrouptotal",hyperlink:{value:"",linkType:n.linkTypes.GROUP_TOTAL,group:a.getGroupRow(e.hyperlink.groupMembers),column:i[d],row:{cells:i}}}});return d.fieldDisplay=this.metadata.dataSet.query.rows.axis.get(e.levels[e.levelIdx].group.reference).label(),d},n.prototype.makeDetailRow=function(e,t){var a=this,l=this.getDetailRow(e);return o.map(l,function(e){return{label:e.value,colspan:1,rowspan:1,hyperlink:{value:e.initialValue,linkType:n.linkTypes.DATA,group:a.getGroupRow(t.hyperlink.groupMembers),column:e,row:{cells:l}}}})},n.prototype.getPresentation=function(){function e(t,a){return a||(a=[]),o.each(t,function(t){t.group?e(t.group.elements,a):t.element&&a.push(t)}),a}return o.pluck(e(this.metadata.schema.attributes.presentation),"element")},n.prototype.getGroupRow=function(e){var t=this.getGroupLevels(),a=this.getGroups();return o.map(e,function(e,l){return o.extend({},a[l],{value:t[l].group.members[e]})})},n.prototype.getDetailRow=function(e){var t=0,a=/^_spacer/;return o.map(this.getColumns(),function(l,r){var n,i;return"_artificial"===l.reference||a.test(l.reference)?n=i="":(i=e[t++],n=s(l.type).format(i,l.format)),o.extend({},l,{value:n,initialValue:i})})},n.prototype.getGroupLevels=function(){return o.filter(this.dataset.dataset.levels,function(e){return e.group})},n.prototype.hasGroups=function(e){return!!this.getGroupLevels(e).length},n.prototype.hasTotals=function(e){var t=o.find(e.dataset.levels,function(e){return e.all});return!(!t||!t.all.aggregations)},n.prototype.getTableProperties=function(){return this.metadata.component.components.findComponentDeep("table")[0].attributes},n.prototype.hasDetails=function(e){return!!o.find(e.dataset.levels,function(e){return e.detail})},n.prototype.processChild=function(e){e.hyperlink.groupMembers||(e.hyperlink.groupMembers=[]),e.child.group&&(e.hyperlink.groupMembers.push(e.child.group.memberIdx),e.child.group.data&&this.getTableProperties().showTotals&&(!this.showDetails&&this.showTotals?(e.levelIdx===e.levels.length-1?e.data.push(this.makeTotalRow(e)):this.totalsData[e.levelIdx]&&this.totals.push(this.totalsData[e.levelIdx]),this.totalsData[e.levelIdx]=this.makeTotalRow(e)):(this.totalsData[e.levelIdx]&&this.totals.push(this.totalsData[e.levelIdx]),this.totalsData[e.levelIdx]=this.makeTotalRow(e))),!this.showDetails&&this.showTotals&&e.levelIdx===e.levels.length-2&&(o.each(this.totals.reverse(),function(t){e.data.push(t)},this),this.totals=[],e.data.push(this.makeGroupRow(e))),e.label=e.label.concat(e.label?", ":"",e.levels[e.levelIdx].group.members[e.child.group.memberIdx]),o.each(e.child.group.children,function(t){this.processChild({child:t,data:e.data,label:e.label,levels:e.levels,levelIdx:e.levelIdx+1,columns:e.columns,totals:e.totals,hyperlink:o.cloneDeep(e.hyperlink)})},this)),e.child.detail&&(e.levels.length&&(o.each(this.totals.reverse(),function(t){e.data.push(t)},this),this.totals=[],e.data.push(this.makeGroupRow(e))),o.each(e.child.detail.data,function(t){e.data.push(this.makeDetailRow(t,e))},this))},n.prototype.parseRows=function(e,t){return e.length&&e[0][0].label===this.lastGroupLabel&&(e=e.slice(1)),o.each(e,function(e){"jr-mDatatable-rowGroup"===e[0].className&&(this.lastGroupLabel=e[0].label)},this),t.params.pageSize[0]>t.dataset.counts&&(e=!this.showDetails&&this.showTotals?e.concat(o.values(this.totalsData).reverse().slice(1)):e.concat(o.values(this.totalsData).reverse())),e},n.prototype.parseLinks=function(e){var t=this.lastRowIndex;return o.each(e,function(e,a){o.each(e,function(e,o){e.hyperlink.id="".concat(t+a,"_",o),e.hyperlink.row.index=t+a},this)},this),this.lastRowIndex+=e.length,e},n.prototype.parseOddEven=function(e){return o.each(e,function(e){"jr-mDatatable-rowGroup"===e[0].className?this.nextRowClassName="jr-mDatatable-rowOdd":e[0].hyperlink.linkType===n.linkTypes.DATA&&(e.oddEvenClassName=this.nextRowClassName,this.nextRowClassName="jr-mDatatable-rowOdd"===this.nextRowClassName?"jr-mDatatable-rowEven":"jr-mDatatable-rowOdd")},this),e},n.totalDataEqualsZero=function(e){var t=!1;return o.each(e,function(e){l.isNumeric(e)&&0!==parseFloat(e)&&(t=!0)}),!t},a.exports=n});