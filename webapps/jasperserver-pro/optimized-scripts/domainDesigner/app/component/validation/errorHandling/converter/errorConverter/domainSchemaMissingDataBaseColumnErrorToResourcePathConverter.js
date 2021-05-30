/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,t){var u=e("../../enum/errorParametersKeysEnum"),a=e("../../util/extractPropertyByKeyUtil");t.exports={convert:function(e){return a.extract(e.parameters,u.RESOURCE_PATH).value}}});