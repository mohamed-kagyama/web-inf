/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel","settings!globalConfiguration"],function(e,o,r){var i=e("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel"),s=e("settings!globalConfiguration");i.settings.NAME_NOT_SUPPORTED_SYMBOLS=s.resourceIdNotSupportedSymbols.slice(1,s.resourceIdNotSupportedSymbols.length-1),r.exports=i});