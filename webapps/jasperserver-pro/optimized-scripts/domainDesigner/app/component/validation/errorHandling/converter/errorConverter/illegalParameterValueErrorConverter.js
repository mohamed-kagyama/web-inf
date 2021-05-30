/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,r,n){var i=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),a=s.create(i);n.exports={convert:function(e){var r=e.parameters?e.parameters:[],n=r[0]||'""',i=r[1]||'""';return a("domain.designer.error.illegal.parameter.value.error",n,i)}}});