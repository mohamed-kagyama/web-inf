/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","bundle!CommonBundle"],function(e,r,n){var o=e("bundle!DomainDesignerBundle"),a=e("bundle!CommonBundle");n.exports={create:function(e){return{errors:e||[],header:o["domain.designer.error.dialog.datasource.header"],confirmLabel:o["domain.designer.error.dialog.button.new.datasource"],confirmEvent:"errorDialog:selectDifferentDataSource",rejectLabel:a["button.cancel"],rejectEvent:"errorDialog:close"}}}});