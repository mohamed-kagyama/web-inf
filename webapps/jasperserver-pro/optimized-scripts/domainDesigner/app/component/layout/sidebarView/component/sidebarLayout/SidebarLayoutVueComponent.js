/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue"],function(e,t,n){var o=e("vue");n.exports=o.extend({created:function(){this.$mount()},mounted:function(){var e=this.$options.treeContainerElement;e?this.$options.tree.setElement(this.$el.querySelector(e)):this.$options.tree.setElement(this.$el)}})});