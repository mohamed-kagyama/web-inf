/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var t=e("underscore");n.exports={create:function(e){return{convert:function(r){var n=r.start.value,u=r.end.value;return n=e.convert(n),u=e.convert(u),t.extend({},r,{start:{value:n},end:{value:u}})}}}}});