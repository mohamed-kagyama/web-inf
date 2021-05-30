/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../scalableList/view/ListWithNavigation"],function(e,t,i){var s=e("../../scalableList/view/ListWithNavigation"),l={postProcessChunkModelItem:function(e,t){s.prototype.postProcessChunkModelItem.call(this,e,t),this.getTrueAll()&&(e.selected=!0)},setTrueAll:function(e,t){this.isTrueAll=e,this.setValue({},t)},getTrueAll:function(){return this.isTrueAll}};i.exports=l});