/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseComponentModel","../enum/jiveTypes"],function(e,o,r){var n=e("underscore"),s=e("./BaseComponentModel"),t=e("../enum/jiveTypes");r.exports=s.extend({defaults:function(){return{bookmarks:[],id:void 0,type:t.BOOKMARKS}},constructor:function(e,o){o||(o={}),o.parse||(o=n.extend({},o,{parse:!0})),s.call(this,e,o)},parse:function(e){return e.bookmarks=this._processBookmarks(e.bookmarks),e},_processBookmarks:function(e){if(e){var o=this;return n.map(e,function(e){return{anchor:e.label,page:e.pageIndex+1,bookmarks:o._processBookmarks(e.bookmarks)}})}return null}})});