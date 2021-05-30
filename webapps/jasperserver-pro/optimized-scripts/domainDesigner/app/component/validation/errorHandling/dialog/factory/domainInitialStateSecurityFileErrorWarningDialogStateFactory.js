/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","bundle!CommonBundle"],function(e,n,r){var i=e("bundle!DomainDesignerBundle"),o=e("bundle!CommonBundle");r.exports={create:function(){return{header:i["domain.designer.warning.dialog.securityError.header"],warnings:[{category:{label:i["domain.designer.warning.dialog.securityError.category"],isBold:!1}}],confirmLabel:i["domain.designer.warning.dialog.securityError.confirm"],confirmEvent:"securityFileErrorWarningDialog:continue",rejectLabel:o["button.cancel"],rejectEvent:"securityFileErrorWarningDialog:cancel"}}}});