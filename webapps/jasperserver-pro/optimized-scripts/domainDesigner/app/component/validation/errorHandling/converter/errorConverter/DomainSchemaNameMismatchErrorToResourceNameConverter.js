/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var s=e("underscore"),t=e("bundle!DomainDesignerBundle"),i=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),m=e("../../enum/errorParametersKeysEnum"),o=e("../../util/extractPropertyByKeyUtil"),a=i.create(t),c=function(e){this.missingSchemasConverter=e.missingSchemasConverter};s.extend(c.prototype,{convert:function(e){e=s.isArray(e)?e:[e];var r=s.first(e),n=o.extract(r.parameters,m.DOMAIN_SCHEMA_NAME);return s.isEmpty(n)?a("domain.designer.error.dialog.schema.name.mismatch.empty"):this.missingSchemasConverter.convert(e)}}),n.exports=c});