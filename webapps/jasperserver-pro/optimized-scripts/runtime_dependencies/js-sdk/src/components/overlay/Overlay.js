/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","backbone","text!./template/overlayTemplate.htm"],function(e,t,i){var s=e("underscore"),l=(e("jquery"),e("backbone")),n=e("text!./template/overlayTemplate.htm");i.exports=l.View.extend({el:function(){return this.template()},template:s.template(n),initialize:function(e){e=s.defaults(e||{},{zIndex:4e3}),this.delay=e.delay,this.$el.css({zIndex:e.zIndex}),this.$el.parent().css({position:"relative"})},show:function(e){var t=this,i=function(){t.$el.show(),t.$el.removeClass("jr-isHidden")};this.delay||e?this._timer||(this._timer=setTimeout(i,this.delay||e)):i()},hide:function(){this._timer&&(clearTimeout(this._timer),this._timer=null),this.$el.hide(),this.$el.addClass("jr-isHidden")}})});