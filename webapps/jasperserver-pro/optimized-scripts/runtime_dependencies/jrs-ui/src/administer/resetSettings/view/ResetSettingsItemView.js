/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/component/baseTable/childView/BaseRow","text!../templates/itemViewTemplate.htm","../../../serverSettingsCommon/behaviors/DeleteConfirmBehavior"],function(e,t,o){var s=e("underscore"),r=e("runtime_dependencies/js-sdk/src/common/component/baseTable/childView/BaseRow"),i=e("text!../templates/itemViewTemplate.htm"),m=e("../../../serverSettingsCommon/behaviors/DeleteConfirmBehavior"),a=r.extend({tagName:"div",className:"table-row",template:s.template(i),behaviors:s.extend(r.prototype.behaviors,{DeleteConfirm:{behaviorClass:m}})});o.exports=a});