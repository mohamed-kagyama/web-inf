/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./dependenciesTrackingConverterContextConfiguration","./dependenciesInspectorContextConfiguration","./dependenciesTrackingApplicationDispatcherContextConfiguration","./dependenciesTrackingDomainSchemaServicesContextConfiguration"],function(e,n,i){var o=e("./dependenciesTrackingConverterContextConfiguration"),t=e("./dependenciesInspectorContextConfiguration"),r=e("./dependenciesTrackingApplicationDispatcherContextConfiguration"),c=e("./dependenciesTrackingDomainSchemaServicesContextConfiguration");i.exports=function(e,n){c(e,n),o(e,n),t(e,n),r(e,n)}});