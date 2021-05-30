/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../administer/administer.logging","../administer/administer.base","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,i,n){var r=e("requirejs-domready"),s=e("../administer/administer.logging"),d=e("../administer/administer.base"),t=e("runtime_dependencies/js-sdk/src/jrs.configs");r(function(){d.urlContext=t.urlContext,s.initialize()})});