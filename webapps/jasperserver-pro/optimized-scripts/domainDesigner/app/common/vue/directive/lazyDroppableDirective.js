/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","../../util/extractElementFromEventUtil","../../util/extractDataFromDraggable","jquery-ui/ui/widgets/droppable"],function(e,o,t){function r(e,o){var t=[a()];t.length&&e.droppable().trigger(o,t)}var p=e("jquery"),n=e("underscore"),i=e("../../util/extractElementFromEventUtil"),a=e("../../util/extractDataFromDraggable");e("jquery-ui/ui/widgets/droppable");var s=["drop","over","out","selector"],l=function(e,o){this.initialize(e,o)};n.extend(l.prototype,{initialize:function(e,o){n.bindAll(this,"_onDroppableMouseEnter","_onDroppableMouseLeave"),this.$lastDroppableEl=null,this.options=o,this._initEvents(e)},_initEvents:function(e){var o=this.options.selector;this.$wrappedElement=p(e),o?(this.$wrappedElement.on("mouseenter",o,this._onDroppableMouseEnter),this.$wrappedElement.on("mouseleave",o,this._onDroppableMouseLeave)):(this.$wrappedElement.on("mouseenter",this._onDroppableMouseEnter),this.$wrappedElement.on("mouseleave",this._onDroppableMouseLeave))},_onDroppableMouseEnter:function(e){var o=i.byCurrentTarget(e);this._destroyDroppable(),this.options.testFn(a())&&this._initializeDroppable(o)},_onDroppableMouseLeave:function(e){var o=i.byCurrentTarget(e);o.data("ui-droppable")&&r(o,"dropout"),this._destroyDroppable(o)},_initializeDroppable:function(e){this.droppableOptions=this._getDroppableOptions(),e.droppable(this.droppableOptions),e.droppable().on("drop",this.droppableOptions.onDrop),e.droppable().on("dropover",this.droppableOptions.onOver),e.droppable().on("dropout",this.droppableOptions.onOut),r(e,"dropover"),this.$lastDroppableEl=e},_getDroppableOptions:function(){var e=this.options.config,o=e.drop,t=e.over,r=e.out,p=n.extend({},n.omit(e,s));return o&&(p.onDrop=function(e,t){var r=t.helper.data("data");n.defer(function(){o(e,r)})}),t&&(p.onOver=t),r&&(p.onOut=r),p},_destroyDroppable:function(e){(e=e||this.$lastDroppableEl)&&e.data("ui-droppable")&&(e.droppable().off("drop",this.droppableOptions.onDrop),e.droppable().off("dropover",this.droppableOptions.onOver),e.droppable().off("dropout",this.droppableOptions.onOut),e.droppable("destroy"))},destroyDroppable:function(){this._destroyDroppable(),this.$wrappedElement.off("mouseenter",this._onDroppableMouseEnter),this.$wrappedElement.off("mouseleave",this._onDroppableMouseLeave)}}),t.exports={bind:function(e,o){var t=o.value,r=n.result(t,"selector"),p=t.test||function(){return!0},i={selector:r,testFn:p,config:t};e._droppable=new l(e,i)},unbind:function(e){e._droppable&&e._droppable.destroyDroppable()}}});