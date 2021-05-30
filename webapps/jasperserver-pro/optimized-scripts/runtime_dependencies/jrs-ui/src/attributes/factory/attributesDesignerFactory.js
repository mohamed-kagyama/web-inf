/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../attributes/view/AttributesDesigner","../../attributes/enum/attributesTypesEnum","../../serverSettingsCommon/view/traits/buttonsTrait","../../attributes/view/trait/designerFilterTrait","../../attributes/view/trait/designerInheritedTrait","../../attributes/view/trait/designerPermissionTrait"],function(t,e,i){function r(t){var e={};return s.each(t,function(t){s.extend(e,t)}),e}var s=t("underscore"),n=t("../../attributes/view/AttributesDesigner"),a=t("../../attributes/enum/attributesTypesEnum"),u=t("../../serverSettingsCommon/view/traits/buttonsTrait"),o=t("../../attributes/view/trait/designerFilterTrait"),b=t("../../attributes/view/trait/designerInheritedTrait"),d=t("../../attributes/view/trait/designerPermissionTrait"),v={};v[a.SERVER]=[u,d],v[a.TENANT]=[o,b,d],v[a.USER]=[o,b],i.exports=function(t,e){return new(n.extend(r(v[t])))(e)}});