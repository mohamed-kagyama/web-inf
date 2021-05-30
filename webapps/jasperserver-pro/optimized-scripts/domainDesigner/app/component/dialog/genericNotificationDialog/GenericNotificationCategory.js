/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","underscore","text!./template/genericNotificationCategoryTemplate.htm"],function(e,t,r){var i=e("vue"),o=e("underscore"),n=e("text!./template/genericNotificationCategoryTemplate.htm");r.exports=i.extend({props:["category"],template:n,computed:{label:function(){return o.isString(this.category)?this.category:this.category.label},isBold:function(){if(o.isString(this.category))return!0;var e=this.category.isBold;return!!o.isUndefined(e)||e}}})});