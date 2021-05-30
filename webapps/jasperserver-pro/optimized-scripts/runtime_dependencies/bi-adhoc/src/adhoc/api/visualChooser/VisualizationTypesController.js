/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./collection/ChartTypeGroupCollection","./enum/visualizationTypes"],function(e,n,r){function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function u(e,n,r){return n&&i(e.prototype,n),r&&i(e,r),e}function o(e){var n,r=0,t=e.reduce(function(e,n){return n.isMeasure()?e+1:e},0),i=e.multiAxisMap(function(e){return e.isMeasure()?"m":(r++,"f")});if(t>1){n=[];for(var u=0;u<i.length;u++)if("m"===i[u])for(var o=0;o<t;o++)n.push("m");else n.push(i[u])}else n=i;return{fieldsCount:r,measureCount:t,placement:n.join("")}}function s(e,n,r){return e.requirements.categorizerAllowed&&y.difference(n,e.requirements.categorizerAllowed).length||e.requirements.categorizerForbidden&&y.difference(n,e.requirements.categorizerForbidden).length<n.length||e.requirements.categorizerDefaultOnly&&!r}function a(e,n){return!(n||"Crosstab"===e.name||"Table"===e.name)}function l(e,n){var r=e.requirements;if(r.measures)return!y.isUndefined(r.measures.min)&&r.measures.min>n||!y.isUndefined(r.measures.max)&&r.measures.max<n}function c(e,n){var r=e.requirements;if(r.fields){if(!y.isUndefined(r.fields.min)&&r.fields.min>n)return!0;if(!y.isUndefined(r.fields.max)&&r.fields.max<n)return!0}return!1}function f(e,n){var r=e.requirements;if(r.measures){if(!1===r.measures.inRow&&n.row.indexOf("m")>-1)return!0;if(!1===r.measures.inColumn&&n.column.indexOf("m")>-1)return!0}return!1}function m(e,n){var r=e.requirements;if(r.fields){if(!1===r.fields.inRow&&n.row.indexOf("f")>-1)return!0;if(!1===r.fields.inColumn&&n.column.indexOf("f")>-1)return!0}return!1}function p(e,n){var r=e.requirements;if(r.placement){if(r.placement.allowed)return!y.some(r.placement.allowed,function(e){return null!==n.column.match(new RegExp("^"+e.column+"$"))&&null!==n.row.match(new RegExp("^"+e.row+"$"))});if(r.placement.forbidden)return y.some(r.placement.forbidden,function(e){return null!==n.column.match(new RegExp("^"+e.column+"$"))&&null!==n.row.match(new RegExp("^"+e.row+"$"))})}return!1}function d(e,n){var r=e.requirements;if(e.isTimeSeries&&r.fields){if("time"===r.fields.type&&!n.isDateTime)return!0;if(r.fields.categorizer&&!y.contains(r.fields.categorizer,n.categorizer))return!0}return!1}var y=e("underscore"),h=e("./collection/ChartTypeGroupCollection"),g=e("./enum/visualizationTypes"),T=function(){function e(){t(this,e),this.typesToExclude=[],this._prepareCollection()}return u(e,[{key:"setTypesToExclude",value:function(e){y.isArray(e)&&(this.typesToExclude=e,this._prepareCollection())}},{key:"_prepareCollection",value:function(){var e=this,n=JSON.parse(JSON.stringify(g));y.each(n,function(n){n.chartTypes=y.filter(n.chartTypes,function(n){return-1===e.typesToExclude.indexOf(n.name)})}),n=y.filter(n,function(e){return e.chartTypes.length}),this.collection=new h(n)}},{key:"getAllTypes",value:function(){var e=this.collection.map(function(e){return e.chartTypesCollection.toJSON()});return y.flatten(e)}},{key:"getAllGroups",value:function(){return this.collection.toJSON()}},{key:"getAllTypesInGroup",value:function(e){return this.collection.findWhere({name:e}).chartTypesCollection.toJSON()}},{key:"findType",value:function(e){return y.findWhere(this.getAllTypes(),e)}},{key:"getTypeByName",value:function(e){return this.findType({name:e})}},{key:"getTypeByLegacyAdhocName",value:function(e){return this.findType({legacyAdhoc:e})}},{key:"isTimeSeriesType",value:function(e){return this.findType({name:e}).isTimeSeries}},{key:"getTimeseriesAttributes",value:function(e){var n=e.first();return{isDateTime:n&&n.isDateTime(),categorizer:n&&n.get("categorizer")}}},{key:"getDisabledTypesList",value:function(e,n){var r=o(e),t=o(n),i=function(e){return e.isDefaultCategorizer()},u=y.compact(e.pluck("categorizer").concat(n.pluck("categorizer"))),s=y.reduce(e.map(i).concat(n.map(i)),function(e,n){return e&&n}),a={column:r.placement,row:t.placement};return this._getDisabledChartTypes(r.measureCount+t.measureCount,r.fieldsCount+t.fieldsCount,a,this.getTimeseriesAttributes(n),e.allHasSummaries()&&n.allHasSummaries(),u,s)}},{key:"getAllowedTypesList",value:function(e,n){return y.difference(y.pluck(this.getAllTypes(),"name"),this.getDisabledTypesList(e,n))}},{key:"_getDisabledChartTypes",value:function(e,n,r,t,i,u,o){var h=this.getAllTypes(),g=[];return y.each(h,function(y){var h=s(y,u,o),T=a(y,i),v=l(y,e),C=f(y,r),w=c(y,n),x=m(y,r),k=p(y,r),b=d(y,t);(T||v||C||w||x||k||b||h)&&g.push(y.name)}),g}},{key:"doesChartSupportResizing",value:function(e){var n=this.getAllTypes(),r=y.filter(n,function(e){return e.supportsResize});return r=y.pluck(r,"name"),-1!==r.indexOf(e)}}]),e}();r.exports=T});