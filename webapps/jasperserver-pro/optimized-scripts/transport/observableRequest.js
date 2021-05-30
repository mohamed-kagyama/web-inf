/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","request"],function(e,r,u){function t(){n.trigger.apply(n,arguments)}var n,o=e("underscore"),a=e("jquery"),i=e("request");"undefined"!=typeof document&&(n=a(document)),u.exports=function(){return o.partial(t,"request:before").apply(null,arguments),i.apply(i,arguments).done(o.partial(t,"request:success")).fail(o.partial(t,"request:failure"))}});