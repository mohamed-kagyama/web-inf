/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../dispatcher/enum/applicationStateEventsEnum","backbone"],function(t,e,i){var n=t("underscore"),a=t("../../../dispatcher/enum/applicationStateEventsEnum"),r=t("backbone"),o=function(t){this._initialize(t)};n.extend(o.prototype,{_initialize:function(t){n.bindAll(this,"intercept"),this.viewStateModelService=t.viewStateModelService,this.draftStateEventBus=t.draftStateEventBus,this.applicationDispatcherEventBus=t.applicationDispatcherEventBus,this._initEvents()},_initEvents:function(){this.listenTo(this.draftStateEventBus,"allowActionExecution",this._onActionExecutionAllowed)},intercept:function(t){var e=this._bindActionWithParams(t.invocation,t.args),i={actionName:t.actionName,blackList:t.blackList,whiteList:t.whiteList};if(this._shouldInterceptAction(i)){var a=n.extend({},i,{invokeAction:e});this._interceptAction(a)}else e()},_hasDraftState:function(t){var e=n.reduce(t,function(t,e,i){return e&&!n.isEmpty(e)&&(t[i]=!0),t},{});return!n.isEmpty(e)&&e},_shouldInterceptAction:function(t){var e=t.actionName,i=t.blackList,a=t.whiteList,r=this.viewStateModelService.getDraftState(),o=this._hasDraftState(r);if(!o)return!1;if(a){var c=a[e];return!!c&&!n.isEmpty(n.pick(o,c))}if(i){var s=i[e];return!s||!n.isEmpty(n.omit(o,s))}return n.isEmpty(o)},_bindActionWithParams:function(t,e){return function(){return t.apply(null,e)}},_getDraftStateTypesForActionInterceptionBasedOnBlackList:function(t,e){var i=e[t],a=this.viewStateModelService.getDraftState();return n.chain(a).omit(a,i).keys().value()},_getDraftStateTypesForActionInterceptionBasedOnWhiteList:function(t,e){var i=e[t],a=this.viewStateModelService.getDraftState();return n.chain(a).pick(a,i).keys().value()},_getDraftStateTypesForActionInterception:function(){var t=this.viewStateModelService.getDraftState();return n.keys(t)},_interceptAction:function(t){var e,i=t.invokeAction,n=t.actionName,a=t.blackList,r=t.whiteList;e=r?this._getDraftStateTypesForActionInterceptionBasedOnWhiteList(n,r):a?this._getDraftStateTypesForActionInterceptionBasedOnBlackList(n,a):this._getDraftStateTypesForActionInterception(),this.draftStateEventBus.trigger("dispatcherActionIntercepted",{invokeAction:i,draftStateTypes:e})},_onActionExecutionAllowed:function(t){this.applicationDispatcherEventBus.trigger(a.CLEAR_DRAFT_STATE,t.draftStateTypes),t.invokeAction()}}),n.extend(o.prototype,r.Events),i.exports=o});