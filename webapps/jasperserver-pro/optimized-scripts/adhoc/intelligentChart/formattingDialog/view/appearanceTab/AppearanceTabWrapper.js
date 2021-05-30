/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react","react-dom","runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter/palette/defaultPalette","runtime_dependencies/js-sdk/src/common/component/colorPicker/react/enum/colors","runtime_dependencies/js-sdk/src/common/component/colorPicker/util/colorConvertUtil","./AppearanceTab"],function(e,o,t){function a(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function s(e,o){for(var t=0;t<o.length;t++){var a=o[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function n(e,o,t){return o&&s(e.prototype,o),t&&s(e,t),e}function r(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}var i=e("react"),u=e("react-dom"),l=e("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter/palette/defaultPalette"),g=e("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/enum/colors"),h=e("runtime_dependencies/js-sdk/src/common/component/colorPicker/util/colorConvertUtil"),c=e("./AppearanceTab"),C=c.AppearanceTab,d=function(e){return e===g.TRANSPARENT?"rgba(0,0,0,0)":e},p=function(e){return h.isRgbTransparent(e)?g.TRANSPARENT:e},S=function(){function e(o,t){a(this,e),r(this,"element",void 0),r(this,"state",void 0),r(this,"AppearanceTab",void 0),this.element=o,this.state={seriesColors:[].concat(t.seriesColors),showDataPoints:t.showDataPoints,showScatterLine:t.showScatterLine,chartBackgroundColor:t.chartBackgroundColor,onChartBackgroundColorChange:this.onChartBackgroundColorChange.bind(this),plotBackgroundColor:p(t.plotBackgroundColor),onPlotBackgroundColorChange:this.onPlotBackgroundColorChange.bind(this),onSeriesColorAdd:this.onSeriesColorAdd.bind(this),onSeriesColorDelete:this.onSeriesColorDelete.bind(this),onSeriesColorChange:this.onSeriesColorChange.bind(this),onShowScatterLineChange:this.onShowScatterLineChange.bind(this),onShowDataPointsChange:this.onShowDataPointsChange.bind(this),gaugesLayout:t.gaugesLayout,gaugesLayoutOptions:t.gaugesLayoutOptions,onGaugesLayoutChange:this.onGaugesLayoutChange.bind(this),gaugesMinValue:t.gaugesMinValue,onGaugesMinValueChange:this.onGaugesMinValueChange.bind(this),gaugesMaxValue:t.gaugesMaxValue,onGaugesMaxValueChange:this.onGaugesMaxValueChange.bind(this),gaugesDecimalPlaces:t.gaugesDecimalPlaces,onGaugesDecimalPlacesChange:this.onGaugesDecimalPlacesChange.bind(this),gaugesSuffixLabel:t.gaugesSuffixLabel,onGaugesSuffixLabelChange:this.onGaugesSuffixLabelChange.bind(this),gaugeStopColor1Value:t.gaugeStopColor1Value,gaugeStopColor2Value:t.gaugeStopColor2Value,gaugeStopColor3Value:t.gaugeStopColor3Value,gaugeStopColor4Value:t.gaugeStopColor4Value,gaugeStopColor1Color:t.gaugeStopColor1Color,gaugeStopColor2Color:t.gaugeStopColor2Color,gaugeStopColor3Color:t.gaugeStopColor3Color,gaugeStopColor4Color:t.gaugeStopColor4Color,onGaugeStopColorValueChange:this.onGaugeStopColorValueChange.bind(this),onGaugeStopColorColorChange:this.onGaugeStopColorColorChange.bind(this)},this.AppearanceTab=t.AppearanceTab||C,this.renderTab(this.state)}return n(e,[{key:"onShowScatterLineChange",value:function(){this.state.showScatterLine=!this.state.showScatterLine}},{key:"onShowDataPointsChange",value:function(){this.state.showDataPoints=!this.state.showDataPoints}},{key:"onGaugesLayoutChange",value:function(e){this.state.gaugesLayout=e.target.value,this.renderTab(this.state)}},{key:"onGaugesMinValueChange",value:function(e){this.state.gaugesMinValue=e.target.value,this.renderTab(this.state)}},{key:"onGaugesMaxValueChange",value:function(e){this.state.gaugesMaxValue=e.target.value,this.renderTab(this.state)}},{key:"onGaugesDecimalPlacesChange",value:function(e){this.state.gaugesDecimalPlaces=e.target.value,this.renderTab(this.state)}},{key:"onGaugesSuffixLabelChange",value:function(e){this.state.gaugesSuffixLabel=e.target.value,this.renderTab(this.state)}},{key:"onGaugeStopColorValueChange",value:function(e,o){this.state["gaugeStopColor".concat(e,"Value")]=o.target.value,this.renderTab(this.state)}},{key:"onGaugeStopColorColorChange",value:function(e,o){this.state["gaugeStopColor".concat(e,"Color")]=o.hex,this.renderTab(this.state)}},{key:"onSeriesColorAdd",value:function(){var e=this.state.seriesColors.length;this.state.seriesColors.push(l.colors[e%l.colors.length]),this.renderTab(this.state)}},{key:"onSeriesColorDelete",value:function(e){this.state.seriesColors=this.state.seriesColors.filter(function(o,t){return t!==e}),this.renderTab(this.state)}},{key:"onChartBackgroundColorChange",value:function(e){this.state.chartBackgroundColor=e.hex,this.renderTab(this.state)}},{key:"onPlotBackgroundColorChange",value:function(e){this.state.plotBackgroundColor=e.hex,this.renderTab(this.state)}},{key:"onSeriesColorChange",value:function(e,o){this.state.seriesColors[o]=e.hex,this.renderTab(this.state)}},{key:"renderTab",value:function(e){u.render(i.createElement(this.AppearanceTab,e),this.element)}},{key:"getState",value:function(){return{seriesColors:this.state.seriesColors,showScatterLine:this.state.showScatterLine,showDataPoints:this.state.showDataPoints,chartBackgroundColor:this.state.chartBackgroundColor,plotBackgroundColor:d(this.state.plotBackgroundColor),gaugesLayout:this.state.gaugesLayout,gaugesMinValue:this.state.gaugesMinValue,gaugesMaxValue:this.state.gaugesMaxValue,gaugesDecimalPlaces:this.state.gaugesDecimalPlaces,gaugesSuffixLabel:this.state.gaugesSuffixLabel,gaugeStopColor1Value:this.state.gaugeStopColor1Value,gaugeStopColor2Value:this.state.gaugeStopColor2Value,gaugeStopColor3Value:this.state.gaugeStopColor3Value,gaugeStopColor4Value:this.state.gaugeStopColor4Value,gaugeStopColor1Color:this.state.gaugeStopColor1Color,gaugeStopColor2Color:this.state.gaugeStopColor2Color,gaugeStopColor3Color:this.state.gaugeStopColor3Color,gaugeStopColor4Color:this.state.gaugeStopColor4Color}}},{key:"remove",value:function(){u.unmountComponentAtNode(this.element)}}]),e}();t.exports=S});