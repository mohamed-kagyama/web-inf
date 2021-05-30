/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../util/designer/filters/enum/booleanStringEquivalentEnum","settings!domainSettings"],function(e,n,l){var t=e("../../../../../../../util/designer/filters/enum/booleanStringEquivalentEnum"),i=e("settings!domainSettings");l.exports=function(e,n){return e.label===i.nullLabel||n.label===t.FALSE?-1:n.label===i.nullLabel||e.label===t.FALSE?1:0}});