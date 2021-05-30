/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/util/classUtil","jquery","requestSettings","runtime_dependencies/jrs-ui/src/components/components.dialogs","runtime_dependencies/js-sdk/src/jrs.configs","text!runtime_dependencies/js-sdk/src/common/templates/dialogErrorPopupTemplate.htm","../loading/loadingDialog"],function(e,t,s){var n=e("underscore"),r=e("runtime_dependencies/js-sdk/src/common/util/classUtil"),i=e("jquery"),a=e("requestSettings"),o=e("runtime_dependencies/jrs-ui/src/components/components.dialogs"),l=e("runtime_dependencies/js-sdk/src/jrs.configs"),c=e("text!runtime_dependencies/js-sdk/src/common/templates/dialogErrorPopupTemplate.htm"),d=e("../loading/loadingDialog"),u=r.extend({constructor:function(e){this.clientKey=e.clientKey},createRestUrl:function(e){return"rest_v2/metadata/_temp/"+this.clientKey+e},_request:function(e,t,s){t=void 0===t||t,s=s||u.defaultCallbacks;var r=i.ajax(n.defaults(e,a)).done(s.done||u.defaultCallbacks.done).fail(s.fail||u.defaultCallbacks.fail).always(s.always||u.defaultCallbacks.always);return t&&d(r,{el:i("#loading"),showDimmer:!1,delay:u.SLOW_REQUEST_TIMEOUT}),r},fetchFieldsList:function(){return this._request({url:this.createRestUrl("/fields"),type:"GET",dataType:"json"})},fetchFunctionsList:function(){return this._request({url:this.createRestUrl("/functions"),type:"GET",dataType:"json"})},validate:function(e){return this._request({url:this.createRestUrl("/action/validate"),type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify(e)})},get:function(e){return this._request({url:this.createRestUrl("/fields/"+e),type:"GET",dataType:"json"})},add:function(e){return this._request({url:this.createRestUrl("/fields"),type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify(e)})},update:function(e,t){return this._request({url:this.createRestUrl("/fields/"+t),type:"PUT",dataType:"json",contentType:"application/json",data:JSON.stringify(e)})},remove:function(e){return this._request({url:this.createRestUrl("/fields/"+e),type:"DELETE",contentType:"application/json"})}});u.defaultCallbacks={fail:function(e,t,s){if(401==e.status||e.getResponseHeader("LoginRequested"))document.location=l.urlContext;else if(e.getResponseHeader("adhocException"))o.errorPopup.show(e.getResponseHeader("adhocException"));else if(500==e.status||e.getResponseHeader("JasperServerError")&&!e.getResponseHeader("SuppressError")){var r=JSON.parse(e.responseText),i=n.template(c,{message:s,respText:r.message+": "+r.parameters[0]});o.errorPopup.show(i)}},always:function(){o.popup.hide(i("#loading")[0])}},u.SLOW_REQUEST_TIMEOUT=2e3,window.CalculatedFieldsService=u,s.exports=u});