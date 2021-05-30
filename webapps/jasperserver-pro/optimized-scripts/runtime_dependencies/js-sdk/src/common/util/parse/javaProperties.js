/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,s,r){r.exports=function(e){var s,r={},t=e.split(/\r?\n/),n="";return t.forEach(function(e){/^\s*(\#|\!|$)/.test(e)||(e=e.replace(/^\s*/,""),n+=e,/(\\\\)*\\$/.test(n)?n=n.replace(/\\$/,""):(s=/^\s*((?:[^\s:=\\]|\\.)+)\s*[:=\s]\s*(.*)$/.exec(n),r[s[1]]=s[2],n=""))}),r}});