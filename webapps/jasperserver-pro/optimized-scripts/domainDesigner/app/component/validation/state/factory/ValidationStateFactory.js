/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(t,i,e){var n=t("underscore"),a=function(t){this.initialize(t)};n.extend(a.prototype,{initialize:function(t){this.validationStates=t.validationStates},enter:function(t,i){var e=this.validationStates[t];i.initialState||(i.initialState=t),e.enter(i,this)}}),e.exports=a});