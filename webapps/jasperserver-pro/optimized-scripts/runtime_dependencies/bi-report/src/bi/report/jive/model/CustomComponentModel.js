/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseComponentModel","../enum/jiveTypes","underscore"],function(e,t,r){var n=e("./BaseComponentModel"),s=e("../enum/jiveTypes"),i=e("underscore"),a=i.template("{{=uri}}?noext");r.exports=n.extend({defaults:function(){return{id:null,type:s.CUSTOM_VISUALIZATION_COMPONENT,script:null,css:null}},parse:function(e,t){return e=i.defaults(e,{server:t.parent.contextPath,report:t.parent.get("reportURI")}),e.script={name:e.renderer,href:a({uri:e.instanceData.script_uri})},e.instanceData.css_uri&&(e.css={name:e.id+"_css",href:a({uri:e.instanceData.css_uri})}),e},constructor:function(e,t){if(e||(e={}),!e.instanceData.script_uri)throw new Error("Can't initialize without script name");n.prototype.constructor.apply(this,arguments)}})});