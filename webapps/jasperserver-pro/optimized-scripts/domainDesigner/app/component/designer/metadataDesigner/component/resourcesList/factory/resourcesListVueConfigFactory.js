/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/resourcesListVueTemplate.htm"],function(e,t,i){var r=e("text!../template/resourcesListVueTemplate.htm");i.exports={create:function(e){var t=e.tree;return{template:r,mixins:e.mixins,mounted:function(){this._destroyDroppable&&this._destroyDroppable(),this._destroyDraggable&&this._destroyDraggable(),t.setElement(this.$el),this._initializeDroppable&&this._initializeDroppable(),this._initializeDraggable&&this._initializeDraggable()}}}}});