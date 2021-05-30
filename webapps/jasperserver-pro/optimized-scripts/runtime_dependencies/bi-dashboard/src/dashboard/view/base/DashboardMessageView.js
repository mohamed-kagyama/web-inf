/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","text!../../template/dashboardMessageTemplate.htm"],function(e,t,s){var a=e("backbone"),d=e("text!../../template/dashboardMessageTemplate.htm");s.exports=a.View.extend({el:d,show:function(e){this.$el.removeClass("hidden").show().find(".message").html(e)},hide:function(){this.$el.addClass("hidden").hide()}})});