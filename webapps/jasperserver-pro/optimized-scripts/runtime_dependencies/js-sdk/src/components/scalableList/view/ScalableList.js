/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","backbone","underscore","../model/ScalableListModel","text!../templates/viewPortChunksTemplate.htm","text!../templates/itemsTemplate.htm"],function(t,e,i){var h=t("jquery"),s=t("backbone"),n=t("underscore"),r=t("../model/ScalableListModel"),l=t("text!../templates/viewPortChunksTemplate.htm"),o=t("text!../templates/itemsTemplate.htm"),a=s.View.extend({ListModel:r,listItemSelector:"li",events:{scroll:"onScroll",touchmove:"onScroll"},attributes:{style:"overflow-y: auto; height: 100px; min-height: 100px;"},initialize:function(t){return n.bindAll(this,"_fetchVisibleData"),this.model=t.model||new this.ListModel(t),this.chunksTemplate=n.template(t.chunksTemplate||l),this.itemsTemplate=n.template(t.itemsTemplate||o),this.defaultChunkHeight=this.chunkHeight=t.chunkHeight||1e6,this.scrollTimeout=void 0!==t.scrollTimeout?t.scrollTimeout:50,this.manualScrollInterval=t.manualScrollInterval||50,this.lazy=t.lazy,this.defaultItemHeight=t.listItemHeight||21,this.listItemSelector=t.listItemSelector||this.listItemSelector,this.render(),this.initListeners(),this.lazy||this.model.fetch(),this},initListeners:function(){this.listenTo(this.model,"change",this.onModelChange,this),this.listenTo(this.model,"fetchFailed",this.onFetchFailed,this)},render:function(){return this},onScroll:function(t){this.scrollTimeout>0?(clearTimeout(this.scrollTimer),this.scrollTimer=setTimeout(this._fetchVisibleData,this.scrollTimeout)):this._fetchVisibleData()},onModelChange:function(){this.renderData()},onFetchFailed:function(t,e){this.trigger("listRenderError",t,e)},postProcessChunkModelItem:function(t,e){t.index=this.model.get("bufferStartIndex")+e,void 0===t.label&&(t.label=t.value),t.label=h.trim(t.label)},_renderItems:function(){var t=this.model.get("bufferStartIndex"),e=this.model.get("bufferEndIndex"),i=this.itemsPerChunk?Math.ceil((t+1)/this.itemsPerChunk):1,s=this.itemsPerChunk?Math.ceil((e+1)/this.itemsPerChunk):1,n=this;this.$el.find(".jr-jViewPortChunk").each(function(r,l){var o=h(l),a=n._getChunkModel({index:r+1,firstChunkWithData:i,lastChunkWithData:s,bufferStart:t,bufferEnd:e,total:n.totalItems,itemsPerChunk:n.itemsPerChunk,itemHeight:n.itemHeight,chunkHeight:n.chunkHeight,model:n.model}),u=a?n.itemsTemplate(a):"",m=l.children[0];m&&l.removeChild(m),o.append(u)})},_renderViewChunks:function(t){var e,i=this;(this.totalItems!==this.model.get("total")||t)&&(this.totalItems=this.model.get("total"),e=Array.prototype.slice.call(this.$el[0].children),e.forEach(function(t){i.$el[0].removeChild(t)}),this.$el.append(this.chunksTemplate({_:n,chunks:this._getViewChunksModel()})),this.$firstViewChunk=this.$el.find(".jr-jViewPortChunk:first"))},_getViewChunksModel:function(){for(var t=this.itemsPerChunk?Math.ceil(this.totalItems/this.itemsPerChunk):1,e=t>0?this.itemHeight?this.totalItems*this.itemHeight-(t-1)*this.chunkHeight:this.chunkHeight:1,i=[],h=1;h<t;h++)i.push({height:this.chunkHeight});return i.push({height:e}),i},_calcViewPortConstants:function(){this.viewPortConstantsInitialized||(this.itemHeight=this.defaultItemHeight,this.$firstViewChunk&&(this.itemHeight=this.$el.find(this.listItemSelector+":first").outerHeight(!0),!this.itemHeight||this.itemHeight<=2?(this.itemHeight=this.defaultItemHeight,this.viewPortConstantsInitialized=!1):this.viewPortConstantsInitialized=!0),this._calcViewPortHeight(),this.itemsPerChunk=Math.floor(this.defaultChunkHeight/this.itemHeight),this.chunkHeight=this.itemsPerChunk*this.itemHeight,this._renderViewChunks(!0),this._renderItems())},resizeViewPort:function(t){this.viewPortHeight=t,this.$el.outerHeight(this.viewPortHeight),this.itemsPerView=Math.floor(this.viewPortHeight/this.itemHeight)-1,this.itemsPerChunk=Math.floor(this.defaultChunkHeight/this.itemHeight),this.chunkHeight=this.itemsPerChunk*this.itemHeight,this._renderViewChunks(!0),this._renderItems()},_calcViewPortHeight:function(){this.viewPortHeight=this.$el.height(),this.itemsPerView=Math.floor(this.viewPortHeight/this.itemHeight)-1},_getItemsPerView:function(){return this._calcViewPortConstants(),this.itemsPerView},_getChunkModel:function(t){var e=t.index;if(e<t.firstChunkWithData||e>t.lastChunkWithData)return null;var i=t.itemsPerChunk?Math.max(t.bufferStart,t.itemsPerChunk*(e-1)):t.bufferStart,h=t.itemsPerChunk?Math.min(t.bufferEnd,t.itemsPerChunk*e-1):t.bufferEnd,s=t.itemHeight?i*t.itemHeight-(e-1)*t.chunkHeight:0,r=Array.prototype.slice.call(t.model.get("items"),i-t.bufferStart,h-t.bufferStart+1);return n.each(r,function(e,h){this.postProcessChunkModelItem(e,h+(i-t.bufferStart))},this),{top:s,items:r}},_fetchVisibleData:function(){var t=this._getVisibleItems();this.model.fetch({top:t.top,bottom:t.bottom})},_getVisibleItems:function(){var t=this._getScrollPos(),e=this.model.get("total"),i=Math.min(e-this.itemsPerView,Math.floor(t/this.itemHeight));return{top:i,bottom:Math.min(e-1,i+this.itemsPerView+1)}},_getScrollPos:function(){this._calcViewPortConstants();var t=0;if(this.$firstViewChunk){var e=this.$el.offset(),i=this.$firstViewChunk.offset();e&&i&&(t=e.top-i.top)}return t},renderData:function(){return!this.lazy&&this.model.has("bufferStartIndex")&&this.model.has("bufferEndIndex")?(this.trigger("before:render:data"),this._renderViewChunks(),this._renderItems(),this._calcViewPortConstants(),this.trigger("render:data")):(this.lazy=null,this.model.fetch()),this},resize:function(){if(this.$el.is(":visible")){var t=this.$el.outerHeight();t!==this._componentHeight&&(this._componentHeight=t,this.viewPortConstantsInitialized=!1,this._calcViewPortConstants())}},fetch:function(t,e){this.lazy=!1,e=e||{};var i;e.keepPosition?i=this.$el.get(0).scrollTop:this.reset({silent:!0,lazy:!1}),this.model.once("change",function(){e.keepPosition&&this.$el.scrollTop(i),t&&t.apply(this,arguments)},this).fetch({force:!0})},reset:function(t){t=n.defaults(t||{},{lazy:!0}),this.$el.scrollTop(0),this.lazy=t.lazy,this.model.reset(t)},scrollTo:function(t){if("number"==typeof t){var e=this._getScrollPos();if(this.viewPortConstantsInitialized){this._calcViewPortHeight();var i=null,h=t*this.itemHeight;h<e?i=h:h+this.itemHeight>e+this.viewPortHeight&&(i=h+this.itemHeight-this.viewPortHeight),null!==i&&this.$el.scrollTop(i)}}}});i.exports=a});