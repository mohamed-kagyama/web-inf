/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(i,e,n){var t=i("underscore"),s=function(i){this.initialize(i)};t.extend(s.prototype,{initialize:function(i){this.specifications=i.specifications},isSatisfiedBy:function(i){i=t.isArray(i)?i:[i];var e=this;return t.some(i,function(i){return t.some(e.specifications,function(e){return e.isSatisfiedBy(i)})})}}),n.exports=s});