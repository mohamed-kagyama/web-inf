/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){var o=e("underscore");r.exports={initTreePlugins:function(e,n){n=n||[],o.each(n,function(n){var r=o.extend({},n.options,{tree:e});new n.constr(r)})}}});