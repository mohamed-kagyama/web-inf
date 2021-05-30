/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","highcharts"],function(t,e,i){var s=t("highcharts");s.wrap(s.seriesTypes.pie.prototype,"render",function(t){var e,i=this.chart,s=this.center||this.yAxis&&this.yAxis.center,h=this.options.title;t.call(this),s&&h&&(e={x:i.plotLeft+s[0]-.5*s[2],y:i.plotTop+s[1]-.5*s[2],width:s[2],height:s[2]},this.title?this.title.align(h,null,e):this.title=this.chart.renderer.label(h.text).css(h.style).add().align(h,null,e))}),i.exports=s});