/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(r,o,e){function n(r){t=window.onerror,window.onerror=function(o,e,n,i,t){var u={message:o,source:e,lineNumber:n,columnNumber:i,stack:t.stack};r.setError(u)}}function i(){window.onerror=t}var t;e.exports={init:n,remove:i}});