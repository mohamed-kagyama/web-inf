/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,d,t){var n=e("underscore"),o=document.createElement("div");n.extend(o.style,{width:"1em",visibility:"hidden"}),document.body.appendChild(o);var r=o.offsetWidth;document.body.removeChild(o),t.exports={convertEmToPx:function(e){return r*e}}});