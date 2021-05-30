/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","settings!domainSettings"],function(e,n,l){var t=e("settings!domainSettings");l.exports=function(e,n){return e.label===t.nullLabel?-1:n.label===t.nullLabel?1:parseInt(e.label,10)-parseInt(n.label,10)}});