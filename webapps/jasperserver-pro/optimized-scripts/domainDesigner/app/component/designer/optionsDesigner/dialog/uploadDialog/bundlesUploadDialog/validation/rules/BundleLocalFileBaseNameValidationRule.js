/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../../../../model/util/resourcePropertiesUtil"],function(e,i,n){var r=e("underscore"),s=e("bundle!DomainDesignerBundle"),t=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),l=e("../../../../../../../../model/util/resourcePropertiesUtil"),o=t.create(s),a=function(e){this.initialize(e)};r.extend(a.prototype,{initialize:function(e){r.bindAll(this,"validate"),this.clientResourcePropertiesService=e.clientResourcePropertiesService},validate:function(e,i){var n=this._getLocalFilesSourceFileName(e,i),s=r.reduce(e,function(e,i){var r=i.name;return l.isSameBundleBaseBase(r,n)?e.validFiles.push(i):e.invalidFiles.push(i),e},{invalidFiles:[],validFiles:[],errorMessage:o("domain.designer.advanced.options.bundlesUploadDialog.differentFileBaseName")},this);if(s.invalidFiles.length)return s},_getLocalFilesSourceFileName:function(e,i){var n=this.clientResourcePropertiesService.getBundles();return n[0]?this._getBundleName(n[0]):i[0]?i[0].name:e[0].name},_getBundleName:function(e){return l.getBundleName(e)}}),n.exports=a});