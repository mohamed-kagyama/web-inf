/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","bundle!CommonBundle"],function(e,r,n){var o=(e("underscore"),e("bundle!DomainDesignerBundle")),d=e("bundle!CommonBundle");n.exports={create:function(e){return{errors:e||[],header:o["domain.designer.upload.schema.error.dialog.header"],confirmLabel:d["button.close"],confirmEvent:"errorDialog:close",rejectLabel:"",rejectEvent:""}}}});