/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var t=e("underscore");n.exports={generateUniqueName:function(e){return e+(new Date).getTime()+"_"+String.fromCharCode.apply(null,t.times(4,t.partial(t.random,97,122)))}}});