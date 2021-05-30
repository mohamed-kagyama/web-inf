/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../../model/schema/enum/genericTypesEnum","settings!dateTimeSettings"],function(e,t,r){var i=e("../../../../../../../../model/schema/enum/genericTypesEnum"),m=e("settings!dateTimeSettings");r.exports={create:function(e){var t=e.dataType,r={el:".jr-jDateTimeInput",showOn:"",onSelect:e.onSelect,trigger:".jr-jDateTimePickerTrigger"};return t===i.TIME?r.timeFormat=m.timepicker.timeFormat:t===i.TIMESTAMP?(r.dateFormat=m.datepicker.dateFormat,r.timeFormat=m.timepicker.timeFormat):t===i.DATE&&(r.dateFormat=m.datepicker.dateFormat),r}}});