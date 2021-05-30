/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../common/mixin/droppable/droppableViewMixin"],function(e,r,o){var n=e("underscore"),i=e("../../../../../../common/mixin/droppable/droppableViewMixin");o.exports={create:function(e){var r=e.accept;return{created:function(){this.droppable={el:":el",drop:"drop",accept:r,tolerance:"pointer"}},methods:n.extend({drop:function(e,r){this.$emit("drop",this.processResources(r))},processResources:function(e){return e=n.isArray(e)?e:[e],n.map(e,function(e){return n.cloneDeep(e.resource)})}},i)}}}});