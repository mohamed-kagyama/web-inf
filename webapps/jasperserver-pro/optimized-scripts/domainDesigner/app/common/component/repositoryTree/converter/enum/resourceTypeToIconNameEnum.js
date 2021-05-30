/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes","../../../../../component/enum/treeItemIconClassEnum"],function(e,r,o){var E=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"),_=e("../../../../../component/enum/treeItemIconClassEnum"),n={},s=_.DATA_SOURCE;n[E.FOLDER]=_.FOLDER,n[E.JDBC_DATA_SOURCE]=s,n[E.AWS_DATA_SOURCE]=s,n[E.AZURE_SQL_DATA_SOURCE]=s,n[E.JNDI_DATA_SOURCE]=s,n[E.VIRTUAL_DATA_SOURCE]=s,n[E.CUSTOM_DATA_SOURCE]=s,n[E.BEAN_DATA_SOURCE]=s,n[E.BUNDLE_FILE]=_.BUNDLE_FILE,n[E.SECURITY_FILE]=_.SECURITY_FILE,o.exports=n});