/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,t,n){n.exports={create:function(e){var t=e.presentationDesignerEventBus;return{methods:{selectItem:function(e,n){n.shiftKey||n.ctrlKey||n.metaKey||t.trigger("presentationItem:select",e)},addToRangeSelection:function(e){t.trigger("presentationItem:addToSelectionRange",e)},toggleItemSelection:function(e){t.trigger("presentationItem:toggleSelection",e)}}}}}});