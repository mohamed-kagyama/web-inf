/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../util/cache/SimpleCache","../../../model/util/profileAttributeUtil"],function(e,t,r){var i=e("underscore"),o=e("../../../util/cache/SimpleCache"),u=e("../../../model/util/profileAttributeUtil"),c=function(e){o.call(this,arguments)};i.extend(c.prototype,o.prototype,{get:function(e){var t=u.extractProfileAttributeArgs(e),r=t[0],i=t[1],o=[r];return i&&(i=i.toLowerCase(),o.push(i)),e=u.createProfileAttributeFunctionWithArgs(o),this.cache[e]}}),r.exports=c});