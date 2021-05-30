/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var t=e("underscore"),o=function(e){this.initialize(e)};t.extend(o.prototype,{initialize:function(e){this.oneOfConvertersConverterFactory=e.oneOfConvertersConverterFactory,this.filterOperandConverterConfig=e.filterOperandConverterConfig},convert:function(e,r){return this._convertOperand(e,r)},_convertOperand:function(e,r){var n=this.filterOperandConverterConfig[e.type]||{},t=n[r.dataType]||n.ANY;if(t)return this.oneOfConvertersConverterFactory.create(t).convert(e,r)}}),n.exports=o});