/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/jrs-ui/src/scheduler/view/JobEditorView","runtime_dependencies/jrs-ui/src/scheduler/view/editor/ScheduleTabView","./editor/ParametersTabViewPro","./editor/OutputTabViewPro","./editor/NotificationsTabViewPro"],function(e,i,r){var t=e("runtime_dependencies/jrs-ui/src/scheduler/view/JobEditorView"),s=e("runtime_dependencies/jrs-ui/src/scheduler/view/editor/ScheduleTabView"),o=e("./editor/ParametersTabViewPro"),a=e("./editor/OutputTabViewPro"),d=e("./editor/NotificationsTabViewPro");r.exports=t.extend({_initializeTabs:function(e){var i={model:this.model,isDashboard:e.isDashboard,reportUri:e.reportUri,parentReportURI:e.parentReportURI};this.tabs.scheduleTab=new s(i),this.tabs.parametersTab=new o(i),this.tabs.outputTab=new a(i),this.tabs.notificationsTab=new d(i)}})});