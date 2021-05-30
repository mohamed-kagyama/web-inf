/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../model/schema/enum/genericTypesEnum"],function(e,n,r){function t(e){var n={},r=e.nullToNullLabelConverter,t=e.identityConverter,o=e.numberToStringConverter;return n[u.STRING]=[r,t],n[u.INTEGER]=[r,o],n[u.DECIMAL]=[r,o],n}var u=e("../../../../../../../model/schema/enum/genericTypesEnum");r.exports={create:function(e){return e=e||{},t(e)}}});