/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseComponentModel","../../visualChooser/VisualizationTypesController"],function(e,t,i){var s=e("underscore"),a=e("./BaseComponentModel"),n=e("../../visualChooser/VisualizationTypesController");i.exports=a.extend({defaults:{xAxisRotation:-45,yAxisRotation:0,xAxisStep:1,yAxisStep:1,legend:"bottom",showDataPoints:!0,advancedProperties:[],alignment:"bottom",showMeasureOnValueAxis:!0,legendBorder:!0,showSingleMeasuresLabels:!0,autoScaleFonts:!0,showScatterLine:!1,type:"Column"},initialize:function(e,t){this.visualizationTypesManager=new n;var i=this.get("advancedProperties");s.isArray(i)||this.set({advancedProperties:s.map(s.keys(i),function(e){return{name:e,value:i[e]}})})},getLegacyAdhocChartType:function(){var e=this;return this.visualizationTypesManager.findType({name:e.get("type")}).legacyAdhoc},isTimeSeries:function(){return this.visualizationTypesManager.isTimeSeriesType(this.get("type"))}})});