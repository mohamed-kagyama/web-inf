/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,s){var n=e("underscore"),r=function(e){this.states=e.states};n.extend(r.prototype,{enter:function(e,t){this.states[e].enter(t,this)}}),s.exports=r});