/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,s,n){var r=e("backbone"),o=e("runtime_dependencies/js-sdk/src/jrs.configs");n.exports=r.Model.extend({urlRoot:o.contextPath+"/rest_v2/jobs/calendars"})});