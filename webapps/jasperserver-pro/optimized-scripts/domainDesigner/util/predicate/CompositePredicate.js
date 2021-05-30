/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore"),r=function(e){n.bindAll(this,"match"),this.predicates=e?n.isArray(e)?e:[e]:[]};n.extend(r.prototype,{match:function(){var e=Array.prototype.slice.call(arguments,0),t=n.find(this.predicates,function(t){return!this._matchPredicate(t,e)},this);return n.isUndefined(t)},_matchPredicate:function(e,t){return!!n.isUndefined(e)||(n.isFunction(e)?e.apply(null,t):e)}}),i.exports=r});