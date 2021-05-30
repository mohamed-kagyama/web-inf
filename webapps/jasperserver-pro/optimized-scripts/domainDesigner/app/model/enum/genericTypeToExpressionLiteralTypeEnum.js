/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./expressionsEnum","../../../model/schema/enum/genericTypesEnum"],function(e,r,n){var o=(e("underscore"),e("./expressionsEnum")),m=e("../../../model/schema/enum/genericTypesEnum"),s={};s[m.INTEGER]=o.operators.number.name,s[m.DECIMAL]=o.operators.number.name,s[m.STRING]=o.operators.string.name,s[m.BOOLEAN]=o.operators.boolean.name,s[m.DATE]=o.operators.date.name,s[m.TIMESTAMP]=o.operators.timestamp.name,s[m.TIME]=o.operators.time.name,n.exports=s});