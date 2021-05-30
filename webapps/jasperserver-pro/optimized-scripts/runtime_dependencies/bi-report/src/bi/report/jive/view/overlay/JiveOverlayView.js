/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","jquery","text!./template/overlayTemplate.htm"],function(e,t,i){var n=e("backbone"),r=e("jquery"),s=e("text!./template/overlayTemplate.htm"),l=n.View.extend({el:s,events:{click:"_overlayClicked"},initialize:function(e){var e=e||{};this.parentElement=r(e.parentElement?e.parentElement:"body"),this.rendered=!1,n.View.prototype.initialize.apply(this,arguments)},render:function(){return this.parentElement.append(this.$el),this.rendered=!0,this},css:function(e){return this.$el.css(e),this},setPosition:function(e){return this.$el.position(e),this},show:function(){return this.$el.show(),this},hide:function(){return this.$el.hide(),this},_overlayClicked:function(){this.trigger("overlayClicked")}});i.exports=l});