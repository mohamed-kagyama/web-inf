/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","./jQueryDatepickerExtension","./jQueryUiSliderAccessExtension","jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon"],function(e,n,i){var r=e("jquery");e("./jQueryDatepickerExtension"),e("./jQueryUiSliderAccessExtension"),e("jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon");var t=r.timepicker._newInst;r.timepicker._newInst=function(e,n){n.onChangeMonthYear||(n.onChangeMonthYear=function(e,n,i,r){i.currentYear=i.selectedYear,i.currentMonth=i.selectedMonth,i.currentDay=i.selectedDay,r._updateDateTime(i)});var i=t.call(r.timepicker,e,n),u=i._onTimeChange;return i._onTimeChange=function(){return this.$timeObj[0].setSelectionRange=null,u.apply(this,arguments)},i},i.exports=r});