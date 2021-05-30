/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var t=e("underscore"),r=function(e){this.initialize(e)};t.extend(r.prototype,{initialize:function(e){this.specs=e.specs},isSatisfiedBy:function(e){e=t.isArray(e)?e:[e];var i=this;return t.every(e,function(e){return t.some(i.specs,function(i){return i.isSatisfiedBy(e)})})}}),n.exports=r});