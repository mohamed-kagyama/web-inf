/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var t=e("underscore");n.exports={create:function(e){return{convert:function(){var r,n=Array.prototype.slice.call(arguments,0);return e=e||[],t.find(e,function(e){return r=e.convert.apply(e,n),!t.isUndefined(r)}),r}}}}});