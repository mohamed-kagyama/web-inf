/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseListWithSelectionModel"],function(e,t,i){var n=e("underscore"),o=e("./BaseListWithSelectionModel"),s=o.extend({_addToSelection:function(e,t){this.selection[e]=!0},_removeFromSelection:function(e,t){delete this.selection[e]},_clearSelection:function(){this.selection={}},_selectionContains:function(e,t){return this.selection[e]},_getSelection:function(){return n.keys(this.selection)},select:function(e,t){if(this._clearSelection(),"string"==typeof e)this._addToSelection(e);else if(n.isArray(e))for(var i=0;i<e.length;i++)this._addToSelection(e[i]);else if(void 0!==e)for(var o in e)if(e.hasOwnProperty(o)){var s=e[o];void 0!==s&&this._addToSelection(s,o)}this._afterSelect&&this._afterSelect(e,t),this._triggerSelectionChange(t)}});i.exports=s});