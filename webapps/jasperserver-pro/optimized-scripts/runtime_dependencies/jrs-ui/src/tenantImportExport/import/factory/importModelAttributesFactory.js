/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../export/enum/exportTypesEnum"],function(e,n,t){var r=e("underscore"),s=e("../../export/enum/exportTypesEnum"),u={},d={includeAccessEvents:!0,includeAuditEvents:!0,includeMonitoringEvents:!0},i={skipThemes:!0},c={includeServerSettings:!0};u[s.ROOT_TENANT]=r.extend({},d,i),u[s.TENANT]=r.extend({},i),u[s.SERVER_PRO]=r.extend({},d,i,c),u[s.SERVER_CE]=r.extend({},c,{includeAccessEvents:!0}),t.exports=function(e){return u[e]}});