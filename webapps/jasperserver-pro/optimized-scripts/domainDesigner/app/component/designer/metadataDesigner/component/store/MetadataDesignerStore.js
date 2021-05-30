/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/util/SimpleModel","../../../../../common/component/enum/placementsEnum","bundle!CommonBundle"],function(e,o,t){var n=e("../../../../../../model/util/SimpleModel"),r=e("../../../../../common/component/enum/placementsEnum"),u=e("bundle!CommonBundle");t.exports=n.extend({defaults:function(){return{isSourceTreeInvalid:!1,popoverType:"error",popoverTitle:u["error.title"],popoverPlacement:r.RIGHT_TOP,popoverText:"",popoverOffset:{top:0,left:0},ownDesigner:"",currentDesigner:"",schemaAttributeInput:{isVisible:!1,attribute:"",parentId:"",dataSourceGroupId:"",error:""},resourceInfo:{availableResourcesTitle:"",selectedResourcesTitle:"",manageResource:"",dataObjectName:"",instructionText:"",instructionTitle:""}}}})});