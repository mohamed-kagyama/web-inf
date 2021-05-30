/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","highcharts-more"],function(e,a,r){var t=e("highcharts-more"),o={perform:function(e,a){this.setupDualPie(e)},setupDualPie:function(e){if(2==e.series.length){var a=e.series[0];a.center=["50%","50%"],a.size="60%",a.dataLabels=a.dataLabels||{},a.dataLabels.color="#FFFFFF",a.dataLabels.distance=-30;var r=e.series[1];r.center=["50%","50%"],r.innerSize="60%",r.size="90%";for(var o=t.getOptions().colors,i=0,s=0,l=0;l<a.data.length;++l){var n=a.data[l].color;n||(n=o[i],i=(i+1)%o.length,a.data[l].color=n);var d=a.data[l]._jrChildCount;if(d)for(var c=0;c<d;++c,++s)if(s<r.data.length&&!r.data[s].color){var h=.2-c/d/5;r.data[s].color=t.Color(n).brighten(h).get()}}}}};r.exports=o});