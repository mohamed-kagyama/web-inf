/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","../../scalableList/view/ListWithNavigation"],function(e,t,i){var l=e("jquery"),s=e("../../scalableList/view/ListWithNavigation"),a=s.extend({_multiSelect:function(e,t,i){l(e.target).hasClass("jr-mSelectlist-item-delete")?this.model.selectionContains(t,i)||this._singleSelect(e,t,i):s.prototype._multiSelect.call(this,e,t,i)}});i.exports=a});