/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var u=e("underscore"),n=function(e){this._request=e.request};u.extend(n.prototype,{request:function(){return this._request.apply(null,arguments)}}),t.exports=n});