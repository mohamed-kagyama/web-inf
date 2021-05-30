/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./expressionsEnum","../../../model/schema/enum/genericTypesEnum"],function(e,n,m){var s=(e("underscore"),e("./expressionsEnum")),a=e("../../../model/schema/enum/genericTypesEnum"),r=s.castFunctions,o={};o[a.INTEGER]=r.Integer.name,o[a.DECIMAL]=r.Decimal.name,o[a.BOOLEAN]=r.Boolean.name,o[a.DATE]=r.Date.name,o[a.TIME]=r.Time.name,o[a.TIMESTAMP]=r.Timestamp.name,m.exports=o});