/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../model/schema/enum/validationRegExpEnum","settings!domainSettings"],function(e,E,n){var t=e("underscore"),m=e("../../model/schema/enum/validationRegExpEnum"),o=e("settings!domainSettings"),s=o.schemaElementNameNotSupportedSymbolsRegexp,R=new RegExp(s,"g");n.exports=t.extend({RESOURCE_ID_BLACKLIST_REPLACE_REGEX_PATTERN:R,BUNDLE_KEY_BLACKLIST_REGEX_PATTERN:/[-+='"!#$%^&,<> %:;?{}@()|\*\[\]\/\\]/,STARTS_FROM_A_NUMBER:/^[0-9]/,ESCAPE_JSON:/[\?]+/g},m)});