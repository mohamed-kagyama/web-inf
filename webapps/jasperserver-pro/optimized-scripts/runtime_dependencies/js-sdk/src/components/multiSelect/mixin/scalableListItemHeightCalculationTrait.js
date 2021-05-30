/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","../../scalableList/model/ScalableListModel","../../../common/util/browserDetection","../../scalableList/util/domAndCssUtil"],function(i,t,e){var s=i("jquery"),l=i("../../scalableList/model/ScalableListModel"),h=i("../../../common/util/browserDetection"),a=i("../../scalableList/util/domAndCssUtil"),o=a.doCalcOnVisibleNodeClone,n={render:function(){return this._itemHeightSet||(this._calcItemHeight(),this._itemHeightSet=!0),this},_calcItemHeight:function(){var i=this;this._model=this.model,this._lazy=this.lazy,this._visibility=this.$el.css("visibility"),this._display=this.$el.css("display"),this.model=new l({getData:function(){var i=new s.Deferred;return i.resolve({total:1,data:[{value:"test value",label:"test label"}]}),i}}),this.$el.css({visibility:"hidden",display:"block"}),this.model.once("change",this.onModelChange,this),this.renderData(),o({el:this.$el,css:{width:"100px"},classes:" jr "+(h.isIPad()?"ipad":""),callback:function(t){i.itemHeight=t.find("li").outerHeight(!0),i.itemsPerChunk=Math.floor(i.defaultChunkHeight/i.itemHeight),i.chunkHeight=i.itemsPerChunk*i.itemHeight}}),this.$el.empty().css({visibility:this._visibility,display:this._display}),delete this._visibility,delete this._display,this.totalItems=void 0,this.$firstViewChunk=void 0,this.model=this._model,delete this._model,this.lazy=this._lazy,this._lazy&&delete this._lazy},_calcViewPortConstants:function(){if(!this.viewPortConstantsInitialized){if(!this._itemHeightSet)return;this._calcViewPortHeight(),this._renderViewChunks(!0),this._renderItems(),this.viewPortConstantsInitialized=!0}}};e.exports=n});