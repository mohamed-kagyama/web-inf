/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./fieldTypeCategoryEnum","./dataSourceMetadataTypesEnum"],function(e,t,a){var E=e("./fieldTypeCategoryEnum"),o=e("./dataSourceMetadataTypesEnum"),r={};r[o.Byte]=E.NUMBER,r[o.Integer]=E.NUMBER,r[o.Long]=E.NUMBER,r[o.Double]=E.NUMBER,r[o.Short]=E.NUMBER,r[o.Float]=E.NUMBER,r[o.BigDecimal]=E.NUMBER,r[o.BigInteger]=E.NUMBER,r[o.String]=E.STRING,r[o.Boolean]=E.BOOLEAN,r[o.Date]=E.TIME,r[o.Timestamp]=E.TIME,r[o.Time]=E.TIME,a.exports=r});