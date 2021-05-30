/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","bundle!CommonBundle"],function(e,n,r){var o=(e("underscore"),e("bundle!DomainDesignerBundle")),d=e("bundle!CommonBundle");r.exports={create:function(e){return{errors:e||[],header:o["domain.designer.error.dialog.schema.header"],confirmLabel:o["domain.designer.error.dialog.button.continue"],confirmEvent:"errorDialog:continueMapSchemas",rejectLabel:d["button.cancel"],rejectEvent:"errorDialog:close"}}}});