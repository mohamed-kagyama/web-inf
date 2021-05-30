/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","bundle!CommonBundle"],function(e,a,n){var d=e("bundle!DomainDesignerBundle"),o=e("bundle!CommonBundle");n.exports={create:function(){return{header:d["domain.designer.advanced.options.updateSchemaDialog.subTitle"],warnings:[{category:{label:d["domain.designer.advanced.options.updateSchemaDialog.dependencies.message"],isBold:!1}},{category:{label:d["domain.designer.advanced.options.updateSchemaDialog.actions.message"],isBold:!1}}],confirmLabel:d["domain.designer.advanced.options.updateSchemaDialog.actions.updateSchema"],confirmEvent:"updateSavedSchemaWarningDialog:update",rejectLabel:o["button.cancel"],rejectEvent:"updateSavedSchemaWarningDialog:cancel"}}}});