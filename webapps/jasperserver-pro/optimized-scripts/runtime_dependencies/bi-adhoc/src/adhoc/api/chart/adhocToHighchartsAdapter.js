/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","momentExtension","bundle!all","./adhocToHighchartsAdapter/Highcharts","./adhocToHighchartsAdapter/highchartsDataMapper","./adhocToHighchartsAdapter/adhocDataProcessor","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,a,t){var r=e("underscore"),o=e("jquery"),n=e("momentExtension"),s=e("bundle!all"),h=e("./adhocToHighchartsAdapter/Highcharts"),d=e("./adhocToHighchartsAdapter/highchartsDataMapper"),l=e("./adhocToHighchartsAdapter/adhocDataProcessor"),i=e("runtime_dependencies/js-sdk/src/jrs.configs"),c={generateOptions:function(e,a,t){var o=[s["months.label.january"]||"January",s["months.label.february"]||"February",s["months.label.march"]||"March",s["months.label.april"]||"April",s["months.label.may"]||"May",s["months.label.june"]||"June",s["months.label.july"]||"July",s["months.label.august"]||"August",s["months.label.september"]||"September",s["months.label.october"]||"October",s["months.label.november"]||"November",s["months.label.december"]||"December"],c=[s["week.days.label.sunday"]||"Sunday",s["week.days.label.monday"]||"Monday",s["week.days.label.tuesday"]||"Tuesday",s["week.days.label.wednesday"]||"Wednesday",s["week.days.label.thursday"]||"Thursday",s["week.days.label.friday"]||"Friday",s["week.days.label.saturday"]||"Saturday"],u={useUTC:!0,getTimezoneOffset:function(e){return-1*n.tz(e,i.userTimezone).utcOffset()}};h.setOptions({lang:{contextButtonTitle:s["highcharts.contextButtonTitle"]||"Chart context menu",decimalPoint:".",downloadJPEG:s["highcharts.downloadJPEG"]||"Download JPEG image",downloadPDF:s["highcharts.downloadPDF"]||"Download PDF document",downloadPNG:s["highcharts.downloadPNG"]||"Download PNG image",downloadSVG:s["highcharts.downloadSVG"]||"Download SVG vector image",drillUpButton:s["highcharts.drillUpButton"]||"Back",drillUpText:(s["highcharts.drillUpText"]||"Back to")+" {series.name}",invalidDate:s["highcharts.invalidDate"]||"",loading:(s["highcharts.loading"]||"Loading")+"...",months:o,noData:s["highcharts.noData"]||"No data to display",printChart:s["highcharts.printChart"]||"Print chart",resetZoom:s["highcharts.resetZoom"]||"Reset zoom",resetZoomTitle:s["highcharts.resetZoomTitle"]||"Reset zoom level 1:1",shortMonths:a.shortMonths,thousandsSep:",",weekdays:c},time:u});var m=l.levelsToLevelNumbers(a.rowsSelectedLevels,0),p=l.levelsToLevelNumbers(a.columnsSelectedLevels,1);t.chartState=a,t.metadata=e.metadata;var g=d.getHighchartsOptions(a.chartType,m,p,t);return g.time=g.time||{},r.extend(g.time,u),a.advancedProperties.length&&this._applyAdvancedProperties(g,a.advancedProperties),g},_applyAdvancedProperties:function(e,a){return r.each(a,function(a){this._setAdvancedProperty(e,a)},this),e},_setAdvancedProperty:function(e,a){var t=a.name.split("."),n={},s=t.length-1,h=n;r.each(t,function(e,t){t==s?n[e]=this._parseAdvancedPropertyValue(a.value):(n[e]={},n=n[e])},this),e[t[0]]&&e[t[0]].length?r(e[t[0]]).each(function(e){o.extend(!0,e,h[t[0]])}):o.extend(!0,e,h)},_parseAdvancedPropertyValue:function(e){var a;try{a=JSON.parse(e)}catch(t){a=e}return a}};t.exports=c});