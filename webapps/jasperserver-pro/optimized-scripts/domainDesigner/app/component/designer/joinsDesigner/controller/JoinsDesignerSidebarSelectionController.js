/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,i,t){var n=e("underscore"),s=e("backbone"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.joinsDesignerEventBus=e.joinsDesignerEventBus,this.joinsDesignerSidebarSingleSelectStrategy=e.joinsDesignerSidebarSingleSelectStrategy,this._initEvents()},_initEvents:function(){this.listenTo(this.joinsDesignerEventBus,"sidebar:selectItem",this.selectItem)},selectItem:function(e){this.joinsDesignerSidebarSingleSelectStrategy.execute(e)}},s.Events),t.exports=r});