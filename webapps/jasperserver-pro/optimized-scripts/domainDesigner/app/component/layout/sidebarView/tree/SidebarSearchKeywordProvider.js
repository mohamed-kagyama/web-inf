/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,r){var t=e("underscore"),n=function(e){this.initialize(e)};t.extend(n.prototype,{initialize:function(e){this.service=e.service},get:function(){return this.service.getSidebarSearchKeyword()}}),r.exports=n});