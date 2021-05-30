/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var o=e("underscore");n.exports={create:function(e){var t=e.tree;return{created:function(){t.on("item:click",this.onItemClick)},destroyed:function(){t.off("item:click",this.onItemClick)},methods:{onItemClick:function(){o.defer(function(){t.fetch({keepPosition:!0})})}}}}}});