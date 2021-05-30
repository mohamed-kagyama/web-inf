/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){e("underscore");r.exports={isVariableEscaped:function(e){return Boolean(e.match(/^\".+\"$/))},unEscapeVariable:function(e){return e.slice(1,e.length-1)},escapeVariable:function(e){return'"'+e+'"'}}});