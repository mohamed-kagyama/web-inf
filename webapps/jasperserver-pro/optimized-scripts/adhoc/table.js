/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","jquery","underscore","runtime_dependencies/jrs-ui/src/util/utils.common","runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator","jquery-ui/ui/position"],function(e,t,a){function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},i.apply(this,arguments)}var o=e("prototype"),n=o.$,s=o.$$,l=e("jquery"),r=e("underscore"),d=e("runtime_dependencies/jrs-ui/src/util/utils.common"),u=d.isWebKitEngine,h=d.isSupportsTouch,c=d.removeWhitespacesFromTable,m=d.isIE9,f=d.isIE7,w=e("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");e("jquery-ui/ui/position");var p={render_mode:"table",state:{},FETCH_MORE_ROWS:"fetchMoreRows",ALMOST_IN_VIEW_OFFSET:100,MINIMUM_COL_WIDTH:0,DEFAULT_GROUP_LABEL_OVERLAY_LEN:200,digitRegex:/\d+/,columnHeaderRow:null,theRows:null,theCols:null,lastRow:null,existingRowCount:null,hoverColumn:-1,reset:function(){this.groupOverlays=[],this.columnResizers={},this.columnOverlays={},this.summaryOverlays={},this.groupLabelOverlays=[],this.draggingColumnSizer=!1,this.draggingColumnOverlay=!1,this.draggingGroupOverlay=!1,this.fetchingRows=!1,this.draggingMoveOverColumnIndex=-1,this.draggingMoveOverGroupIndex=-1},setMode:function(e){this.mode=e},getMode:function(){return this.mode},init:function(){this.Rendering.infinitiveHorizontalScroll=r.bind(r.throttle(this.Rendering.infinitiveHorizontalScroll,250),this.Rendering)},initAll:function(){window.adhocDesigner.overlayParent=h()?n("mainTableContainer").down():n("mainTableContainer"),window.adhocDesigner.enableXtabPivot(!1),p.theRows=n("canvasTable").rows,p.existingRowCount=p.theRows.length,p.columnHeaderRow=n("columnHeaderRow"),p.state.endOfFile=!1,p.shouldFetchMoreRows()&&p.fetchMoreRows(),p.initRowDependentDimensions(),p.initOverlays(),p.initKeyEvents(),l("#mainTableContainer > #tableOptions").remove(),l("#tableOptions").appendTo("#mainTableContainer").position({of:l("#mainTableContainer .caption"),at:"left top",my:"left top",offset:"11 10"}).on("mouseover",function(e){l(this).addClass("over").css("z-index",1e5),w.showDropDownMenu(e,this,this.id+p.ACTION_MODEL_CONTEXT_SUFFIX,p.GRID_SELECTOR_MENU_CLASS,window.localContext.state.actionmodel)}),l("#tableOptions").on("mouseleave",function(e){var t=l(e.relatedTarget);l("#tableOptions").removeClass("over"),t.closest("#menu").length||w.hideMenu()}),l("body").on("actionmodel-mouseout",function(){l("#tableOptions").removeClass("over").css("z-index",9)})},Rendering:{me:!1,fullDataSet:!1,data:{containerLeftOffset:0,amountOfDisplayedCols:0,isFirstRender:0,forceShowNCols:!1},init:function(){this.data.isFirstRender=!0,this.data.containerLeftOffset=window.adhocDesigner.ui.canvas.scrollLeft()+window.adhocDesigner.ui.canvas.width()-1,this.data.amountOfDisplayedCols>0&&(this.data.forceShowNCols=this.data.amountOfDisplayedCols),this.data.amountOfDisplayedCols=0},infinitiveHorizontalScroll:function(){var e=window.adhocDesigner.ui.canvas.scrollLeft()+window.adhocDesigner.ui.canvas.width();if(this.data.containerLeftOffset!=e){var t=window.adhocDesigner.ui.canvas.find("table tr:first"),a=t.find("th:last");if(0!==a.length){for(var i,o=a.position().left,n=o-e,s=0;n<800&&(this.partialRender(),(i=t.find("th:last").position().left-e)!=n)&&!(s++>10);){n=i;break}this.data.containerLeftOffset=e}}},addMoreDataToFullState:function(e){var t,a,i=this;for(a=e.table.flattenedData,t=0;t<a.length;t++)this.fullDataSet.table.flattenedData.push(a[t]);r.each(["endOfFile","hitMaxRows","inDesignView","isShowingFullData"],function(t){i.fullDataSet[t]=e[t]})},getPartialDataFromFullState:function(e,t,a){a=a||0;var i,o,n=t+a,s={columns:[],table:{hasColumns:e.table.hasColumns,hasSummaryRow:e.table.hasSummaryRow,showTableTotals:e.table.showTableTotals,showTableDetails:e.table.showTableDetails,columns:[],columnHeaderRow:{members:[]},summaryRow:{members:[]},flattenedData:[]}};for(o=e.columns,i=t;i<n&&i<o.length;i++)s.columns.push(o[i]);for(o=e.table.columns,i=t;i<n&&i<o.length;i++)s.table.columns.push(o[i]);for(o=e.table.columnHeaderRow.members,i=t;i<n&&i<o.length;i++)s.table.columnHeaderRow.members.push(o[i]);if(e.table.summaryRow)for(o=e.table.summaryRow.members,i=t;i<n&&i<o.length;i++)s.table.summaryRow.members.push(o[i]);return r.each(e.table.flattenedData,function(e,t){var a={id:e.id,isRow:e.isRow,isFooter:e.isFooter,isGroupMember:e.isGroupMember,rowClass:e.rowClass,formattedValue:e.formattedValue,members:[]};e.groupSummaryRow&&(a.groupSummaryRow={members:[]}),e.group&&(a.group={mask:e.group&&e.group.mask||void 0,numericType:e.group&&e.group.numericType||void 0,defaultDisplayName:e.group&&e.group.defaultDisplayName||void 0,currentDisplayName:e.group&&e.group.currentDisplayName||void 0,name:e.group&&e.group.name||void 0}),s.table.flattenedData.push(a)}),r.each(e.table.flattenedData,function(e,a){for(e=e.members,i=t;i<n&&i<e.length;i++)s.table.flattenedData[a].members.push(e[i])}),r.each(e.table.flattenedData,function(e,a){if(e.groupSummaryRow)for(e=e.groupSummaryRow.members,i=t;i<n&&i<e.length;i++)s.table.flattenedData[a].groupSummaryRow.members.push(e[i])}),s},partialRender:function(){var e=100;this.data.forceShowNCols&&(e=this.data.forceShowNCols,this.data.forceShowNCols=!1);var t=this.getPartialDataFromFullState(this.fullDataSet,this.data.amountOfDisplayedCols,e),a={columns:this.fullDataSet.columns,groups:this.fullDataSet.groups,partial:t,hasNoData:this.fullDataSet.hasNoData,endOfFile:this.fullDataSet.endOfFile,title:this.fullDataSet.title,titleBarShowing:this.fullDataSet.titleBarShowing},o=this.me.tableTemplate(i({},a,{isWebKitEngine:u,isIE7:f}));m()&&(o=c(o));var n=!(0===a.partial.columns.length&&0===a.groups.length);if(this.data.isFirstRender)return window.adhocDesigner.ui.canvas.html(o),this.data.isFirstRender=!1,this.data.amountOfDisplayedCols=e,n;var s=l(o),d=window.adhocDesigner.ui.canvas.find("table tr"),h=s.find("tr"),w=0;return r.each(d,function(e,t){if(h[t])for(var a=0,i=h[t].childNodes.length;a<i;a++){var o=h[t].childNodes[0];o.parentNode.removeChild(o),o.hasAttribute&&o.hasAttribute("colspan")||"#text"!=o.nodeName.toLowerCase()&&(d[t].appendChild(o),0===t&&w++)}}),this.data.amountOfDisplayedCols+=w,n},addMoreRows:function(e){window.adhocDesigner.registerTemplate(this.me,"tableRowsTemplate","tableRowsTemplate"),this.addMoreDataToFullState(e);var t=this.getPartialDataFromFullState(e,0,this.data.amountOfDisplayedCols),a={columns:this.fullDataSet.columns,groups:this.fullDataSet.groups,partial:t,hasNoData:this.fullDataSet.hasNoData,endOfFile:this.fullDataSet.endOfFile,title:this.fullDataSet.title,titleBarShowing:this.fullDataSet.titleBarShowing},i=this.me.tableRowsTemplate(a).replace(/^\s*((<!--[^>]*-->\s*)*)<tbody id="tableDetails" class="copyTo">/g,"$1").replace(/<\/tbody>[\s]*/g,"");m()&&(i=c(i)),l("#canvasTable > tbody.copyTo").append(i),this.me.initNewRows()}},render:function(){this.Rendering.me=this,this.Rendering.init(),this.Rendering.fullDataSet=this.state;var e=this.Rendering.partialRender();this.Rendering.infinitiveHorizontalScroll();var t=l("#titleCaption").children().eq(0),a=t.width(),i=l("#titleCaption").width();i>a&&t.width(i);var o=this.state.unresolvedReferences&&this.state.unresolvedReferences.length>0;window.adhocDesigner.setNothingToDisplayVisibility(!e||this.state.isShowingNoData||o),window.adhocDesigner.ui.canvas.off("scroll",this.Rendering.infinitiveHorizontalScroll).bind("scroll",this.Rendering.infinitiveHorizontalScroll);var n=l("#nothingToDisplayMessage span.message-text");if(this.state.isShowingNoData||o){var s=o?window.adhocDesigner.getMissingFieldsCanvasMessage(this.state):window.adhocDesigner.getMessage("noDataMode");n.html(s),this.hideDataTable()}else n.html(this.nothingToDisplayMessage),this.showDataTable();return e||this.hideDataTable(),e},hideDataTable:function(){l("#columnHeaderRow").hide(),l("#canvasTable").css("border","none")},showDataTable:function(){l("#columnHeaderRow").show(),l("#canvasTable").css("border-width","1px"),l("#canvasTable").css("border-style","solid")}};p._getTableHeaders=function(){return s("tr#columnHeaderRow.labels.column th.label")},p.canSaveReport=function(){return!window.localContext.state.hasOwnProperty("canSave")||window.localContext.state.canSave},p.deselectAllSelectedOverlays=function(){p.deselectAllTableColumns(),p.deselectAllSummaryCells(),p.deselectAllColumnGroupRows()},p.removeFromSelectObjects=function(e){var t;window.selObjects.each(function(a){a.index==e&&(t=a)}),window.selObjects=window.selObjects.without(t)},a.exports=p});