/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./SingleSelectListModel","../../scalableList/model/ListWithSelectionAsObjectHashModel"],function(e,t,o){var l=e("./SingleSelectListModel"),i=e("../../scalableList/model/ListWithSelectionAsObjectHashModel"),c=i.prototype,n=l.extend({_addToSelection:c._addToSelection,_removeFromSelection:c._removeFromSelection,_clearSelection:c._clearSelection,_selectionContains:c._selectionContains,_getSelection:c._getSelection,_calcSelectionStartIndex:void 0,_select:c.select});o.exports=n});