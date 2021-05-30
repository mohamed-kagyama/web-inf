/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,o){var s=e("underscore"),t=function(e){this.specsForRecoverableErrors=e.specsForRecoverableErrors};s.extend(t.prototype,{filter:function(e){return s.filter(e,function(e){return!s.some(this.specsForRecoverableErrors,function(r){return r.isSatisfiedBy(e)})},this)}}),o.exports=t});