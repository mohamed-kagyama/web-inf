/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../saveDialog/BaseSaveDialogView","../saveDialog/TextDataSourceSaveDialogView","../saveDialog/DomainSaveDialogView"],function(a,e,i){var o=a("../saveDialog/BaseSaveDialogView"),D=a("../saveDialog/TextDataSourceSaveDialogView"),v=a("../saveDialog/DomainSaveDialogView"),g={};g.textDataSource=D,g.domain=v,i.exports={getView:function(a){var e;return e=o,g[a]&&(e=g[a]),e}}});