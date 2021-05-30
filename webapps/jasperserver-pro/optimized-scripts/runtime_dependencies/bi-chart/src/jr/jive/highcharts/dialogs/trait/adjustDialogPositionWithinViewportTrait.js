/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","runtime_dependencies/js-sdk/src/common/component/dialog/Dialog"],function(o,i,n){var t=o("jquery"),e=o("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");n.exports={extension:{_adjustPositionWithinViewport:function(o){return{top:o.top+this._getWindowScrollTop(),left:o.left}},_position:function(){var o=e.prototype._position.apply(this,arguments);return this._adjustPositionWithinViewport(o)},_getWindowScrollTop:function(){return t(window).scrollTop()}}}});