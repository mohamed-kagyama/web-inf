/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone.marionette","../tooltip/Tooltip"],function(t,o,e){var i=t("backbone.marionette"),n=t("../tooltip/Tooltip"),p=i.CompositeView.extend({initialize:function(t){t=t||{};var o=t.tooltip;o&&o.template&&o.i18n&&(this.tooltip=new n({i18n:o.i18n,attachTo:this.$el,contentTemplate:o.template}))},remove:function(){this.tooltip&&this.tooltip.remove(),i.CompositeView.prototype.remove.apply(this,arguments)}});e.exports=p});