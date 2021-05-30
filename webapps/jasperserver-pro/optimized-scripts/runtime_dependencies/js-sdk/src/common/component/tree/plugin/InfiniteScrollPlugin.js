/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./TreePlugin"],function(e,n,i){var t=e("./TreePlugin");i.exports=t.extend({itemsRendered:function(){this.$("> .subcontainer > .j-view-port-chunk").css({height:"auto"})}})});