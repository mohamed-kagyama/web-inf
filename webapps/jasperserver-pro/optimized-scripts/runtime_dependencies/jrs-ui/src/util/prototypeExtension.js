/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/util/xssUtil"],function(e,s,n){var t=e("runtime_dependencies/js-sdk/src/common/util/xssUtil");n.exports={extend:function(e){e.escapeXSS=t.softHtmlEscape}}});