/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var r=e("underscore"),s=e("bundle!DomainDesignerBundle"),d=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=d.create(s);i.exports={fn:function(e){if(!e||!r.str.trim(e))return o("domain.designer.presentationDesigner.validation.field.empty")}}});