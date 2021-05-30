/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,o){function r(e){var t=e.store,o=e.repositoryResourceChooserStateActions,r=e.repositoryResourceChooserStateMutations;return{methods:{open:function(e){var t=this;return e=e||{},this.fetch({clearSelection:!0,resetSearchKeyword:!0}).then(function(){r.setResourcesListState({selection:e.listSelection||{}})}).then(function(){t.$nextTick(function(){r.setResourcesListState({scrollPos:t._getSelectedItemScrollPos()})})})},confirmSelection:function(){var e=this,t=o.getCurrentModeSelection(),r=i.first(t);r&&this.isConfirmationActive&&e.$emit("confirm",r)},rejectSelection:function(){this.$emit("reject")},_getSelectedItemScrollPos:function(){var e=t.get("repositoryResourceChooser"),o=e.resourcesList.itemHeight,r=e.resourcesList.nodes,s=e.resourcesList.selection,n=0;return i.find(r,function(e,t){if(s[e.id])return n=t,e}),o*n}}}}var i=e("underscore");o.exports={create:r}});