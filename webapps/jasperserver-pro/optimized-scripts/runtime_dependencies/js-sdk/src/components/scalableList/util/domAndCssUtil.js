/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery"],function(e,s,l){var a=e("underscore"),o=e("jquery");l.exports={doCalcOnVisibleNodeClone:function(e){if(!e||!e.el)throw"Missing required option: el";if(a.defaults(e,{css:{},classes:"",container:"<div></div>",appendTo:"body",callback:function(){throw"no callback was defined"},alwaysClone:!1,cloneHandlers:!1}),a.defaults(e.css,{position:"absolute",left:"-9999px"}),!e.alwaysClone&&o(e.el).is(":visible"))e.callback(o(e.el));else{var s=o(e.el).clone(),l=o(e.container).css(e.css).addClass(e.classes).appendTo(o(e.appendTo)).append(s);e.callback(s),l.remove()}}}});