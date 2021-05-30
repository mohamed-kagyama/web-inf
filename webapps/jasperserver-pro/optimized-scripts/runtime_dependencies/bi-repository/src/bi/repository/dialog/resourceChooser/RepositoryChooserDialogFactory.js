/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./view/RepositoryItemChooserDialogView","./view/RepositoryFolderChooserDialogView"],function(e,o,i){var r=e("./view/RepositoryItemChooserDialogView"),t=e("./view/RepositoryFolderChooserDialogView"),s={item:r,folder:t};i.exports={getDialog:function(e){var o;return o=r,s[e]&&(o=s[e]),o}}});