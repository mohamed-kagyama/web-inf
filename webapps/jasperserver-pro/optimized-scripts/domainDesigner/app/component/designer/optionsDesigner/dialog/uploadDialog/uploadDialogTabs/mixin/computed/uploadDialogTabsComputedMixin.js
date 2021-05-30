/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../enum/uploadDialogTabEnum"],function(e,u,n){var o=e("../../../enum/uploadDialogTabEnum");n.exports={computed:{isRepositoryTab:function(){return this.currentTab===o.REPOSITORY},isLocalFileTab:function(){return this.currentTab===o.LOCAL_FILE}}}});