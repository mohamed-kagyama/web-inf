/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(o,i,e){var n=o("underscore"),t=function(o){this.initialize(o)};n.extend(t.prototype,{initialize:function(o){this.goToPreviousLocation=o.goToPreviousLocation},enter:function(o){this.goToPreviousLocation()}}),e.exports=t});