/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(t,e,o){o.exports=function(t){return t.contextPath+"/rest_v2/organizations?{{= id != 'organizations' ? 'rootTenantId=' + encodeURIComponent(id) : ''}}&offset={{= offset }}&limit={{= limit }}&maxDepth=1"}});