/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","../../util/classUtil","./util/attachableComponentPositionUtil"],function(t,i,e){var s=t("jquery"),o=t("underscore"),h=t("../../util/classUtil"),n=t("./util/attachableComponentPositionUtil");e.exports=h.extend({constructor:function(t,i){this.padding=i||{top:5,left:0},this.setAttachTo(t)},setAttachTo:function(t){t&&s(t).length>0?this.$attachTo=s(t):this.$attachTo=s("<div></div>")},show:function(){var t=n.getPosition(this.$attachTo[0],this.padding,this.$el[0]);o.extend(this,{top:t.top,left:t.left}),this.$el.css({top:this.top,left:this.left}),this.$el.show(),this.trigger("show",this)},hide:function(){return this.$el.hide(),this.trigger("hide",this),this}})});