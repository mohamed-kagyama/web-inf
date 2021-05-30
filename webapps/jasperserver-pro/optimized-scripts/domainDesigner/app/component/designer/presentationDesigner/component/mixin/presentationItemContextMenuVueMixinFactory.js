/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/util/entityUtil"],function(e,t,n){var i=e("../../../../../../model/schema/util/entityUtil");n.exports={create:function(e){var t=e.presentationItemsContextMenu,n=e.presentationDesignerEventBus;return{methods:{showContextMenu:function(e,o){var s=e.type;(i.isDataIsland(s)||i.isPresentationSet(s))&&(n.trigger("presentationItem:select",e),t.show({left:o.pageX,top:o.pageY}))}}}}}});