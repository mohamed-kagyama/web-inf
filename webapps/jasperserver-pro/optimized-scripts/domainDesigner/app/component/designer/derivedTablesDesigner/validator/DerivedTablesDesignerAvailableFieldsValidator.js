/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore"],function(e,i,r){var t=e("jquery"),n=e("underscore"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){this.validator=e.validator},validate:function(e){var i,r=new t.Deferred;return n.find(e,function(e){return i=this.validator.validate(e)},this),i?r.reject(i):r.resolve(e),r}}),r.exports=o});