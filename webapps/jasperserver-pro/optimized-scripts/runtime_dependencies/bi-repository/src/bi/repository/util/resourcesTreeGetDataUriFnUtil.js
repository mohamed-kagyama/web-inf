/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var o=e("underscore");t.exports=function(e){return function(r){var t="";if(t+=e.contextPath+"/rest_v2/api/resources?",e.getFolderUri){var n=e.getFolderUri(r.id);n&&(t+="folderUri="+encodeURIComponent(n))}else t+="folderUri="+encodeURIComponent(r.id);return e.recursive?t+="&recursive=true":t+="&recursive=false",e.type&&(t+=e.type.reduce(function(e,r){return e+="&type="+r},"")),e.containerType&&(t+="&containerType="+e.containerType),e.exclude&&(t+="&excludeFolder="+e.exclude),t+="&offset={{= offset }}&limit={{= limit }}",e.forceTotalCount&&(t+="&forceTotalCount=true"),e.forceFullPage&&(t+="&forceFullPage=true"),o.template(t,r)}}});