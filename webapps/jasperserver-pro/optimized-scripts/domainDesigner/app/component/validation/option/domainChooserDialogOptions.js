/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes","bundle!DomainDesignerBundle","text!../template/domainSourceTreeItemsTemplate.htm"],function(e,r,t){var o=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"),i=e("bundle!DomainDesignerBundle"),s=e("text!../template/domainSourceTreeItemsTemplate.htm");t.exports={title:i["domain.designer.domainChooserDialog.title"],treeItemsTemplate:s,resourcesTypeToSelect:[o.SEMANTIC_LAYER_DATA_SOURCE],resourcesTypeToSelectTree:[o.SEMANTIC_LAYER_DATA_SOURCE]}});