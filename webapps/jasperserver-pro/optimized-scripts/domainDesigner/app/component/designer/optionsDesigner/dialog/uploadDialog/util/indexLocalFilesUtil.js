/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){var u=e("underscore");r.exports={indexFiles:function(e){return u.map(e,function(e,n){return u.extend({},e,{index:n})})}}});