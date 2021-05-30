/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","./messageDetails","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,s,i){var n=e("requirejs-domready"),r=e("./messageDetails"),d=e("runtime_dependencies/js-sdk/src/jrs.configs");n(function(){r.initialize(d.messageDetailsInitOptions)})});