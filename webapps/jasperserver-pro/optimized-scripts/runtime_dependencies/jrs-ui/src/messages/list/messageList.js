/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","../../components/components.toolbarButtons.events","../../core/core.layout","../../util/utils.common","../../components/list.base","../../core/core.ajax","../../core/core.ajax.utils"],function(e,t,s){var i=e("prototype"),n=i.$,o=e("../../components/components.toolbarButtons.events"),l=e("../../core/core.layout"),r=e("../../util/utils.common"),a=r.matchAny,c=e("../../components/list.base"),u=c.dynamicList,d=e("../../core/core.ajax"),m=d.ajaxTargettedUpdate,_=d.AjaxRequester,h=e("../../core/core.ajax.utils"),f=h.baseErrorHandler,g={_list:null,_messageListId:"messageList",_flowExecutionKey:null,_systemConfirmMessages:[],toolbar:{_buttons:null,_id:"toolbar",initialize:function(){o.initialize({}),this._buttons=document.body.select(l.TOOLBAR_CAPSULE_PATTERN),this._initEventHandlers()},refresh:function(){this._buttons.each(function(e){o.setButtonState(e,g.hasSelectedMessages())}.bind(this))},_initEventHandlers:function(){n(this._id).observe("click",function(e){var t=a(e.element(),[l.BUTTON_PATTERN],!0),s=t.identify();g.doAction(s,Object.toQueryString({selectedIds:g.getSelectedIds()}))}.bindAsEventListener(this))}},filter:{_id:"messageFilter",initialize:function(){this._initEventHandlers()},_initEventHandlers:function(){n(this._id).observe("change",function(e){e.element();g.doAction("changeEventsType",Object.toQueryString({messageFilter:n(this._id).getValue()}))}.bindAsEventListener(this))}},initialize:function(e){this._flowExecutionKey=e.flowExecutionKey,this._systemConfirmMessages=e.systemConfirmMessages,this._list=new u.List(this._messageListId,{listTemplateDomId:"list_fourColumn_type_message",itemTemplateDomId:"list_fourColumn_type_message:unread",multiSelect:!0});var t=this._list.selectItem;this._list.selectItem=function(e){e.getValue().isHeader||t.apply(this,arguments)},this._initListEvents(),this.toolbar.initialize(),this.filter.initialize(),this.doAction("getMessages","")},_getMessageItems:function(e){var t=function(e){var t=e.select(".subject a")[0];t.update(this.getValue().subject),t.writeAttribute("href","flow.html?_flowExecutionKey="+g._flowExecutionKey+"&_eventId=viewMessage&id="+this.getValue().id);var s=e.select(".date")[0];return s.update(this.getValue().date),s.writeAttribute("title",this.getValue().timestamp),e.select(".type")[0].update(this.getValue().type),e.select(".component")[0].update(this.getValue().component),e};return e.unshift({isHeader:!0}),e.collect(function(e){var s;s=e.isHeader?"list_fourColumn_type_message:header":e.isRead?"list_fourColumn_type_message:read":"list_fourColumn_type_message:unread";var i=new u.ListItem({cssClassName:l.LEAF_CLASS,value:e,templateDomId:s});return e.isHeader?i.processTemplate=function(e){return e}:i.processTemplate=t,i}.bind(this))},_initListEvents:function(){this._list.observe("item:selected",function(e){this.refreshToolbar()}.bindAsEventListener(this)),this._list.observe("item:unselected",function(e){this.refreshToolbar()}.bindAsEventListener(this))},refreshToolbar:function(){g.toolbar.refresh()},hasSelectedMessages:function(){return this._list.getSelectedItems().length>0},getSelectedIds:function(){return this._list.getSelectedItems().collect(function(e){return e.getValue().id})},doAction:function(e,t){var s="flow.html?_flowExecutionKey="+g._flowExecutionKey+"&_eventId="+e;this._list.setItems([]),this.refreshToolbar(),m(s,{postData:t,callback:function(e){"OK"==e.status?(this._list.setItems(this._getMessageItems(e.data)),this._list.show()):alert(e.data.message)}.bind(this),errorHandler:this._serverErrorHandler,mode:_.prototype.EVAL_JSON})},_serverErrorHandler:function(e){e.getResponseHeader("LoginRequested")&&(document.location="flow.html?_flowId=logEventFlow"),f(e)||500!=e.status||(document.location="flow.html?_flowId=logEventFlow&_eventId=error",document.location="flow.html?_flowId=logEventFlow&_eventId=error")}};void 0===e&&document.observe("dom:loaded",function(){g.initialize(window.localContext.initOptions)}),s.exports=g});