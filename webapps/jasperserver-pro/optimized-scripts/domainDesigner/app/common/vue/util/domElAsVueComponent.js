/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","vue"],function(e,t,r){var u=e("jquery"),i=e("vue");r.exports=function(e){return i.extend({template:"<div></div>",mounted:function(){var t=u(e.el);u(this.$el).replaceWith(t),this.$el=t[0]}})}});