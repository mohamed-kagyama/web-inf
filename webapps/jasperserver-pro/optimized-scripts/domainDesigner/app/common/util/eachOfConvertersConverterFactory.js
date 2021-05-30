/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var c=e("underscore");n.exports={create:function(e){return{convert:function(){var r=Array.prototype.slice.call(arguments,0),n=r[0],o=r.slice(1);return e=e||[],c.each(e,function(e){n=e.convert.apply(e,[n].concat(o))}),n}}}}});