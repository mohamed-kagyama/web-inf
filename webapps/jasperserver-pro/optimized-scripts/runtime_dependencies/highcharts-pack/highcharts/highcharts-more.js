/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(t,i){"object"==typeof module&&module.exports?module.exports=t(require("highcharts")):"function"==typeof define&&define.amd?define(["highcharts"],t):t(i.Highcharts)}(function(t){return function(t){function i(t,i){this.init(t,i)}var a=t.CenteredSeriesMixin,e=t.each,o=t.extend,s=t.merge,n=t.splat;o(i.prototype,{coll:"pane",init:function(t,i){this.chart=i,this.background=[],i.pane.push(this),this.setOptions(t)},setOptions:function(t){this.options=t=s(this.defaultOptions,this.chart.angular?{background:{}}:void 0,t)},render:function(){var t,i,a=this.options,e=this.options.background,o=this.chart.renderer;if(this.group||(this.group=o.g("pane-group").attr({zIndex:a.zIndex||0}).add()),this.updateCenter(),e)for(e=n(e),t=Math.max(e.length,this.background.length||0),i=0;i<t;i++)e[i]&&this.axis?this.renderBackground(s(this.defaultBackgroundOptions,e[i]),i):this.background[i]&&(this.background[i]=this.background[i].destroy(),this.background.splice(i,1))},renderBackground:function(t,i){var a="animate";this.background[i]||(this.background[i]=this.chart.renderer.path().add(this.group),a="attr"),this.background[i][a]({d:this.axis.getPlotBandPath(t.from,t.to,t)}).attr({fill:t.backgroundColor,stroke:t.borderColor,"stroke-width":t.borderWidth,class:"highcharts-pane "+(t.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(t){this.center=(t||this.axis||{}).center=a.getCenter.call(this)},update:function(t,i){s(!0,this.options,t),this.setOptions(this.options),this.render(),e(this.chart.axes,function(t){t.pane===this&&(t.pane=null,t.update({},i))},this)}}),t.Pane=i}(t),function(t){var i,a,e=t.addEvent,o=t.Axis,s=t.each,n=t.extend,r=t.map,l=t.merge,h=t.noop,p=t.pick,c=t.pInt,d=t.Tick,u=t.wrap,g=t.correctFloat,f=o.prototype,m=d.prototype;t.radialAxisExtended||(t.radialAxisExtended=!0,i={getOffset:h,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:h,setCategories:h,setTitle:h},a={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null,style:{textOverflow:"none"}},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(i){var a=this.options=l(this.defaultOptions,this.defaultRadialOptions,i);a.plotBands||(a.plotBands=[]),t.fireEvent(this,"afterSetOptions")},getOffset:function(){f.getOffset.call(this),this.chart.axisOffset[this.side]=0},getLinePath:function(t,i){var a,e,o=this.center,s=this.chart,n=p(i,o[2]/2-this.offset);return this.isCircular||void 0!==i?(e=this.chart.renderer.symbols.arc(this.left+o[0],this.top+o[1],n,n,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}),e.xBounds=[this.left+o[0]],e.yBounds=[this.top+o[1]-n]):(a=this.postTranslate(this.angleRad,n),e=["M",o[0]+s.plotLeft,o[1]+s.plotTop,"L",a.x,a.y]),e},setAxisTranslation:function(){f.setAxisTranslation.call(this),this.center&&(this.isCircular?this.transA=(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.transA=this.center[2]/2/(this.max-this.min||1),this.isXAxis?this.minPixelPadding=this.transA*this.minPointOffset:this.minPixelPadding=0)},beforeSetTickPositions:function(){this.autoConnect=this.isCircular&&void 0===p(this.userMax,this.options.max)&&g(this.endAngleRad-this.startAngleRad)===g(2*Math.PI),this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0)},setAxisSize:function(){f.setAxisSize.call(this),this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*p(this.sector,1)/2)},getPosition:function(t,i){return this.postTranslate(this.isCircular?this.translate(t):this.angleRad,p(this.isCircular?i:this.translate(t),this.center[2]/2)-this.offset)},postTranslate:function(t,i){var a=this.chart,e=this.center;return t=this.startAngleRad+t,{x:a.plotLeft+e[0]+Math.cos(t)*i,y:a.plotTop+e[1]+Math.sin(t)*i}},getPlotBandPath:function(t,i,a){var e,o,s,n,l=this.center,h=this.startAngleRad,d=l[2]/2,u=[p(a.outerRadius,"100%"),a.innerRadius,p(a.thickness,10)],g=Math.min(this.offset,0),f=/%$/,m=this.isCircular;return"polygon"===this.options.gridLineInterpolation?n=this.getPlotLinePath(t).concat(this.getPlotLinePath(i,!0)):(t=Math.max(t,this.min),i=Math.min(i,this.max),m||(u[0]=this.translate(t),u[1]=this.translate(i)),u=r(u,function(t){return f.test(t)&&(t=c(t,10)*d/100),t}),"circle"!==a.shape&&m?(e=h+this.translate(t),o=h+this.translate(i)):(e=-Math.PI/2,o=1.5*Math.PI,s=!0),u[0]-=g,u[2]-=g,n=this.chart.renderer.symbols.arc(this.left+l[0],this.top+l[1],u[0],u[0],{start:Math.min(e,o),end:Math.max(e,o),innerR:p(u[1],u[0]-u[2]),open:s})),n},getPlotLinePath:function(t,i){var a,e,o,n,r=this,l=r.center,h=r.chart,p=r.getPosition(t);return r.isCircular?n=["M",l[0]+h.plotLeft,l[1]+h.plotTop,"L",p.x,p.y]:"circle"===r.options.gridLineInterpolation?(t=r.translate(t))&&(n=r.getLinePath(0,t)):(s(h.xAxis,function(t){t.pane===r.pane&&(a=t)}),n=[],t=r.translate(t),o=a.tickPositions,a.autoConnect&&(o=o.concat([o[0]])),i&&(o=[].concat(o).reverse()),s(o,function(i,o){e=a.getPosition(i,t),n.push(o?"L":"M",e.x,e.y)})),n},getTitlePosition:function(){var t=this.center,i=this.chart,a=this.options.title;return{x:i.plotLeft+t[0]+(a.x||0),y:i.plotTop+t[1]-{high:.5,middle:.25,low:0}[a.align]*t[2]+(a.y||0)}}},e(o,"init",function(t){var e,o=this.chart,s=o.angular,r=o.polar,h=this.isXAxis,p=s&&h,c=o.options,d=t.userOptions.pane||0,u=this.pane=o.pane&&o.pane[d];s?(n(this,p?i:a),(e=!h)&&(this.defaultRadialOptions=this.defaultRadialGaugeOptions)):r&&(n(this,a),e=h,this.defaultRadialOptions=h?this.defaultRadialXOptions:l(this.defaultYAxisOptions,this.defaultRadialYOptions)),s||r?(this.isRadial=!0,o.inverted=!1,c.chart.zoomType=null):this.isRadial=!1,u&&e&&(u.axis=this),this.isCircular=e}),e(o,"afterInit",function(){var t=this.chart,i=this.options,a=t.angular&&this.isXAxis,e=this.pane,o=e&&e.options;!a&&e&&(t.angular||t.polar)&&(this.angleRad=(i.angle||0)*Math.PI/180,this.startAngleRad=(o.startAngle-90)*Math.PI/180,this.endAngleRad=(p(o.endAngle,o.startAngle+360)-90)*Math.PI/180,this.offset=i.offset||0)}),u(f,"autoLabelAlign",function(t){if(!this.isRadial)return t.apply(this,[].slice.call(arguments,1))}),e(d,"afterGetPosition",function(t){this.axis.getPosition&&n(t.pos,this.axis.getPosition(this.pos))}),e(d,"afterGetLabelPosition",function(t){var i,a=this.axis,e=this.label,o=a.options.labels,s=o.y,n=20,r=o.align,l=(a.translate(this.pos)+a.startAngleRad+Math.PI/2)/Math.PI*180%360;a.isRadial&&(i=a.getPosition(this.pos,a.center[2]/2+p(o.distance,-25)),"auto"===o.rotation?e.attr({rotation:l}):null===s&&(s=a.chart.renderer.fontMetrics(e.styles&&e.styles.fontSize).b-e.getBBox().height/2),null===r&&(a.isCircular?(this.label.getBBox().width>a.len*a.tickInterval/(a.max-a.min)&&(n=0),r=l>n&&l<180-n?"left":l>180+n&&l<360-n?"right":"center"):r="center",e.attr({align:r})),t.pos.x=i.x+o.x,t.pos.y=i.y+s)}),u(m,"getMarkPath",function(t,i,a,e,o,s,n){var r,l,h=this.axis;return h.isRadial?(r=h.getPosition(this.pos,h.center[2]/2+e),l=["M",i,a,"L",r.x,r.y]):l=t.call(this,i,a,e,o,s,n),l}))}(t),function(t){var i=t.each,a=t.noop,e=t.pick,o=t.defined,s=t.Series,n=t.seriesType,r=t.seriesTypes,l=s.prototype,h=t.Point.prototype;n("arearange","area",{lineWidth:1,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(t){return[t.low,t.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(t){var i=this.chart,a=this.xAxis.postTranslate(t.rectPlotX,this.yAxis.len-t.plotHigh);t.plotHighX=a.x-i.plotLeft,t.plotHigh=a.y-i.plotTop,t.plotLowX=t.plotX},translate:function(){var t=this,a=t.yAxis,e=!!t.modifyValue;r.area.prototype.translate.apply(t),i(t.points,function(i){var o=i.low,s=i.high,n=i.plotY;null===s||null===o?(i.isNull=!0,i.plotY=null):(i.plotLow=n,i.plotHigh=a.translate(e?t.modifyValue(s,i):s,0,1,0,1),e&&(i.yBottom=i.plotHigh))}),this.chart.polar&&i(this.points,function(i){t.highToXY(i),i.tooltipPos=[(i.plotHighX+i.plotLowX)/2,(i.plotHigh+i.plotLow)/2]})},getGraphPath:function(t){var i,a,o,s,n,l,h,p=[],c=[],d=r.area.prototype.getGraphPath,u=this.options,g=this.chart.polar&&!1!==u.connectEnds,f=u.connectNulls,m=u.step;for(t=t||this.points,i=t.length,i=t.length;i--;)a=t[i],a.isNull||g||f||t[i+1]&&!t[i+1].isNull||c.push({plotX:a.plotX,plotY:a.plotY,doCurve:!1}),o={polarPlotY:a.polarPlotY,rectPlotX:a.rectPlotX,yBottom:a.yBottom,plotX:e(a.plotHighX,a.plotX),plotY:a.plotHigh,isNull:a.isNull},c.push(o),p.push(o),a.isNull||g||f||t[i-1]&&!t[i-1].isNull||c.push({plotX:a.plotX,plotY:a.plotY,doCurve:!1});return n=d.call(this,t),m&&(!0===m&&(m="left"),u.step={left:"right",center:"center",right:"left"}[m]),l=d.call(this,p),h=d.call(this,c),u.step=m,s=[].concat(n,l),this.chart.polar||"M"!==h[0]||(h[0]="L"),this.graphPath=s,this.areaPath=n.concat(h),s.isArea=!0,s.xMap=n.xMap,this.areaPath.xMap=n.xMap,s},drawDataLabels:function(){var t,i,a,e=this.data,o=e.length,s=[],n=this.options.dataLabels,r=n.align,h=n.verticalAlign,p=n.inside,c=this.chart.inverted;if(n.enabled||this._hasPointLabels){for(t=o;t--;)(i=e[t])&&(a=p?i.plotHigh<i.plotLow:i.plotHigh>i.plotLow,i.y=i.high,i._plotY=i.plotY,i.plotY=i.plotHigh,s[t]=i.dataLabel,i.dataLabel=i.dataLabelUpper,i.below=a,c?r||(n.align=a?"right":"left"):h||(n.verticalAlign=a?"top":"bottom"),n.x=n.xHigh,n.y=n.yHigh);for(l.drawDataLabels&&l.drawDataLabels.apply(this,arguments),t=o;t--;)(i=e[t])&&(a=p?i.plotHigh<i.plotLow:i.plotHigh>i.plotLow,i.dataLabelUpper=i.dataLabel,i.dataLabel=s[t],i.y=i.low,i.plotY=i._plotY,i.below=!a,c?r||(n.align=a?"left":"right"):h||(n.verticalAlign=a?"bottom":"top"),n.x=n.xLow,n.y=n.yLow);l.drawDataLabels&&l.drawDataLabels.apply(this,arguments)}n.align=r,n.verticalAlign=h},alignDataLabel:function(){r.column.prototype.alignDataLabel.apply(this,arguments)},drawPoints:function(){var i,a,e=this,s=e.points.length;for(l.drawPoints.apply(e,arguments),a=0;a<s;)i=e.points[a],i.origProps={plotY:i.plotY,plotX:i.plotX,isInside:i.isInside,negative:i.negative,zone:i.zone,y:i.y},i.lowerGraphic=i.graphic,i.graphic=i.upperGraphic,i.plotY=i.plotHigh,o(i.plotHighX)&&(i.plotX=i.plotHighX),i.y=i.high,i.negative=i.high<(e.options.threshold||0),i.zone=e.zones.length&&i.getZone(),e.chart.polar||(i.isInside=i.isTopInside=void 0!==i.plotY&&i.plotY>=0&&i.plotY<=e.yAxis.len&&i.plotX>=0&&i.plotX<=e.xAxis.len),a++;for(l.drawPoints.apply(e,arguments),a=0;a<s;)i=e.points[a],i.upperGraphic=i.graphic,i.graphic=i.lowerGraphic,t.extend(i,i.origProps),delete i.origProps,a++},setStackedPoints:a},{setState:function(){var t=this.state,i=this.series,a=i.chart.polar;o(this.plotHigh)||(this.plotHigh=i.yAxis.toPixels(this.high,!0)),o(this.plotLow)||(this.plotLow=this.plotY=i.yAxis.toPixels(this.low,!0)),i.stateMarkerGraphic&&(i.lowerStateMarkerGraphic=i.stateMarkerGraphic,i.stateMarkerGraphic=i.upperStateMarkerGraphic),this.graphic=this.upperGraphic,this.plotY=this.plotHigh,a&&(this.plotX=this.plotHighX),h.setState.apply(this,arguments),this.state=t,this.plotY=this.plotLow,this.graphic=this.lowerGraphic,a&&(this.plotX=this.plotLowX),i.stateMarkerGraphic&&(i.upperStateMarkerGraphic=i.stateMarkerGraphic,i.stateMarkerGraphic=i.lowerStateMarkerGraphic,i.lowerStateMarkerGraphic=void 0),h.setState.apply(this,arguments)},haloPath:function(){var t=this.series.chart.polar,i=[];return this.plotY=this.plotLow,t&&(this.plotX=this.plotLowX),this.isInside&&(i=h.haloPath.apply(this,arguments)),this.plotY=this.plotHigh,t&&(this.plotX=this.plotHighX),this.isTopInside&&(i=i.concat(h.haloPath.apply(this,arguments))),i},destroyElements:function(){return i(["lowerGraphic","upperGraphic"],function(t){this[t]&&(this[t]=this[t].destroy())},this),this.graphic=null,h.destroyElements.apply(this,arguments)}})}(t),function(t){(0,t.seriesType)("areasplinerange","arearange",null,{getPointSpline:t.seriesTypes.spline.prototype.getPointSpline})}(t),function(t){var i=t.defaultPlotOptions,a=t.each,e=t.merge,o=t.noop,s=t.pick,n=t.seriesType,r=t.seriesTypes,l=r.column.prototype,h={pointRange:null,marker:null,states:{hover:{halo:!1}}};n("columnrange","arearange",e(i.column,i.arearange,h),{translate:function(){function t(t){return Math.min(Math.max(-d,t),d)}var i,e,o=this,n=o.yAxis,r=o.xAxis,h=r.startAngleRad,p=o.chart,c=o.xAxis.isRadial,d=Math.max(p.chartWidth,p.chartHeight)+999;l.translate.apply(o),a(o.points,function(a){var l,d,u,g=a.shapeArgs,f=o.options.minPointLength;a.plotHigh=e=t(n.translate(a.high,0,1,0,1)),a.plotLow=t(a.plotY),u=e,d=s(a.rectPlotY,a.plotY)-e,Math.abs(d)<f?(l=f-d,d+=l,u-=l/2):d<0&&(d*=-1,u-=d),c?(i=a.barX+h,a.shapeType="path",a.shapeArgs={d:o.polarArc(u+d,u,i,i+a.pointWidth)}):(g.height=d,g.y=u,a.tooltipPos=p.inverted?[n.len+n.pos-p.plotLeft-u-d/2,r.len+r.pos-p.plotTop-g.x-g.width/2,d]:[r.left-p.plotLeft+g.x+g.width/2,n.pos-p.plotTop+u+d/2,d])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:o,getSymbol:o,crispCol:l.crispCol,drawPoints:l.drawPoints,drawTracker:l.drawTracker,getColumnMetrics:l.getColumnMetrics,pointAttribs:l.pointAttribs,animate:function(){return l.animate.apply(this,arguments)},polarArc:function(){return l.polarArc.apply(this,arguments)},translate3dPoints:function(){return l.translate3dPoints.apply(this,arguments)},translate3dShapes:function(){return l.translate3dShapes.apply(this,arguments)}},{setState:l.pointClass.prototype.setState})}(t),function(t){var i=t.each,a=t.isNumber,e=t.merge,o=t.noop,s=t.pick,n=t.pInt,r=t.Series,l=t.seriesType,h=t.TrackerMixin;l("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:o,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var t=this,o=t.yAxis,r=t.options,l=o.center;t.generatePoints(),i(t.points,function(t){var i=e(r.dial,t.dial),h=n(s(i.radius,80))*l[2]/200,p=n(s(i.baseLength,70))*h/100,c=n(s(i.rearLength,10))*h/100,d=i.baseWidth||3,u=i.topWidth||1,g=r.overshoot,f=o.startAngleRad+o.translate(t.y,null,null,null,!0);a(g)?(g=g/180*Math.PI,f=Math.max(o.startAngleRad-g,Math.min(o.endAngleRad+g,f))):!1===r.wrap&&(f=Math.max(o.startAngleRad,Math.min(o.endAngleRad,f))),f=180*f/Math.PI,t.shapeType="path",t.shapeArgs={d:i.path||["M",-c,-d/2,"L",p,-d/2,h,-u/2,h,u/2,p,d/2,-c,d/2,"z"],translateX:l[0],translateY:l[1],rotation:f},t.plotX=l[0],t.plotY=l[1]})},drawPoints:function(){var t=this,a=t.yAxis.center,o=t.pivot,n=t.options,r=n.pivot,l=t.chart.renderer;i(t.points,function(i){var a=i.graphic,o=i.shapeArgs,s=o.d,r=e(n.dial,i.dial);a?(a.animate(o),o.d=s):(i.graphic=l[i.shapeType](o).attr({rotation:o.rotation,zIndex:1}).addClass("highcharts-dial").add(t.group),i.graphic.attr({stroke:r.borderColor||"none","stroke-width":r.borderWidth||0,fill:r.backgroundColor||"#000000"}))}),o?o.animate({translateX:a[0],translateY:a[1]}):(t.pivot=l.circle(0,0,s(r.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(a[0],a[1]).add(t.group),t.pivot.attr({"stroke-width":r.borderWidth||0,stroke:r.borderColor||"#cccccc",fill:r.backgroundColor||"#000000"}))},animate:function(t){var a=this;t||(i(a.points,function(t){var i=t.graphic;i&&(i.attr({rotation:180*a.yAxis.startAngleRad/Math.PI}),i.animate({rotation:t.shapeArgs.rotation},a.options.animation))}),a.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup),r.prototype.render.call(this),this.group.clip(this.chart.clipRect)},setData:function(t,i){r.prototype.setData.call(this,t,!1),this.processData(),this.generatePoints(),s(i,!0)&&this.chart.redraw()},drawTracker:h&&h.drawTrackerPoint},{setState:function(t){this.state=t}})}(t),function(t){var i=t.each,a=t.noop,e=t.pick,o=t.seriesType,s=t.seriesTypes;o("boxplot","column",{threshold:null,tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(t){return[t.low,t.q1,t.median,t.q3,t.high]},pointValKey:"high",pointAttribs:function(){return{}},drawDataLabels:a,translate:function(){var t=this,a=t.yAxis,e=t.pointArrayMap;s.column.prototype.translate.apply(t),i(t.points,function(t){i(e,function(i){null!==t[i]&&(t[i+"Plot"]=a.translate(t[i],0,1,0,1))})})},drawPoints:function(){var t,a,o,s,n,r,l,h,p,c,d,u=this,g=u.points,f=u.options,m=u.chart,y=m.renderer,x=0,P=!1!==u.doQuartiles,b=u.options.whiskerLength;i(g,function(i){var g=i.graphic,m=g?"animate":"attr",M=i.shapeArgs,v={},A={},w={},k={},L=i.color||u.color;void 0!==i.plotY&&(l=M.width,h=Math.floor(M.x),p=h+l,c=Math.round(l/2),t=Math.floor(P?i.q1Plot:i.lowPlot),a=Math.floor(P?i.q3Plot:i.lowPlot),o=Math.floor(i.highPlot),s=Math.floor(i.lowPlot),g||(i.graphic=g=y.g("point").add(u.group),i.stem=y.path().addClass("highcharts-boxplot-stem").add(g),b&&(i.whiskers=y.path().addClass("highcharts-boxplot-whisker").add(g)),P&&(i.box=y.path(void 0).addClass("highcharts-boxplot-box").add(g)),i.medianShape=y.path(void 0).addClass("highcharts-boxplot-median").add(g)),A.stroke=i.stemColor||f.stemColor||L,A["stroke-width"]=e(i.stemWidth,f.stemWidth,f.lineWidth),A.dashstyle=i.stemDashStyle||f.stemDashStyle,i.stem.attr(A),b&&(w.stroke=i.whiskerColor||f.whiskerColor||L,w["stroke-width"]=e(i.whiskerWidth,f.whiskerWidth,f.lineWidth),i.whiskers.attr(w)),P&&(v.fill=i.fillColor||f.fillColor||L,v.stroke=f.lineColor||L,v["stroke-width"]=f.lineWidth||0,i.box.attr(v)),k.stroke=i.medianColor||f.medianColor||L,k["stroke-width"]=e(i.medianWidth,f.medianWidth,f.lineWidth),i.medianShape.attr(k),r=i.stem.strokeWidth()%2/2,x=h+c+r,i.stem[m]({d:["M",x,a,"L",x,o,"M",x,t,"L",x,s]}),P&&(r=i.box.strokeWidth()%2/2,t=Math.floor(t)+r,a=Math.floor(a)+r,h+=r,p+=r,i.box[m]({d:["M",h,a,"L",h,t,"L",p,t,"L",p,a,"L",h,a,"z"]})),b&&(r=i.whiskers.strokeWidth()%2/2,o+=r,s+=r,d=/%$/.test(b)?c*parseFloat(b)/100:b/2,i.whiskers[m]({d:["M",x-d,o,"L",x+d,o,"M",x-d,s,"L",x+d,s]})),n=Math.round(i.medianPlot),r=i.medianShape.strokeWidth()%2/2,n+=r,i.medianShape[m]({d:["M",h,n,"L",p,n]}))})},setStackedPoints:a})}(t),function(t){var i=t.each,a=t.noop,e=t.seriesType,o=t.seriesTypes;e("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(t){return[t.low,t.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:o.arearange?function(){var t=this.pointValKey;o.arearange.prototype.drawDataLabels.call(this),i(this.data,function(i){i.y=i[t]})}:a,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||o.column.prototype.getColumnMetrics.call(this)}})}(t),function(t){var i=t.correctFloat,a=t.isNumber,e=t.pick,o=t.Point,s=t.Series,n=t.seriesType,r=t.seriesTypes;n("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",showLine:!0,generatePoints:function(){var t,a,e,o,s=this.options.threshold;for(r.column.prototype.generatePoints.apply(this),e=0,a=this.points.length;e<a;e++)t=this.points[e],o=this.processedYData[e],t.isSum?t.y=i(o):t.isIntermediateSum&&(t.y=i(o-s),s=o)},translate:function(){var t,i,a,o,s,n,l,h,p,c,d,u,g,f=this,m=f.options,y=f.yAxis,x=e(m.minPointLength,5),P=x/2,b=m.threshold,M=m.stacking;for(r.column.prototype.translate.apply(f),p=c=b,a=f.points,i=0,t=a.length;i<t;i++)o=a[i],h=f.processedYData[i],s=o.shapeArgs,n=M&&y.stacks[(f.negStacks&&h<b?"-":"")+f.stackKey],u=f.getStackIndicator(u,o.x,f.index),d=e(n&&n[o.x].points[u.key],[0,h]),l=Math.max(p,p+o.y)+d[0],s.y=y.translate(l,0,1,0,1),o.isSum?(s.y=y.translate(d[1],0,1,0,1),s.height=Math.min(y.translate(d[0],0,1,0,1),y.len)-s.y):o.isIntermediateSum?(s.y=y.translate(d[1],0,1,0,1),s.height=Math.min(y.translate(c,0,1,0,1),y.len)-s.y,c=d[1]):(s.height=h>0?y.translate(p,0,1,0,1)-s.y:y.translate(p,0,1,0,1)-y.translate(p-h,0,1,0,1),p+=n&&n[o.x]?n[o.x].total:h),s.height<0&&(s.y+=s.height,s.height*=-1),o.plotY=s.y=Math.round(s.y)-f.borderWidth%2/2,s.height=Math.max(Math.round(s.height),.001),o.yBottom=s.y+s.height,s.height<=x&&!o.isNull?(s.height=x,s.y-=P,o.plotY=s.y,o.y<0?o.minPointLengthOffset=-P:o.minPointLengthOffset=P):o.minPointLengthOffset=0,g=o.plotY+(o.negative?s.height:0),f.chart.inverted?o.tooltipPos[0]=y.len-g:o.tooltipPos[1]=g},processData:function(t){var a,e,o,n,r,l,h,p=this,c=p.options,d=p.yData,u=p.options.data,g=d.length,f=c.threshold||0;for(o=e=n=r=f,h=0;h<g;h++)l=d[h],a=u&&u[h]?u[h]:{},"sum"===l||a.isSum?d[h]=i(o):"intermediateSum"===l||a.isIntermediateSum?d[h]=i(e):(o+=l,e+=l),n=Math.min(o,n),r=Math.max(o,r);s.prototype.processData.call(this,t),p.options.stacking||(p.dataMin=n,p.dataMax=r)},toYData:function(t){return t.isSum?0===t.x?null:"sum":t.isIntermediateSum?0===t.x?null:"intermediateSum":t.y},pointAttribs:function(t,i){var a,e=this.options.upColor;return e&&!t.options.color&&(t.color=t.y>0?e:null),a=r.column.prototype.pointAttribs.call(this,t,i),delete a.dashstyle,a},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var t,i,a,e,o=this.data,s=o.length,n=this.graph.strokeWidth()+this.borderWidth,r=Math.round(n)%2/2,l=this.xAxis.reversed,h=this.yAxis.reversed,p=[];for(a=1;a<s;a++)i=o[a].shapeArgs,t=o[a-1].shapeArgs,e=["M",t.x+(l?0:t.width),t.y+o[a-1].minPointLengthOffset+r,"L",i.x+(l?t.width:0),t.y+o[a-1].minPointLengthOffset+r],(o[a-1].y<0&&!h||o[a-1].y>0&&h)&&(e[2]+=t.height,e[5]+=t.height),p=p.concat(e);return p},drawGraph:function(){s.prototype.drawGraph.call(this),this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){var t,i,a=this,e=a.options;for(s.prototype.setStackedPoints.apply(a,arguments),t=a.stackedYData?a.stackedYData.length:0,i=1;i<t;i++)e.data[i].isSum||e.data[i].isIntermediateSum||(a.stackedYData[i]+=a.stackedYData[i-1])},getExtremes:function(){if(this.options.stacking)return s.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var t=o.prototype.getClassName.call(this);return this.isSum?t+=" highcharts-sum":this.isIntermediateSum&&(t+=" highcharts-intermediate-sum"),t},isValid:function(){return a(this.y,!0)||this.isSum||this.isIntermediateSum}})}(t),function(t){var i=t.LegendSymbolMixin,a=t.noop,e=t.Series,o=t.seriesType,s=t.seriesTypes;o("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var t=e.prototype.getGraphPath.call(this),i=t.length+1;i--;)(i===t.length||"M"===t[i])&&i>0&&t.splice(i,0,"z");return this.areaPath=t,t},drawGraph:function(){this.options.fillColor=this.color,s.area.prototype.drawGraph.call(this)},drawLegendSymbol:i.drawRectangle,drawTracker:e.prototype.drawTracker,setStackedPoints:a})}(t),function(t){var i=t.arrayMax,a=t.arrayMin,e=t.Axis,o=t.color,s=t.each,n=t.isNumber,r=t.noop,l=t.pick,h=t.pInt,p=t.Point,c=t.Series,d=t.seriesType,u=t.seriesTypes;d("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},animationLimit:250,marker:{lineColor:null,lineWidth:1,fillOpacity:.5,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(t,i){var a=this.options.marker,e=a.fillOpacity,s=c.prototype.pointAttribs.call(this,t,i);return 1!==e&&(s.fill=o(s.fill).setOpacity(e).get("rgba")),s},getRadii:function(t,i,a,e){var o,s,r,l,h,p=this.zData,c=[],d=this.options,u="width"!==d.sizeBy,g=d.zThreshold,f=i-t;for(s=0,o=p.length;s<o;s++)l=p[s],d.sizeByAbsoluteValue&&null!==l&&(l=Math.abs(l-g),i=f=Math.max(i-g,Math.abs(t-g)),t=0),n(l)?l<t?h=a/2-1:(r=f>0?(l-t)/f:.5,u&&r>=0&&(r=Math.sqrt(r)),h=Math.ceil(a+r*(e-a))/2):h=null,c.push(h);this.radii=c},animate:function(t){!t&&this.points.length<this.options.animationLimit&&(s(this.points,function(t){var i,a=t.graphic;a&&a.width&&(i={x:a.x,y:a.y,width:a.width,height:a.height},a.attr({x:t.plotX,y:t.plotY,width:1,height:1}),a.animate(i,this.options.animation))},this),this.animate=null)},translate:function(){var i,a,e,o=this.data,s=this.radii;for(u.scatter.prototype.translate.call(this),i=o.length;i--;)a=o[i],e=s?s[i]:0,n(e)&&e>=this.minPxSize/2?(a.marker=t.extend(a.marker,{radius:e,width:2*e,height:2*e}),a.dlBox={x:a.plotX-e,y:a.plotY-e,width:2*e,height:2*e}):a.shapeArgs=a.plotY=a.dlBox=void 0},alignDataLabel:u.column.prototype.alignDataLabel,buildKDTree:r,applyZones:r},{haloPath:function(t){return p.prototype.haloPath.call(this,0===t?0:(this.marker?this.marker.radius||0:0)+t)},ttBelow:!1}),e.prototype.beforePadding=function(){var e=this,o=this.len,r=this.chart,p=0,c=o,d=this.isXAxis,u=d?"xData":"yData",g=this.min,f={},m=Math.min(r.plotWidth,r.plotHeight),y=Number.MAX_VALUE,x=-Number.MAX_VALUE,P=this.max-g,b=o/P,M=[];s(this.series,function(o){var n,p=o.options;!o.bubblePadding||!o.visible&&r.options.chart.ignoreHiddenSeries||(e.allowZoomOutside=!0,M.push(o),d&&(s(["minSize","maxSize"],function(t){var i=p[t],a=/%$/.test(i);i=h(i),f[t]=a?m*i/100:i}),o.minPxSize=f.minSize,o.maxPxSize=Math.max(f.maxSize,f.minSize),n=t.grep(o.zData,t.isNumber),n.length&&(y=l(p.zMin,Math.min(y,Math.max(a(n),!1===p.displayNegative?p.zThreshold:-Number.MAX_VALUE))),x=l(p.zMax,Math.max(x,i(n))))))}),s(M,function(t){var i,a=t[u],o=a.length;if(d&&t.getRadii(y,x,t.minPxSize,t.maxPxSize),P>0)for(;o--;)n(a[o])&&e.dataMin<=a[o]&&a[o]<=e.dataMax&&(i=t.radii[o],p=Math.min((a[o]-g)*b-i,p),c=Math.max((a[o]-g)*b+i,c))}),M.length&&P>0&&!this.isLog&&(c-=o,b*=(o+p-c)/o,s([["min","userMin",p],["max","userMax",c]],function(t){void 0===l(e.options[t[0]],e[t[1]])&&(e[t[0]]+=t[2]/b)}))}}(t),function(t){var i,a=t.each,e=t.pick,o=t.Pointer,s=t.Series,n=t.seriesTypes,r=t.wrap,l=s.prototype,h=o.prototype;if(!t.polarExtended){t.polarExtended=!0,l.searchPointByAngle=function(t){var i=this,a=i.chart,e=i.xAxis,o=e.pane.center,s=t.chartX-o[0]-a.plotLeft,n=t.chartY-o[1]-a.plotTop;return this.searchKDTree({clientX:180+Math.atan2(s,n)*(-180/Math.PI)})},l.getConnectors=function(t,i,a,e){var o,s,n,r,l,h,p,c,d,u,g,f,m,y,x,P,b,M,v,A,w,k=e?1:0;return o=i>=0&&i<=t.length-1?i:i<0?t.length-1+i:0,s=o-1<0?t.length-(1+k):o-1,n=o+1>t.length-1?k:o+1,r=t[s],l=t[n],h=r.plotX,p=r.plotY,c=l.plotX,d=l.plotY,u=t[o].plotX,g=t[o].plotY,m=(1.5*u+h)/2.5,y=(1.5*g+p)/2.5,x=(1.5*u+c)/2.5,P=(1.5*g+d)/2.5,b=Math.sqrt(Math.pow(m-u,2)+Math.pow(y-g,2)),M=Math.sqrt(Math.pow(x-u,2)+Math.pow(P-g,2)),v=Math.atan2(y-g,m-u),A=Math.atan2(P-g,x-u),w=Math.PI/2+(v+A)/2,Math.abs(v-w)>Math.PI/2&&(w-=Math.PI),m=u+Math.cos(w)*b,y=g+Math.sin(w)*b,x=u+Math.cos(Math.PI+w)*M,P=g+Math.sin(Math.PI+w)*M,f={rightContX:x,rightContY:P,leftContX:m,leftContY:y,plotX:u,plotY:g},a&&(f.prevPointCont=this.getConnectors(t,s,!1,e)),f},r(l,"buildKDTree",function(t){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy"),t.apply(this)}),l.toXY=function(t){var i,a,e=this.chart,o=t.plotX,s=t.plotY;t.rectPlotX=o,t.rectPlotY=s,i=this.xAxis.postTranslate(t.plotX,this.yAxis.len-s),t.plotX=t.polarPlotX=i.x-e.plotLeft,t.plotY=t.polarPlotY=i.y-e.plotTop,this.kdByAngle?(a=(o/Math.PI*180+this.xAxis.pane.options.startAngle)%360,a<0&&(a+=360),t.clientX=a):t.clientX=t.plotX},n.spline&&(r(n.spline.prototype,"getPointSpline",function(t,i,a,e){var o,s;return this.chart.polar?e?(s=this.getConnectors(i,e,!0,this.connectEnds),o=["C",s.prevPointCont.rightContX,s.prevPointCont.rightContY,s.leftContX,s.leftContY,s.plotX,s.plotY]):o=["M",a.plotX,a.plotY]:o=t.call(this,i,a,e),o}),n.areasplinerange&&(n.areasplinerange.prototype.getPointSpline=n.spline.prototype.getPointSpline)),t.addEvent(s,"afterTranslate",function(){var i,a,e=this.chart;if(e.polar){if(this.kdByAngle=e.tooltip&&e.tooltip.shared,!this.preventPostTranslate)for(i=this.points,a=i.length;a--;)this.toXY(i[a]);this.hasClipCircleSetter||(this.hasClipCircleSetter=Boolean(t.addEvent(this,"afterRender",function(){var i;e.polar&&(i=this.yAxis.center,this.group.clip(e.renderer.clipCircle(i[0],i[1],i[2]/2)),this.setClip=t.noop)})))}},{order:2}),r(l,"getGraphPath",function(t,i){var e,o,s,n=this;if(this.chart.polar){for(i=i||this.points,e=0;e<i.length;e++)if(!i[e].isNull){o=e;break}!1!==this.options.connectEnds&&void 0!==o&&(this.connectEnds=!0,i.splice(i.length,0,i[o]),s=!0),a(i,function(t){void 0===t.polarPlotY&&n.toXY(t)})}var r=t.apply(this,[].slice.call(arguments,1));return s&&i.pop(),r});var p=function(t,i){var a,e=this.chart,o=this.options.animation,s=this.group,n=this.markerGroup,r=this.xAxis.center,l=e.plotLeft,h=e.plotTop;e.polar?e.renderer.isSVG&&(!0===o&&(o={}),i?(a={translateX:r[0]+l,translateY:r[1]+h,scaleX:.001,scaleY:.001},s.attr(a),n&&n.attr(a)):(a={translateX:l,translateY:h,scaleX:1,scaleY:1},s.animate(a,o),n&&n.animate(a,o),this.animate=null)):t.call(this,i)};r(l,"animate",p),n.column&&(i=n.column.prototype,i.polarArc=function(t,i,a,o){var s=this.xAxis.center,n=this.yAxis.len;return this.chart.renderer.symbols.arc(s[0],s[1],n-i,null,{start:a,end:o,innerR:n-e(t,n)})},r(i,"animate",p),r(i,"translate",function(t){var i,a,e,o,s=this.xAxis,n=s.startAngleRad;if(this.preventPostTranslate=!0,t.call(this),s.isRadial)for(a=this.points,o=a.length;o--;)e=a[o],i=e.barX+n,e.shapeType="path",e.shapeArgs={d:this.polarArc(e.yBottom,e.plotY,i,i+e.pointWidth)},this.toXY(e),e.tooltipPos=[e.plotX,e.plotY],e.ttBelow=e.plotY>s.center[1]}),r(i,"alignDataLabel",function(t,i,a,e,o,s){if(this.chart.polar){var n,r,h=i.rectPlotX/Math.PI*180;null===e.align&&(n=h>20&&h<160?"left":h>200&&h<340?"right":"center",e.align=n),null===e.verticalAlign&&(r=h<45||h>315?"bottom":h>135&&h<225?"top":"middle",e.verticalAlign=r),l.alignDataLabel.call(this,i,a,e,o,s)}else t.call(this,i,a,e,o,s)})),r(h,"getCoordinates",function(t,i){var e=this.chart,o={xAxis:[],yAxis:[]};return e.polar?a(e.axes,function(t){var a=t.isXAxis,s=t.center,n=i.chartX-s[0]-e.plotLeft,r=i.chartY-s[1]-e.plotTop;o[a?"xAxis":"yAxis"].push({axis:t,value:t.translate(a?Math.PI-Math.atan2(n,r):Math.sqrt(Math.pow(n,2)+Math.pow(r,2)),!0)})}):o=t.call(this,i),o}),t.SVGRenderer.prototype.clipCircle=function(i,a,e){var o,s=t.uniqueKey(),n=this.createElement("clipPath").attr({id:s}).add(this.defs);return o=this.circle(i,a,e).add(n),o.id=s,o.clipPath=n,o},t.addEvent(t.Chart,"getAxes",function(){this.pane||(this.pane=[]),a(t.splat(this.options.pane),function(i){new t.Pane(i,this)},this)}),t.addEvent(t.Chart,"afterDrawChartBox",function(){a(this.pane,function(t){t.render()})
}),r(t.Chart.prototype,"get",function(i,a){return t.find(this.pane,function(t){return t.options.id===a})||i.call(this,a)})}}(t),t},this);