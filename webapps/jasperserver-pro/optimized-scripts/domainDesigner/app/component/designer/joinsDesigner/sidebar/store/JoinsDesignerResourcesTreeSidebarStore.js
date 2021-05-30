/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/util/SimpleModel"],function(e,i,t){var s=e("../../../../../../model/util/SimpleModel");t.exports=s.extend({setState:function(e){var i=e.viewState,t=i.getCurrentDesigner(),s=e.dataStore.joinTrees.size(),l=this.get("ownDesigner");this.set("isVisible",t===l&&0===s)},defaults:{isVisible:!1}})});