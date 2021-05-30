/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,r){var s=e("underscore"),i=e("bundle!DomainDesignerBundle"),o=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),u=o.create(i);r.exports={convert:function(e){var n=s.first(e),r=s.first(n.parameters),i=n.parameters[1];return u("referenced.resource.not.found",r,i)}}});