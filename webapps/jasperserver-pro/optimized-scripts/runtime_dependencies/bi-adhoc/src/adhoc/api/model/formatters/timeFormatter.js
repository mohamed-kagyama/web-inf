/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","momentExtension","./formatsMappingUtil","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,n,t){function r(e){return parseInt(o(e).format("HH"))>=12?"\u4e0b\u5348":"\u4e0a\u5348"}function o(e){return i(e).locale(a.userLocale).tz(a.userTimezone)}function s(e){return/T/.test(e)?e:"1970-01-01T"+e}var i=e("momentExtension"),u=e("./formatsMappingUtil"),a=e("runtime_dependencies/js-sdk/src/jrs.configs");t.exports={format:function(e,n,t){return u.isNullOrEmpty(e)?"":u.isOtherNode(e)?e:u.shouldBeReturnedAsLocalazedDayOfWeek(t)?u.getLocalizedDayOfWeek(e):(n=u.getFormatForMoment(n,t),n?(/^zh/.test(a.userLocale)&&(n=n.replace("A",r(s(e)))),e=t&&t.ignoreTimezone?u.setToUserTimezone(e):u.ensureTimezone(e),o(s(e)).format(n)):e)}}});