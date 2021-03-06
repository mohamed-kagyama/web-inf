/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!AttributeBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../attributes/enum/validationRulesEnum"],function(e,t,n){var r=e("bundle!AttributeBundle"),i=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),u=e("../../../attributes/enum/validationRulesEnum"),s=i.extend({bundle:r});n.exports=[{required:!0,msg:new s("attributes.error.attribute.name.empty")},{maxLength:u.MAX_ATTRIBUTE_NAME_LENGTH,msg:new s("attributes.error.attribute.name.too.long",u.MAX_ATTRIBUTE_NAME_LENGTH)},{doesNotContainSymbols:"\\\\/",msg:new s("attributes.error.attribute.name.invalid")}]});