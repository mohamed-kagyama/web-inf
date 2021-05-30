/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(i,t,e){var n=i("underscore"),o=function(i){this.initialize(i)};n.extend(o.prototype,{initialize:function(i){n.bindAll(this,"execute"),i=i||{},this.applicationMutations=i.applicationMutations},execute:function(i){var t=Array.prototype.slice.call(arguments,1);this.applicationMutations[i].apply(this.applicationMutations,t)}}),e.exports=o});