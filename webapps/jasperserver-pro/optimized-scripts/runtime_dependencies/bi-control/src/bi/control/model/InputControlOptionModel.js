/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/model/BaseModel","runtime_dependencies/js-sdk/src/common/logging/logger"],function(e,n,o){var d=e("runtime_dependencies/js-sdk/src/common/model/BaseModel"),s=e("runtime_dependencies/js-sdk/src/common/logging/logger"),i=s.register("InputControlOptionModel");o.exports=d.extend({defaults:{selected:!1,label:void 0,value:void 0},initialize:function(){this.on("all",i.debug,i)}})});