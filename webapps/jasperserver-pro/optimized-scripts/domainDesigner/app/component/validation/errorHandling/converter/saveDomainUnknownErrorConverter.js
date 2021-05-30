/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,r){var o=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),i=s.create(o);r.exports={convert:function(e,n){return n=n||{convertedErrors:[]},n.convertedErrors.length?[]:[{category:"",errorParameters:[i("domain.designer.save.domain.unknown.error.dialog.body")]}]}}});