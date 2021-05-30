/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../../model/schema/enum/dataSourceMetadataTypesEnum"],function(e,n,a){var s=e("underscore"),d=e("bundle!DomainDesignerBundle"),r=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),i=e("../../../../../../model/schema/enum/dataSourceMetadataTypesEnum"),u=r.create(d),t=s.values(i);a.exports={validate:function(e){if(!s.contains(t,e.type))return u("domain.designer.derivedTables.createDerivedTables.dialog.input.query.result.cant.parse")}}});