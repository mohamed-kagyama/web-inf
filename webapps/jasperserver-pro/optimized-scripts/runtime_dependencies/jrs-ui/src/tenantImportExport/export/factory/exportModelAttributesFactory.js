/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/exportTypesEnum"],function(e,n,u){var s=e("underscore"),r=e("../enum/exportTypesEnum"),t={},i={roles:null,users:null,everything:!0,userForRoles:!1,rolesForUser:!1,includeReports:!0,includeOtherResourceFiles:!0,includeDataSources:!0,includeDependentObjects:!0,includeAttributes:!0,includeAttributeValues:!0},c={includeAccessEvents:!1,includeAuditEvents:!1,includeMonitoringEvents:!1},d={includeDomains:!0,includeAdHocViews:!0,includeDashboards:!0},l={includeSubOrganizations:!0},o={includeServerSettings:!0};t[r.ROOT_TENANT]=s.extend({},i,c,d,l,o),t[r.TENANT]=s.extend({},i,d,l),t[r.SERVER_PRO]=s.extend({},i,c,d,l,o),t[r.SERVER_CE]=s.extend({},i,o,{includeAccessEvents:!0}),u.exports=function(e){return t[e]}});