/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,n,i){var t=e("underscore"),s=e("backbone"),o=function(e){this.initialize(e)};t.extend(o.prototype,{initialize:function(e){this.joinsDesignerEventBus=e.joinsDesignerEventBus,this.joinsDesignerSidebarSingleSelectStrategy=e.joinsDesignerSidebarSingleSelectStrategy,this._initEvents()},_initEvents:function(){this.listenTo(this.joinsDesignerEventBus,"sidebarContextMenu:show",this._onContextMenuShow)},_onContextMenuShow:function(e){this.joinsDesignerSidebarSingleSelectStrategy.execute(e)}},s.Events),i.exports=o});