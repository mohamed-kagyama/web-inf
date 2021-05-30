/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,o,e){var t=r("underscore"),n=function(r){t.bindAll(this,"compare"),this.comparators=r.comparators||[]};t.extend(n.prototype,{compare:function(r,o){var e=0;return t.find(this.comparators,function(t){return 0!==(e=t(r,o))}),e}}),e.exports=n});