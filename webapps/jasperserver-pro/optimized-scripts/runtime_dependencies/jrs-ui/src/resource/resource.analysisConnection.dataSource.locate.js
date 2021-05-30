/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./resource.locate"],function(i,e,o){var n=i("./resource.locate"),t={initialize:function(i){n.initialize(i)}};void 0===i&&document.observe("dom:loaded",function(){t.initialize(window.localContext.initOptions)}),o.exports=t});