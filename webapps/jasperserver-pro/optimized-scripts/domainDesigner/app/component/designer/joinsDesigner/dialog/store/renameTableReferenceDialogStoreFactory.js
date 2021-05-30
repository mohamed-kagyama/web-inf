/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","../../../../../common/component/validation/enum/messageTypesEnum"],function(e,n,i){var a=e("bundle!DomainDesignerBundle"),o=e("../../../../../common/component/validation/enum/messageTypesEnum");i.exports={create:function(){return{title:a["domain.designer.joinsDesigner.dialog.renameTable"],inputLabel:a["domain.designer.joinsDesigner.dialog.renameTable.inputLabel"],validationMessage:"",validationType:o.ERROR,value:"",originalValue:"",show:!1,focusInputOnShow:!0,selectValueOnShow:!0,tableReferenceId:null}}}});