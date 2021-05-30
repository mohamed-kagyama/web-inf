/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","backbone","underscore","../../singleSelect/dataprovider/SearcheableDataProvider","../../../common/util/parse/NumberUtils","../../scalableList/util/domAndCssUtil","../../../common/util/browserDetection","bundle!ScalableInputControlsBundle","../../../common/util/xssUtil","../view/AvailableItemsList","../view/SelectedItemsList","text!../templates/multiSelectTemplate.htm","../dataprovider/SelectedItemsDataProvider","../../sizer/Sizer"],function(e,t,i){var s=e("jquery"),l=e("backbone"),a=e("underscore"),n=(e("../../singleSelect/dataprovider/SearcheableDataProvider"),e("../../../common/util/parse/NumberUtils")),r=e("../../scalableList/util/domAndCssUtil"),o=e("../../../common/util/browserDetection"),h=e("bundle!ScalableInputControlsBundle"),c=e("../../../common/util/xssUtil"),d=e("../view/AvailableItemsList"),m=e("../view/SelectedItemsList"),u=e("text!../templates/multiSelectTemplate.htm"),g=e("../dataprovider/SelectedItemsDataProvider"),v=e("../../sizer/Sizer"),b=r.doCalcOnVisibleNodeClone,I=new n;i.exports=l.View.extend({className:"jr-mMultiselect jr",events:function(){return{"click  .jr-mMultiselect-toggle":"toggleLists"}},initialize:function(e){this.template=a.template(u),this.i18n={selected:h["sic.multiselect.toggle.selected"],available:h["sic.multiselect.toggle.available"]},this.heightAutoAdjustment=!!a.isUndefined(e.heightAutoAdjustment)||e.heightAutoAdjustment,this.availableItemsListModel=this._createAvailableItemsListModel(e),this.availableItemsList=this._createAvailableItemsList(e),this.selectedItemsDataProvider=this._createSelectedItemsListDataProvider(e),this.selectedItemsList=this._createSelectedItemsList(e),this.height=e.height,this.resizable=e&&e.resizable,this.initListeners(),void 0!==e.value&&(this.silent=!0,this.availableItemsList.setValue(e.value)),e&&e.resizable&&(this.sizer=new v({container:this.$el,stop:a.bind(function(){this.resize()},this)})),this.render()},_createAvailableItemsListModel:function(e){return new l.Model},_createAvailableItemsList:function(e){return e.availableItemsList||new d({model:this.availableItemsListModel,getData:e.getData,bufferSize:e.bufferSize,loadFactor:e.loadFactor,chunksTemplate:e.chunksTemplate,scrollTimeout:e.scrollTimeout})},_createSelectedItemsListDataProvider:function(e){return e.selectedItemsDataProvider||new g(e.selectedListOptions)},_createSelectedItemsList:function(e){return this.formatValue=e.formatValue,new m({getData:this.selectedItemsDataProvider.getData,bufferSize:e.bufferSize,loadFactor:e.loadFactor,chunksTemplate:e.chunksTemplate,scrollTimeout:e.scrollTimeout})},initListeners:function(){this.listenTo(this.availableItemsList,"selection:change",this.selectionChange,this),this.listenTo(this.availableItemsList,"listRenderError",this.listRenderError,this),this.listenTo(this.availableItemsListModel,"change:totalValues",this._availableItemsTotalCountChange,this),this.listenTo(this.selectedItemsList,"selection:remove",this.selectionRemoved,this)},render:function(){return this.sizer&&this.sizer.$el.detach(),this.$el.html(s(this.template({i18n:h}))),this.$toggleContainer=this.$el.find(".jr-mMultiselect-toggleContainer"),this.availableItemsList.undelegateEvents(),this.selectedItemsList.undelegateEvents(),this.selectedItemsList.$el.insertAfter(this.$toggleContainer),this.availableItemsList.$el.insertAfter(this.$toggleContainer),this.availableItemsList.render(),this.selectedItemsList.render(),this._updateAvailableItemsCountLabel(),this._updateSelectedItemsCountLabel(),this.availableItemsList.delegateEvents(),this.selectedItemsList.delegateEvents(),this._tuneCSS(),this._renderSizer(),this},_renderSizer:function(){this.sizer&&(this.heightAutoAdjustment&&this._handleHeight(),this.$el.append(this.sizer.$el))},_tuneCSS:function(){var e=this;this._cssDepententSizesSet||(b({el:this.$el,css:{width:"500px"},classes:"jr",alwaysClone:!0,callback:function(t){e.toggleContainerHeight=t.find(".jr-mMultiselect-toggleContainer").outerHeight(),e._tuneCSSInternal(t),t.find(".jr-mScalablelist").css({height:"0"}),e._emptyContainerHeight=t.outerHeight();var i;i=e.height?e.height:e._calcHeightByItemsCount(10),e.$el.css("height",i)}}),this._cssDepententSizesSet=!0),this._tuneCSSInternal(this.$el)},_tuneCSSInternal:function(e){var t=this.toggleContainerHeight;o.isIPad()&&this.$el.addClass("ipad"),e.find(".jr-mMultiselect-listContainer").css("padding-top",t)},listRenderError:function(e,t){this.trigger("listRenderError",e,t)},toggleLists:function(e){e.stopPropagation(),s(e.currentTarget).hasClass("jr-isActive")||(this.$el.find(".jr-mMultiselect-toggle").toggleClass("jr-isActive jr-isInactive"),this.$el.find(".jr-mMultiselect-listContainer").toggleClass("jr-isActive jr-isInactive"),o.isIPad()||this.$el.find(".jr-mMultiselect-listContainer.jr-isActive input").focus())},selectionChange:function(e){clearTimeout(this.selectionChangeTimeout),this.selectionChangeTimeout=setTimeout(a.bind(this.selectionChangeInternal,this,e),100)},selectionRemoved:function(e){var t,i=this.availableItemsList.model.get("value"),s=e.length;for(t=0;t<s;t+=1)delete i[e[t]];this.availableItemsList.setValue(a.keys(i))},selectionChangeInternal:function(e){var t=this,i=this.selectedItemsList.listView.getActiveValue(),s=this.selectedItemsList.listView.$el.scrollTop();this.selectedItemsDataProvider.setData(e),this.selectedItemsList.fetch(function(){if(t._updateSelectedItemsCountLabel(),t.selectedItemsList.resize(),t.selectedItemsList.listView.$el.scrollTop(s),i&&t.selectedItemsList.$el.hasClass("j-active")){var e=t.selectedItemsList.listView.model.get("total");e&&e>i.index?t.selectedItemsList.listView.activate(i.index):e&&t.selectedItemsList.listView.activate(i.index-1)}}),this.silent?delete this.silent:this.triggerSelectionChange()},_setToggleLabel:function(e,t,i){var s=I.formatNumber(t),l=this.$el.find(e+" .jr-mMultiselect-toggle-label"),a=i+": "+s;l.text(a).attr("title",c.hardEscape(a))},_handleHeight:function(){var e=this.availableItemsList.model.get("totalValues")||0;if(this._cssDepententSizesSet&&e){var t=this.$el.height(),i=this.$el.height(),s=this._calcHeightByItemsCount(3),l=this._calcHeightByItemsCount(e);e<=10?s=l=i=this._calcHeightByItemsCount(Math.max(3,e)):t>l&&(i=this._calcHeightByItemsCount(e)),this.$el.css("height",i+"px"),this._updateSizerVisibility({minHeight:s,maxHeight:l})}},_updateSizerVisibility:function(e){this.sizer&&(this.sizer.updateMinMax(e),e.minHeight===e.maxHeight?this.sizer.hide():this.sizer.show())},_calcHeightByItemsCount:function(e){return e*this.availableItemsList.listView.itemHeight+this._emptyContainerHeight},_availableItemsTotalCountChange:function(){this._updateAvailableItemsCountLabel(),this.heightAutoAdjustment&&this._handleHeight()},_updateAvailableItemsCountLabel:function(){var e=this.availableItemsList.model.get("totalValues")||0;this._setToggleLabel(".jr-mMultiselect-toggleAvailable",e||0,this.i18n.available)},_updateSelectedItemsCountLabel:function(){var e=this.$el.find(".jr-mMultiselect-list-message"),t=this.selectedItemsList.listView.model.get("total")||0;this._setToggleLabel(".jr-mMultiselect-toggleSelected",t,this.i18n.selected),0===t?e.removeClass("jr-isHidden"):e.addClass("jr-isHidden")},triggerSelectionChange:function(){this.trigger("selection:change",this.getValue())},renderData:function(){return this.availableItemsList.renderData(),this.selectedItemsList.renderData(),this},fetch:function(e,t){this.availableItemsList.fetch(e,t)},reset:function(e){this.availableItemsList.reset(e)},resize:function(){a.debounce(a.bind(function(){this.availableItemsList.resize(),this.selectedItemsList.resize()},this),500)()},setValue:function(e,t){t&&t.silent&&(this.silent=!0),delete t.silent,this.availableItemsList.setValue(e,t)},getValue:function(){var e=this.availableItemsList.getValue(),t=[],i=0;for(var s in e)e.hasOwnProperty(s)&&void 0!==e[s]&&(t[i++]=e[s]);return t},setDisabled:function(e){return this.availableItemsList.setDisabled(e),this.selectedItemsList.setDisabled(e),this},getDisabled:function(){return this.availableItemsList.getDisabled()},remove:function(){this.availableItemsList.remove(),this.selectedItemsList.remove(),this.sizer&&this.sizer.remove(),l.View.prototype.remove.call(this)}})});