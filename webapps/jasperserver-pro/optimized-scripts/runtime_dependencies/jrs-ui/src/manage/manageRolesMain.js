/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","../org/org.root.role","runtime_dependencies/js-sdk/src/jrs.configs","../tenantImportExport/view/TenantsTreeView","./mng.common.actions","../org/org.role.mng.actions"],function(e,o,n){var r=e("requirejs-domready"),t=e("underscore"),i=e("../org/org.root.role"),s=e("runtime_dependencies/js-sdk/src/jrs.configs"),a=e("../tenantImportExport/view/TenantsTreeView");e("./mng.common.actions"),e("../org/org.role.mng.actions"),r(function(){void 0===i.messages&&(i.messages={}),void 0===i.Configuration&&(i.Configuration={}),t.extend(window.localContext,s.roleManagement.localContext),t.extend(i.messages,s.roleManagement.orgModule.messages),t.extend(i.Configuration,s.roleManagement.orgModule.Configuration),i.roleManager.initialize({TenantsTreeView:a})})});