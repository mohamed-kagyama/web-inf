/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","../../../../../common/component/validation/enum/messageTypesEnum"],function(e,n,i){var o=e("bundle!DomainDesignerBundle"),a=e("../../../../../common/component/validation/enum/messageTypesEnum");i.exports={create:function(){return{title:o["domain.designer.joinsDesigner.joinTree.dialog.rename"],inputLabel:o["domain.designer.joinsDesigner.joinTree.dialog.rename.inputLabel"],validationMessage:"",validationType:a.ERROR,value:"",originalValue:"",show:!1,focusInputOnShow:!0,selectValueOnShow:!0,joinTreeId:null}}}});