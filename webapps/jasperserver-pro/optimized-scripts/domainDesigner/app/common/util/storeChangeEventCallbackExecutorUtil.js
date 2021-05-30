/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,t){t.exports={getExecutor:function(e){return function(){var r=Array.prototype.slice.call(arguments,0),t=r[2];e[t]&&e[t].apply(e,r)}}}});