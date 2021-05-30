/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/component/colorPicker/react/AttachableColorPickerWrapper","runtime_dependencies/js-sdk/src/common/component/colorPicker/react/enum/colors"],function(e,r,o){function n(){return{attachableColorPickerWrapper:{remove:function(){},setColor:function(e){}},init:function(e,r,o){var n=!!e.data("showTransparentInput"),t=e.data("model-attr");this.attachableColorPickerWrapper=new c(e[0],{padding:{top:0,left:0},color:a(r),showTransparentPreset:n,onChangeComplete:function(e){o[t](i(e))}})},set:function(e,r){var o=a(r);r?e.removeClass("unchanged"):e.addClass("unchanged"),e.find("div.colorpick").css("background-color",o),this.attachableColorPickerWrapper.setColor(o)},clean:function(){this.attachableColorPickerWrapper.remove()}}}var c=e("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/AttachableColorPickerWrapper"),t=e("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/enum/colors"),a=function(e){return e?e===t.TRANSPARENT?e:"#".concat(e):t.TRANSPARENT},i=function(e){var r=e.hex;return r===t.TRANSPARENT?t.TRANSPARENT:r.slice(1)};o.exports=n});