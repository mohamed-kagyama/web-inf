/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,t){var n=e("underscore"),u=e("../../enum/errorParametersKeysEnum"),o=e("../../util/extractPropertyByKeyUtil");t.exports={convert:function(e){return n.map(e,function(e){return o.extract(e.parameters,u.ELEMENT_NAME).value})}}});