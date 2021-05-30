/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore"),r=["id","index","dataIslandId"];i.exports={computed:{itemSelectionProperties:function(){return n.extend({},n.pick(this.item,r),{type:this.item.modelType,parentId:this.item.parentId||null})}}}});