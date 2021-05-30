/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,o,i){function t(e){var o=e.store;return{methods:{onPrimaryButtonClick:function(e){e.stopPropagation(),this.isRepositoryTab?this._addFileFromRepository():this._addLocalFile()},onDoubleClick:function(){this.isPrimaryButtonDisabled||this._addFileFromRepository()},_addFileFromRepository:function(){var e,i=o.get("repositoryResourceChooser"),t=i.repositoryTree,s=i.resourcesList,n=r.cloneDeep(t.selection),d=r.cloneDeep(s.selection);this.isRepositoryTreeMode?e=this._getSelectedNodeUri(n):this.isResourcesListMode&&(e=this._getSelectedNodeUri(d)),this.$emit("addFromRepository",e),this.reset()},_addLocalFile:function(){var e=o.get("singleFileUpload"),i=r.cloneDeep(e.file);this.$emit("addLocalFile",i),this.reset()},_getSelectedNodeUri:function(e){return r.map(e,function(e,o){return o})[0]}}}}var r=e("underscore");i.exports={create:t}});