/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("drop","hide",function(t,i){var n,o=e(this),f=t.mode,c="show"===f,d=t.direction||"left",u="up"===d||"down"===d?"top":"left",r="up"===d||"left"===d?"-=":"+=",a="+="===r?"-=":"+=",s={opacity:0};e.effects.createPlaceholder(o),n=t.distance||o["top"===u?"outerHeight":"outerWidth"](!0)/2,s[u]=r+n,c&&(o.css(s),s[u]=a+n,s.opacity=1),o.animate(s,{queue:!1,duration:t.duration,easing:t.easing,complete:i})})});