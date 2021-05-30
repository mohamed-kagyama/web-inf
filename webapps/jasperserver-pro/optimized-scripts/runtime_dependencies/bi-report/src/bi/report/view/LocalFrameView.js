/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","jquery"],function(e,o,t){var n=e("underscore"),i=e("backbone"),s=e("jquery");t.exports=i.View.extend({initialize:function(e){this.setElement(s("<iframe></iframe>",{scrolling:"no"}).css({border:"none",width:"100%"})),this.frameLoaded=new s.Deferred,this.$el.on("load",n.bind(this.onLoad,this,e))},onLoad:function(e){this.el.contentWindow||this.el.contentDocument?(this.frameDoc=(this.el.contentWindow||this.el.contentDocument).document,this.$frameBody=s(this.frameDoc.getElementsByTagName("body")[0]),this.$frameBody.css({position:"relative",margin:0}).html(e),this.frameLoaded.resolve()):setTimeout(function(){n.bind(this.onLoad,this)},1e3)},remove:function(){this.$el.off("load"),i.View.prototype.remove.apply(this,arguments)}})});