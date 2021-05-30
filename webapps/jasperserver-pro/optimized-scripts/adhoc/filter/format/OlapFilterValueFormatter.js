/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var i=e("underscore"),n=/(\[[\w\s.-]+\]\.){2}/,o=/(\[[\w\s.-]+\]\.){1}/,p=/\]\.\[/g,s=/^\[([^\]]+)\]$/g,a=function(e){i.bindAll(this,"format"),this.dimNamePrefixRegexp=e?n:o};i.extend(a.prototype,{format:function(e){return e=e.replace(this.dimNamePrefixRegexp,""),e=e.replace(p," - "),e=e.replace(s,"$1")}}),t.exports=a});