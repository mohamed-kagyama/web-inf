/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker"],function(e,i,t){function s(e){this.view.pickers.forEach(function(i){i.$el.prop("id")==e&&i.remove()}),this.view.pickers=this.view.pickers.filter(function(i){return e!=i.$el.prop("id")})}var r=e("runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker");t.exports=function(e,i){var t=this.view.viewModel.previous("dataType"),n=this.view.viewModel.get("calendarPatterns");this.view.pickers||(this.view.pickers=[]),t!=i&&("date"!==t&&"time"!==t||s.call(this,e.prop("id")),"date"===i?this.view.pickers.push(new r({el:e[0],dateFormat:n.date,timeFormat:n.time,skipMoving:!0})):"time"===i&&this.view.pickers.push(new r({el:e[0],timeFormat:n.time,skipMoving:!0})))}});