/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","backbone","runtime_dependencies/js-sdk/src/jrs.configs","../../scheduler/model/HolidayCal"],function(e,n,r){var s=e("jquery"),d=e("backbone"),a=e("runtime_dependencies/js-sdk/src/jrs.configs"),c=e("../../scheduler/model/HolidayCal");r.exports=d.Collection.extend({url:a.contextPath+"/rest_v2/jobs/calendars",model:c,parse:function(e){var n=[];return e&&e.calendarName&&s.each(e.calendarName,function(e,r){n.push({id:r})}),n}})});