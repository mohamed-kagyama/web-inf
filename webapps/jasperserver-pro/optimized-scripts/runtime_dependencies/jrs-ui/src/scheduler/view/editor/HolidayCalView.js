/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","bundle!all","backbone","text!../../template/editor/holidayCalendarTemplate.htm"],function(e,t,a){var i=e("jquery"),l=e("underscore"),n=e("bundle!all"),d=e("backbone"),r=e("text!../../template/editor/holidayCalendarTemplate.htm");a.exports=d.View.extend({initialize:function(){this.listenTo(this.collection,"reset change",this.render)},render:function(){var e=i(l.template(r,{i18n:n}));this.$el.empty().append(e);var t=this.$el.find(".calendarBlock"),a=this.$el.find("[name=calendarSelect]");t.removeClass("disabled").find("select").attr("disabled",!1),a.empty("");var d;return 0===this.collection.size()?(d=i("<option>").attr("value","").text(n["report.scheduling.job.edit.trigger.calendars.nocalendars"]),a.append(d),t.addClass("disabled").find("select").attr("disabled","disabled"),this):(d=i("<option>").attr("value","").text(n["label.none"]),a.append(d),this.collection.forEach(function(e){d=i("<option>").attr("value",e.id).text(e.id),a.append(d)}),this)}})});