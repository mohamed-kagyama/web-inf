/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,t){var o=r("underscore"),n=function(r){this.initialize(r)};o.extend(n.prototype,{initialize:function(r){this.errors=r.errors,this.category=r.category,this.errorsConverter=r.errorsConverter,this.categoryConverter=r.categoryConverter},convert:function(r,e){return{category:this._getCategory(r,e),errorParameters:this._getErrors(r,e)}},_getCategory:function(r,e){return this.category?this.category:this.categoryConverter?this.categoryConverter.convert(r,e)||null:null},_getErrors:function(r,e){return this.errors?this.errors:this.errorsConverter?(r=this.errorsConverter.convert(r,e),r?[].concat(r):[]):[]}}),t.exports=n});