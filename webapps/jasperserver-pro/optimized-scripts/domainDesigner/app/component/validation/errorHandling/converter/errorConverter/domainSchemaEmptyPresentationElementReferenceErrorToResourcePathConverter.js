/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,t){var a=e("../../enum/errorParametersKeysEnum"),u=e("../../util/extractPropertyByKeyUtil");t.exports={convert:function(e){var r=u.extract(e.parameters,a.DATA_ISLAND_NAME),t=u.extract(e.parameters,a.HIERARCHICAL_NAME);return[r.value,t.value].join(".")}}});