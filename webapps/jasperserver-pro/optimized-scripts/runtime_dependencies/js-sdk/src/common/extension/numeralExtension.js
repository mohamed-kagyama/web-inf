/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","numeral/numeral","../../jrs.configs","bundle!jasperserver_config","numeral/locales"],function(e,l,r){var a=(e("underscore"),e("numeral/numeral")),c=e("../../jrs.configs"),s=e("bundle!jasperserver_config");e("numeral/locales");var n=c.userLocale,o=n.toLowerCase().replace("_","-");try{a.locale(o),a.localeData(o)}catch(e){o="en",a.locale(o)}a.localeData(o).currency.symbol=s["client.currency.symbol"],a.localeData(o).delimiters.thousands=s["client.delimiters.thousands"],a.localeData(o).delimiters.decimal=s["client.delimiters.decimal"],r.exports=a});