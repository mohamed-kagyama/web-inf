/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../administer/administer.logging","../administer/administer.base","runtime_dependencies/js-sdk/src/jrs.configs","../tenantImportExport/export/view/ExportPageView","../controls/controls.logging","../components/components.dialog"],function(e,n,i){var t=e("requirejs-domready"),o=e("../administer/administer.logging"),r=e("../administer/administer.base"),s=e("runtime_dependencies/js-sdk/src/jrs.configs"),d=e("../tenantImportExport/export/view/ExportPageView");e("../controls/controls.logging"),e("../components/components.dialog"),t(function(){r.urlContext=s.urlContext,o.initialize(),new d({el:document.getElementById("settings")})})});