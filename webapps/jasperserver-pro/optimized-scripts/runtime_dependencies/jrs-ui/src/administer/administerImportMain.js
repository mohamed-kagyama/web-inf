/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../administer/administer.logging","../administer/administer.base","runtime_dependencies/js-sdk/src/jrs.configs","../tenantImportExport/import/view/ImportPageView"],function(e,i,t){var n=e("requirejs-domready"),r=e("../administer/administer.logging"),s=e("../administer/administer.base"),d=e("runtime_dependencies/js-sdk/src/jrs.configs"),m=e("../tenantImportExport/import/view/ImportPageView");n(function(){s.urlContext=d.urlContext,r.initialize(),new m({el:document.getElementById("settings")})})});