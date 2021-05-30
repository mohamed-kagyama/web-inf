/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,a){var s=e("underscore");a.exports={validate:function(e,r,a){if(r.params)for(var t=e.dataSet.query.parameters,n=s.keys(r.params),u=0;u<n.length;u++)if(t._singular[n[u]]&&!r.params[n[u]].length)return{message:"The parameter "+n[u]+" must have value.",errorCode:"parameter.value.missing",parameters:[n[u]]}}}});