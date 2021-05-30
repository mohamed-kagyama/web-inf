/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var o=e("underscore"),n=function(e){o.bindAll(this,"match"),this.setKeyword(e)};o.extend(n.prototype,{setKeyword:function(e){this.searchKeyword=e?e.toLowerCase():""},match:function(e){var r=e.name,t=r.toLowerCase();return!this.searchKeyword||-1!==t.indexOf(this.searchKeyword)}}),t.exports=n});