/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle"],function(e,r,n){var o=e("bundle!DomainDesignerBundle");n.exports={create:function(e){return{errors:e||[],header:o["domain.designer.error.dialog.validation.alert"],confirmEvent:"errorDialog:toRepository",confirmLabel:o["domain.designer.error.dialog.button"],rejectLabel:"",rejectEvent:""}}}});