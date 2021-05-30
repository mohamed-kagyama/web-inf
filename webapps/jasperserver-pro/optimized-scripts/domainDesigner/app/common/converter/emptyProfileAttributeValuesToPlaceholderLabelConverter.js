/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,r){var i=(e("underscore"),e("bundle!DomainDesignerBundle")),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),l=s.create(i);r.exports=function(e){return""===e.label&&(e.label=l("domain.designer.sidebar.empty.profile.attribute.value.placeholder"),e.labelClass="jr-uItalic"),e}});