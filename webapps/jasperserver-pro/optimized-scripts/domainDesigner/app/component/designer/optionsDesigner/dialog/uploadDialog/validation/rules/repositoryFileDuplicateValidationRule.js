/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../../model/util/resourcePropertiesUtil","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,i,r){var n=e("underscore"),s=e("../../../../../../../model/util/resourcePropertiesUtil"),l=e("bundle!DomainDesignerBundle"),d=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),u=d.create(l);r.exports={validate:function(e){var i=n.reduce(e,function(i,r,l){var d=r.uri,u=s.parseFileNameFromUrl(d);return n.find(e,function(e,i){if(l>i)return s.parseFileNameFromUrl(e.uri)===u})?i.invalidFiles.push(r):i.validFiles.push(r),i},{invalidFiles:[],validFiles:[],errorMessage:u("domain.designer.advanced.options.uploadDialog.duplicateFileName")},this);if(i.invalidFiles.length)return i}}});