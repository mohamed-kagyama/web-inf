/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var n=e("underscore"),o=function(e){n.bindAll(this,"around"),this.messageTemplate=n.template(e.messageTemplate||"{{=name}}"),this.performance=e.performance};n.extend(o.prototype,{around:function(e,r){var t=Array.prototype.slice.call(arguments,2),n=this.messageTemplate({name:e,args:t});return this._profile(n,r,t)},_profile:function(e,r,t){this._startProfile(e);var n=r.apply(null,t);return this._endProfile(e),n},_startProfile:function(e){this.performance&&console.time(e)},_endProfile:function(e){this.performance&&console.timeEnd(e)}}),t.exports=o});