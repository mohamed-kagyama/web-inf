/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(i,t,e){var s=i("underscore"),n=function(i){this.specifications=i.specifications};s.extend(n.prototype,{sort:function(i){var t=this;return i.sort(function(i,e){var s=t._isSatisfiedBy(i),n=t._isSatisfiedBy(e);return s&&n||!s&&!n?0:s?-1:n?1:void 0})},_isSatisfiedBy:function(i){return s.some(this.specifications,function(t){return t.isSatisfiedBy(i)})}}),e.exports=n});