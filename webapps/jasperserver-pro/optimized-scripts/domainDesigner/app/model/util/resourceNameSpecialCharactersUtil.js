/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../enum/clientValidationRegExpEnum"],function(e,n,a){function r(e){return e.match(i.RESOURCE_ID_BLACKLIST_REGEX_PATTERN)}function E(e){return e.replace(i.RESOURCE_ID_BLACKLIST_REPLACE_REGEX_PATTERN,t)}var i=e("../../enum/clientValidationRegExpEnum"),t="_";a.exports={isResourceNameContainsSpecialCharacters:r,replaceResourceNameSpecialCharacters:E}});