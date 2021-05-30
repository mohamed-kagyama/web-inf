/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./domainSecurityMissingElementErrorToErrorListConverter","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,r,n){var i=(e("underscore"),e("./domainSecurityMissingElementErrorToErrorListConverter")),o=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=s.create(o);n.exports={convert:function(e){var r=i.convert(e).join(", ");return t("domain.designer.error.dialog.domain.security.missing.element.error.template",r)}}});