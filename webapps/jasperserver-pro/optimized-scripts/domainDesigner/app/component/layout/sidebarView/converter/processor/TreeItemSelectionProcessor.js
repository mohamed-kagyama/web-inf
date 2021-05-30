/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,t){var n=e("underscore"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){n.bindAll(this,"process"),this.isItemSelected=e.isItemSelected},process:function(e){return e.addToSelection=this.isItemSelected(e.resource),e}}),t.exports=o});