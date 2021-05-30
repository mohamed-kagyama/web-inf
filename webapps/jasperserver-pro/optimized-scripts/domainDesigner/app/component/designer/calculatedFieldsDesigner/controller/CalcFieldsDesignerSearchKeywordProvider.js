/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,t,i){var n=e("underscore"),o=e("backbone"),r=function(e){this.initialize(e)};n.extend(r.prototype,o.Events,{initialize:function(e){n.bindAll(this,"get"),this.store=e.store},get:function(){return this.store.get("searchKeyword")}}),i.exports=r});