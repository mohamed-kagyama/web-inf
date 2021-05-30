/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}(function(e){return e.fn.extend({disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}})});