/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../model/InputControlOptionModel","runtime_dependencies/js-sdk/src/common/logging/logger"],function(e,o,n){var i=e("backbone"),t=e("../model/InputControlOptionModel"),l=e("runtime_dependencies/js-sdk/src/common/logging/logger"),r=l.register("InputControlOptionCollection");n.exports=i.Collection.extend({model:t,initialize:function(){this.on("all",r.debug,r)}})});