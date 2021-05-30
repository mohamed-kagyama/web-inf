/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/mimeTypesEnum"],function(e,t,r){var i=e("underscore"),u=e("../enum/mimeTypesEnum"),n=function(e){this.initialize(e)};i.extend(n.prototype,{initialize:function(e){this.request=e.request,this.url=e.url},create:function(e){var t=e.accept||u.GENERIC_JSON;return e=i.defaults({type:"POST",headers:{Accept:t},processData:!1,dataType:"json",url:this.url},i.omit(e,["accept"])),this.request(e)}}),r.exports=n});