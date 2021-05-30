/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,t,n){var i=e("underscore"),s=e("backbone"),o=function(e){this.initialize(e)};i.extend(o.prototype,s.Events,{initialize:function(e){this.presentationDesignerEventBus=e.presentationDesignerEventBus,this.presentationDesignerSidebarSingleSelectStrategy=e.presentationDesignerSidebarSingleSelectStrategy,this._initEvents()},_initEvents:function(){this.listenTo(this.presentationDesignerEventBus,"sidebarContextMenu:show",this._onContextMenuShow)},_onContextMenuShow:function(e){this.presentationDesignerSidebarSingleSelectStrategy.execute(e)}}),n.exports=o});