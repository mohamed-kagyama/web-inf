/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","../../util/classUtil"],function(t,i,e){var n,s,o=t("jquery"),u=t("../../util/classUtil");e.exports=u.extend({constructor:function(t){n||(s=0,n=o("<div id='dialogDimmer' class='dimmer'></div>").css(t),o(document.body).append(n),n.hide()),s++},css:function(t){return n.css(t),this},show:function(){var t=this.getCount()||0;return this.setCount(++t),n.show(),this},hide:function(){if(this.isVisible()){var t=this.getCount();return this.setCount(--t),!t&&n.hide(),this}},setCount:function(t){n.data({count:t})},getCount:function(){return parseInt(n.data("count"),10)},isVisible:function(){return n.is(":visible")},remove:function(){this._removed||(this._removed=!0,n&&(--s||(n.remove(),n=null)))}})});