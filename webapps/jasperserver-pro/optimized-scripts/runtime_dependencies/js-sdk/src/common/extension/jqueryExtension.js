/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../util/xssUtil"],function(t,e,i){var l=t("../util/xssUtil");i.exports={extend:function(t){var e=t.htmlPrefilter;t.htmlPrefilter=function(t){return t=e.call(this,t),l.softHtmlEscape(t)}}}});