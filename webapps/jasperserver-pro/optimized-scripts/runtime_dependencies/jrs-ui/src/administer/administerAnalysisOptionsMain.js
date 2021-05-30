/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../administer/administer.base","../administer/administer.options","runtime_dependencies/js-sdk/src/jrs.configs","underscore"],function(e,i,s){var n=e("requirejs-domready"),r=e("../administer/administer.base"),d=e("../administer/administer.options"),t=e("runtime_dependencies/js-sdk/src/jrs.configs"),o=e("underscore");n(function(){o.extend(r._messages,t.Administer._messages),r.urlContext=t.urlContext,r.flowExecutionKey=t.Administer.flowExecutionKey,d.initialize()})});