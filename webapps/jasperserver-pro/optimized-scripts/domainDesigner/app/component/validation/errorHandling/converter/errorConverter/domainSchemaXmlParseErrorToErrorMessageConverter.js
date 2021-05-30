/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var t=e("underscore"),s=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),i=e("../../enum/errorParametersKeysEnum"),o=e("../../util/extractPropertyByKeyUtil"),u=a.create(s);n.exports={convert:function(e){var r,n=o.extract(e.parameters,i.LINE_NUMBER),s=o.extract(e.parameters,i.COLUMN_NUMBER);return r=t.isEmpty(s)?"domain.designer.error.dialog.schema.xml.parse.error.unexpected.string.no.column":"domain.designer.error.dialog.schema.xml.parse.error.unexpected.string",u(r,n.value,s.value)}}});