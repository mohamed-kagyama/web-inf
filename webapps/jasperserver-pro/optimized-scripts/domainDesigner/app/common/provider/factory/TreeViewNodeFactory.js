/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,o,t){function r(e){this.options=e}var n=e("underscore");r.prototype.create=function(e){return n.defaults(e,this.options)},t.exports=r});