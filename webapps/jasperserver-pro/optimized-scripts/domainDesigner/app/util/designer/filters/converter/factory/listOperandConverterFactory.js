/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var t=e("underscore");n.exports={create:function(e){return{convert:function(r,n){var o=r.items||[];return t.extend({},r,{items:e.convert(o,n)})}}}}});