/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/jrs.configs","jquery","underscore","settings!dateTimeSettings","runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker"],function(e,s,n){var i=e("runtime_dependencies/js-sdk/src/jrs.configs"),t=e("jquery"),r=e("underscore"),c=e("settings!dateTimeSettings"),d=e("runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker"),a=function(e,s){var n="en";return e&&(r.contains(s,e)?n=e:r.contains(s,e.substring(0,2))&&(n=e.substring(0,2))),n.replace("_","-")}(i.userLocale,i.avaliableLocales);d.setDefaults({locale:a,date:c.datepicker,time:c.timepicker}),n.exports=t});