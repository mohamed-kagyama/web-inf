/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../model/SingleSelectListModel","../../scalableList/view/ListWithNavigation"],function(e,t,i){var n=e("underscore"),o=e("../model/SingleSelectListModel"),l=e("../../scalableList/view/ListWithNavigation"),s=l.extend({events:n.extend({},l.prototype.events,{"mouseup li":"onMouseup"}),initialize:function(e){var t=e.model||new o(e);l.prototype.initialize.call(this,n.extend({model:t,lazy:!0,selection:{allowed:!0,multiple:!1}},e))},onMouseup:function(){this.trigger("item:mouseup")},activate:function(e){if(this.getCanActivate()){var t=this.getActiveValue();if(t&&t.index===e)return;this.model.once("selection:change",this._triggerSelectionChanged,this).activate(e)}}});i.exports=s});