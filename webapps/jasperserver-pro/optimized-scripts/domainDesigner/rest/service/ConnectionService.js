/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/endpointsEnum","../enum/mimeTypesEnum"],function(e,n,t){var i=e("underscore"),u=e("../enum/endpointsEnum"),r=e("../enum/mimeTypesEnum"),s=function(e){this.initialize(e)};i.extend(s.prototype,{initialize:function(e){e=e||{},this.request=e.request},testConnection:function(e){return this.request({type:"POST",headers:{Accept:r.RESOURCE_LOOKUP},processData:!1,contentType:r.RESOURCE_LOOKUP,dataType:"json",data:JSON.stringify({uri:e}),url:u.CONTEXTS_SERVICE})}}),t.exports=s});