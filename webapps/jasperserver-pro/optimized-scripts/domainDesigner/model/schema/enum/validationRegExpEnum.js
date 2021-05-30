/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","settings!domainSettings"],function(e,t,n){var o=e("settings!domainSettings"),s=new RegExp(o.schemaElementNameNotSupportedSymbolsRegexp);n.exports={RESOURCE_ID_BLACKLIST_REGEX_PATTERN:s,RESOURCE_ID_BLACKLIST_SYMBOLS:o.schemaElementNameNotSupportedSymbols.replace(/\\(?!\\)/g,"")}});