/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","./controls.editoptions","../../reportView/report.view","runtime_dependencies/jrs-ui/src/controls/controls.base"],function(e,r,o){var n=e("requirejs-domready"),s=e("underscore"),t=e("runtime_dependencies/js-sdk/src/jrs.configs"),i=e("./controls.editoptions"),d=e("../../reportView/report.view"),c=e("runtime_dependencies/jrs-ui/src/controls/controls.base"),p=c.ControlsBase;n(function(){d.reportUnitURI=t.Report.reportUnitURI,s.extend(p,t.inputControlsConstants);new i("#reportOptionsForm",t.Report.reportOptionsURI)})});