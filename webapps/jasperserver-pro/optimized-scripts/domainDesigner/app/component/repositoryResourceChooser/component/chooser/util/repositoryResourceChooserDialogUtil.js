/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/repositoryResourceChooserSearchResultModeEnum"],function(e,o,r){var s=e("../enum/repositoryResourceChooserSearchResultModeEnum");r.exports={isRepositoryTreeMode:function(e){return e===s.TREE},isResourcesListMode:function(e){return e===s.LIST}}});