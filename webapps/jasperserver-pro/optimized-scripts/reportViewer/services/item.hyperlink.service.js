/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(e,t,r){var n=e("jquery"),i=function(e,t,r){this.chartInstance=e,this.chartOptions=t,this.serviceData=r,this.hyperlinkSeriesPointClickedHandler=null};i.prototype={perform:function(){var e=this;e.serviceData.seriesId?this.configureHyperlinks(e.serviceData.seriesId):e.serviceData.chartHyperlink&&this.configureChartHyperlink(e.serviceData.chartHyperlink)},configureHyperlinks:function(e){for(var t=this,r=null,n=0;n<t.chartOptions.series.length;++n)if(t.chartOptions.series[n]._jrid==e){r=t.chartOptions.series[n];break}r&&(r.cursor="pointer",r.point=r.point||{},r.point.events=r.point.events||{},t.hyperlinkSeriesPointClickedHandler?r.point.events.click=function(e){t.hyperlinkSeriesPointClickedHandler.call(t.chartInstance,{hyperlink:this.options[t.serviceData.hyperlinkProperty]})}:r.point.events.click=function(e){t.openHyperlink(this.options[t.serviceData.hyperlinkProperty])})},configureChartHyperlink:function(e){var t=this,r=t.chartOptions;r.chart=r.chart||{},r.chart.style=r.chart.style||{},r.chart.style.cursor="pointer",r.chart.events=r.chart.events||{},r.chart.events.click=function(r){var i=n(r.target).parentsUntil("div.highcharts-container");!i.is(".highcharts-button")&&i.is("svg")&&(t.hyperlinkSeriesPointClickedHandler?t.hyperlinkSeriesPointClickedHandler.call(t.chartInstance,{hyperlink:e}):t.openHyperlink(e))}},openHyperlink:function(e){e&&e.url&&(e.target&&"None"!=e.target&&"Self"!=e.target?"Blank"==e.target?window.open(e.url,"_blank"):"Parent"==e.target?window.open(e.url,"_parent"):"Top"==e.target?window.open(e.url,"_top"):window.open(e.url,e.target):location.href=e.url)}},r.exports=i});