/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./TreePlugin","underscore","../../tooltip/Tooltip"],function(t,i,o){var e=t("./TreePlugin"),s=t("underscore"),n=t("../../tooltip/Tooltip");o.exports=e.extend({initialize:function(t){this.tooltip=n.attachTo(t.attachTo,s.omit(t,"el")),this.listensToList=!1,e.prototype.initialize.apply(this,arguments)},itemsRendered:function(t,i){var o=this;this.listensToList||(this.listensToList=!0,this.listenTo(i,"list:item:mouseover",function(t,i){o.tooltip.show(t)}),this.listenTo(i,"list:item:mouseout",function(){o.tooltip.hide()}))},remove:function(){n.detachFrom(this.$el),this.tooltip.remove(),e.prototype.remove.apply(this,arguments)}})});