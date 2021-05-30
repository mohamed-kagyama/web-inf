/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,o,t){var d=e("underscore"),r=function(){var e=document.createElement("div");d.extend(e.style,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-9999px"}),document.body.appendChild(e);var o=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),o}();t.exports=r});