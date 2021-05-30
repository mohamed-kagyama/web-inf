/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","highcharts","./utilities","./getUserSettings","../palette/defaultPalette","runtime_dependencies/js-sdk/src/common/util/fontUtils"],function(e,t,r){function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach(function(t){a(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=e("underscore"),s=e("highcharts"),l=e("./utilities"),c=e("./getUserSettings"),u=e("../palette/defaultPalette"),h=e("runtime_dependencies/js-sdk/src/common/util/fontUtils"),m=function(e){var t=e.amountOfMeasures,r=e.chartAreaSize,n=e.containerWidth,i=e.containerHeight,a=Math.min(n,i),o=.9*r.byHorizontal,s=r.byVertical/12*2;s+=r.byHorizontal*(1-.9);var l=s/2,c=a/2-o/2,u=100*o/a,h=2e3/a,m=15;m*=o/a;var f=(u-h)/t;f=Math.min(m,f);for(var g={circleDiameter:o,heightAvailableForFields:s,maxOuterDiameterForChart:u,verticalCenterOffset:l,fieldVerticalOffset:c,diameterDecrementStep:f,measures:[{outer:u,inner:u-f}]},d=1;d<t;d++)g.measures.push({outer:g.measures[d-1].inner,inner:g.measures[d-1].inner-f});return g.minimalInnerDiameterSize=g.measures[g.measures.length-1].inner,g.minimalInnerDiameterSize=g.minimalInnerDiameterSize*a/100,g},f=function(e){var t=e.sizes,r=e.chartsData,n=e.extraOptions,i=e.chartUserSettings,a=Math.floor(t.circleDiameter),s=Math.floor(.8*t.minimalInnerDiameterSize),c=Math.floor(.3*t.minimalInnerDiameterSize),u=Math.floor(.8*t.minimalInnerDiameterSize),h=Math.floor(.15*t.minimalInnerDiameterSize),m=[],f=[];o.each(r,function(e){var t="";o.each(e.fieldsName,function(e){e.length>t.length&&(t=e)}),f.push(e.fieldsName.length);var r="",n="";o.each(e.measures,function(e){e.name.length>n.length&&(n=e.name),e.valueAsString.length>r.length&&(r=e.valueAsString)}),m.push({field:t,value:r+i.valueSuffix,measure:n})});var g=Math.max.apply(Math,f),d=Math.floor(t.heightAvailableForFields/g);return l.calculateFontData({texts:m,extraOptions:n,autoScaleStrategy:"minimalFontForAll",fonts:{fieldFontSize:16,valueFontSize:20,measureFontSize:16,minimalFontSize:2},constrains:{field:{width:a,height:d},value:{width:s,height:c},measure:{width:u,height:h}}})},g=function(e){var t=e.sizes,r=e.chartsData,n=e.fontData,a=e.chartPositions,c=e.extraOptions,m=e.chartUserSettings,f=this.getGeneralOptions(c),g=c.chartState.seriesColors||[],d=i({},f,{chart:i({},f.chart,{margin:[0,0,0,0],spacing:[0,0,0,0]}),plotOptions:{solidgauge:{dataLabels:{enabled:!1},linecap:"round",rounded:!0,stickyTracking:!1}},tooltip:{borderWidth:0,backgroundColor:"none",padding:0,shadow:!1,style:{fontSize:12,"font-weight":"bold","text-anchor":"middle"},pointFormat:"",formatter:function(){var e=this.point._jrs_valueAsString,t=this.series.name,r=this.point._jrs_paneIndex,i=n[r||0];return'<span style="font-size:'.concat(i.measure.fontSize,"px;color:'").concat(i.measure.color,"'\">").concat(t,'</span><br><span style="font-size:').concat(i.value.fontSize,"px;color:'").concat(i.value.color,"';font-weight:'bold'\">").concat(e).concat(m.valueSuffix,"</span>")},positioner:function(e,t,r){var i=r.plotX,a=r.plotY,o=r.point._jrs_valueAsString,s=r.point._jrs_measureName,l=r.point._jrs_paneIndex,c=n[l||0],u={fontSize:c.value.fontSize,fontWeight:"bold",lineHeight:"normal",sizeUnits:"px"},m=h.getTextRect(o,u),f={fontSize:c.measure.fontSize,fontWeight:"bold",lineHeight:"normal",sizeUnits:"px"},g=h.getTextRect(s,f);return{x:i-(Math.max(m.width,g.width)-e)/2,y:a-(12+h.getFontBaseline(c.measure.fontSize)/2)}}},pane:[],yAxis:[],series:[],resizeThreshold:20}),p=0;return o.each(r,function(e){var r=a[p].xCenterInPercent,i=a[p].yCenterInPercent,c=n[p],f={startAngle:0,endAngle:360,center:[r+"%",i+"%"],size:"100%",background:[]},S=t.fieldVerticalOffset+h.getFontBaseline(c.field.fontSize);S-=h.getFontHeight(c.field.fontSize)*e.fieldsName.length,S=Math.round(S);var v={pane:p,min:m.minValue,max:m.maxValue,minorTickLength:0,minorTickInterval:0,minorTickWidth:0,lineWidth:0,tickPositions:[m.minValue,m.maxValue],labels:{enabled:!1},tickLength:0,tickWidth:0,tickPixelInterval:0,title:{useHTML:!1,align:"high",textAlign:"center",y:S,text:e.fieldsName.join("<br>"),style:{color:c.field.color,"text-align":"center","font-size":c.field.fontSize+"px"}}};o.each(e.measures,function(e,r){var n=l.getColorFromArray(r,u.colors),i=g[r]?"#f2f2f2":s.Color(n).setOpacity(.3).get(),a=g[r]||n;f.background.push({backgroundColor:i,borderWidth:0,outerRadius:t.measures[r].outer+"%",innerRadius:t.measures[r].inner+"%"}),d.series.push({name:e.name,yAxis:p,data:[{_jrs_paneIndex:p,_jrs_measureName:e.name,_jrs_valueAsString:e.valueAsString,color:a,radius:t.measures[r].outer+"%",innerRadius:t.measures[r].inner+"%",y:e.value}],columnsOutputParams:e.outputParameters})}),d.pane.push(f),d.yAxis.push(v),p++}),d},d=function(e,t,r,n,i){var a=i.metadata.measures.length,s=i.width,u=i.height,h=c(i),d=l.groupDataByCharts.call(this,e,t,n,i,h),p=o.keys(d).length,S=l.getChartAreaSize({aspectRation:10/12,amountOfCharts:p,containerWidth:s,containerHeight:u,chartUserSettings:h}),v=m({amountOfMeasures:a,chartAreaSize:S,containerWidth:s,containerHeight:u}),z=f({sizes:v,chartAreaSize:S,chartsData:d,extraOptions:i,chartUserSettings:h}),b=l.getMultiLevelGaugeChartPositions({sizes:v,amountOfCharts:p,chartAreaSize:S,containerWidth:s,containerHeight:u,chartUserSettings:h});return g.call(this,{sizes:v,chartsData:d,fontData:z,chartAreaSize:S,chartPositions:b,extraOptions:i,chartUserSettings:h})};r.exports=d});