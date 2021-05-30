/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./dataSourceMetadataTypesEnum","./genericTypesEnum"],function(e,E,t){var a=e("./dataSourceMetadataTypesEnum"),T=e("./genericTypesEnum"),n={};n[a.Byte]=T.INTEGER,n[a.Integer]=T.INTEGER,n[a.Long]=T.INTEGER,n[a.Double]=T.DECIMAL,n[a.Short]=T.INTEGER,n[a.Float]=T.DECIMAL,n[a.BigDecimal]=T.DECIMAL,n[a.BigInteger]=T.INTEGER,n[a.String]=T.STRING,n[a.Boolean]=T.BOOLEAN,n[a.Date]=T.DATE,n[a.Timestamp]=T.TIMESTAMP,n[a.Time]=T.TIME,t.exports=n});