/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/util/SimpleModel","bundle!DomainDesignerBundle"],function(e,n,d){var o=e("../../../../../../model/util/SimpleModel"),i=e("bundle!DomainDesignerBundle");d.exports=o.extend({defaults:function(){return{isSaveEnabled:!1,undo:!1,redo:!1,labels:{save:i["domain.designer.menu.save"],export:i["domain.designer.menu.export"],import:i["domain.designer.menu.import"],undo:i["domain.designer.menu.undo"],redo:i["domain.designer.menu.redo"],undoAll:i["domain.designer.menu.undoAll"]}}}})});