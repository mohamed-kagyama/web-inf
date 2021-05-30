/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,a){var t=e("underscore");a.exports={validate:function(e,r,a){if(r.params)for(var n=e.dataSet.query.parameters,s=t.keys(r.params),o=0;o<s.length;o++)if(!Object.hasOwnProperty.call(n.attributes,s[o]))return{message:"Unknown parameter: "+s[o],errorCode:"parameter.unknown",parameters:[s[o],t.keys(n.attributes)]}}}});