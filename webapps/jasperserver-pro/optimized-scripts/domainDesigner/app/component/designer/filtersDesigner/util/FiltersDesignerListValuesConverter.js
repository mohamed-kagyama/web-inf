/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var n=e("underscore"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){this.oneOfConvertersConverterFactory=e.oneOfConvertersConverterFactory,this.filterListValuesConverterConfig=e.filterListValuesConverterConfig},convert:function(e,r){return this._convertValue(e,r)},_convertValue:function(e,r){var t=this.filterListValuesConverterConfig[r];if(t)return this.oneOfConvertersConverterFactory.create(t).convert(e,r)}}),t.exports=o});