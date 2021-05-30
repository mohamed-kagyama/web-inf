/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var s=e("underscore"),d=e("bundle!DomainDesignerBundle"),r=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),l=r.create(d);i.exports={validate:function(e){var n=s.reduce(e,function(e,n){return n.content?e.validFiles.push(n):e.invalidFiles.push(n),e},{invalidFiles:[],validFiles:[],errorMessage:l("domain.designer.advanced.options.uploadDialog.emptyFilesContent")});if(n.invalidFiles.length)return n}}});