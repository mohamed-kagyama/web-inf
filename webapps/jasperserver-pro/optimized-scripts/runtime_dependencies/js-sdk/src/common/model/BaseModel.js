/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../enum/httpStatusCodes","../enum/errorCodes"],function(r,e,t){var o=r("underscore"),n=r("backbone"),s=r("../enum/httpStatusCodes"),a=r("../enum/errorCodes"),u=n.Model.extend({initialize:function(){this.on("error",u.unifyServerErrors)},serialize:function(){return o.clone(this.attributes)}},{unifyServerErrors:function(r,e){var t=s[e.status],o=u.createServerError(e);r.trigger("error:"+t,r,o,e),r.trigger("error:all",r,o,e)},createServerError:function(r){var e;try{e=JSON.parse(r.responseText)}catch(r){e={message:"Can't parse server response",errorCode:a.UNEXPECTED_ERROR,parameters:[]}}return e}});t.exports=u});