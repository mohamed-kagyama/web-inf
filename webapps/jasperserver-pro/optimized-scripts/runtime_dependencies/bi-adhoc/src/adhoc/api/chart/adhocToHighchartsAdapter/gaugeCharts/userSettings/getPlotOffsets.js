/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/util/fontUtils"],function(e,t,n){var r=e("underscore"),i=e("runtime_dependencies/js-sdk/src/common/util/fontUtils"),o=function(e){var t={top:0,left:0,right:0,bottom:0},n=e.advancedProperties||{};if(r.isArray(n)){var o=!1,u=!1,a=r.find(n,function(e){return"title.text"===e.name});if(a&&a.value){var s=18,f=r.find(n,function(e){return"title.style.fontSize"===e.name});if(f){var d=parseInt(f.value);d&&(s=d)}var l=i.getFontHeight(s);t.top+=l,o=!0}var c=r.find(n,function(e){return"subtitle.text"===e.name});if(c&&c.value){var v=11,m=r.find(n,function(e){return"subtitle.style.fontSize"===e.name});if(m){var p=parseInt(m.value);p&&(v=p)}var g=i.getFontHeight(v);t.top+=g,u=!0}(o||u)&&(t.top+=10)}return t};n.exports=o});