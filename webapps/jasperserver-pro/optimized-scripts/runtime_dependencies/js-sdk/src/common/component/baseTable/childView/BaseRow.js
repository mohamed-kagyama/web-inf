/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone.marionette","../../../view/mixin/epoxyViewMixin","../behaviors/TooltipRowBehavior"],function(e,i,o){var t=e("underscore"),n=e("backbone.marionette"),r=e("../../../view/mixin/epoxyViewMixin"),p=e("../behaviors/TooltipRowBehavior"),s=n.ItemView.extend({behaviors:{Tooltip:{behaviorClass:p}},initialize:function(){this.epoxifyView()},render:function(){return n.ItemView.prototype.render.apply(this,arguments),this.applyEpoxyBindings(),this},remove:function(){this.removeEpoxyBindings(),n.ItemView.prototype.remove.apply(this,arguments)}});t.extend(s.prototype,r),o.exports=s});