/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("fade","toggle",function(n,i){var t="show"===n.mode;e(this).css("opacity",t?0:1).animate({opacity:t?1:0},{queue:!1,duration:n.duration,easing:n.easing,complete:i})})});