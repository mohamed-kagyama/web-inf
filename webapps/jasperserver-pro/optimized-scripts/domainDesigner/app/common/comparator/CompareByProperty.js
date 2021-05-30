/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,o){var t=e("underscore"),p=function(e){t.bindAll(this,"compare"),this.property=e.property};t.extend(p.prototype,{compare:function(e,r){return e[this.property].localeCompare(r[this.property])}}),o.exports=p});