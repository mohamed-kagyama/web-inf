/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./TreePlugin"],function(e,i,n){var t=e("./TreePlugin");n.exports=t.extend({initialize:function(){this.$el.hide()},itemsRendered:function(e){this.$el.hasClass("node")&&(this.$("> .subcontainer > .j-view-port-chunk > ul > li").length?this.$el.show():this.$el.hide())}})});