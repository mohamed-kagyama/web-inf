/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(t,e,a){var n=t("underscore"),r=function(t){n.bindAll(this,"getData"),this._getData=t&&t.getData};n.extend(r.prototype,{getData:function(t){return this._getData(t)},setGetData:function(t){this._getData=t}}),a.exports=r});