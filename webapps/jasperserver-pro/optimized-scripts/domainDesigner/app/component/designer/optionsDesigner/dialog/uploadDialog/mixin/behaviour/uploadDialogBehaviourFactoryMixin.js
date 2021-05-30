/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../enum/uploadDialogTabEnum"],function(e,o,t){function n(e){var o=e.store;return{methods:{open:function(){return o.reset(),this.fetch({clearSelection:!0,resetSearchKeyword:!0,fileType:o.attributes.repositoryResourceChooser.fileType})},onRepositoryTabClick:function(){this.currentTab=r.REPOSITORY},onLocalFileTabClick:function(){this.currentTab=r.LOCAL_FILE},onSecondaryButtonClick:function(){this.$emit("close")}}}}var r=e("../../enum/uploadDialogTabEnum");t.exports={create:n}});