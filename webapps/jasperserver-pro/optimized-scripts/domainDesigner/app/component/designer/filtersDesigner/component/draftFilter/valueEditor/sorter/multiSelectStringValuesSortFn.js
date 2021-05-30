/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","settings!domainSettings"],function(e,l,n){var t=e("settings!domainSettings");n.exports=function(e,l){return e.label===t.nullLabel?-1:l.label===t.nullLabel?1:e.label.localeCompare(l.label)}});