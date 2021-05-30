/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","bundle!CommonBundle"],function(e,n,r){var o=e("bundle!DomainDesignerBundle"),i=e("bundle!CommonBundle");r.exports={create:function(e){return{errors:e||[],header:o["domain.designer.warning.dialog.securityError.header"],confirmLabel:i["button.close"],confirmEvent:"errorDialog:close",rejectLabel:"",rejectEvent:""}}}});