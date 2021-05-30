/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./dataSourceMetadataTypesEnum"],function(e,a,m){var n=e("./dataSourceMetadataTypesEnum"),i={};i[n.Double]={min:-1/0,max:1/0},i[n.BigDecimal]={min:-1/0,max:1/0},i[n.BigInteger]={min:-1/0,max:1/0},i[n.Long]={min:-1/0,max:1/0},i[n.Float]={min:1.401298464324817e-45,max:3.4028234663852886e38},i[n.Integer]={min:-2147483648,max:2147483647},i[n.Short]={min:-32768,max:32767},i[n.Byte]={min:-128,max:127},m.exports=i});