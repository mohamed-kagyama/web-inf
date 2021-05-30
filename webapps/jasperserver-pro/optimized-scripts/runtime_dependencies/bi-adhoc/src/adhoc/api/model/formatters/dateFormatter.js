/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","momentExtension","./formatsMappingUtil","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,t,n){function s(e){return c(e).locale(i.userLocale)}function o(e){return/Q1/.test(e)?e.slice(0,4).concat("-01-05T01:32:21.196Z"):/Q2/.test(e)?e.slice(0,4).concat("-04-05T01:32:21.196Z"):/Q3/.test(e)?e.slice(0,4).concat("-07-05T01:32:21.196Z"):/Q4/.test(e)?e.slice(0,4).concat("-10-05T01:32:21.196Z"):/^\d{4}$/.test(e)?e.concat("-01-05T01:32:21.196Z"):e}var c=e("momentExtension"),r=e("./formatsMappingUtil"),i=e("runtime_dependencies/js-sdk/src/jrs.configs");n.exports={format:function(e,t,n){return r.isNullOrEmpty(e)?"":r.isOtherNode(e)?e:r.shouldBeReturnedAsLocalazedDayOfWeek(n)?r.getLocalizedDayOfWeek(e):(t=r.getFormatForMoment(t,n),t?s(o(e)).format(t):e)}}});