/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu","bundle!DashboardBundle","text!../../template/toolbarTemplate.htm"],function(e,t,o){var i=e("backbone"),n=e("underscore"),s=e("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu"),l=e("bundle!DashboardBundle"),r=e("text!../../template/toolbarTemplate.htm");o.exports=i.View.extend({el:n.template(r,{i18n:l}),events:{"click #undo":"runUndo","click #undoAll":"runUndoAll","click #redo":"runRedo","click #filterPopup":"toggleFilterPopupDialog","click #back":"goBack"},initialize:function(){this.exportMenu=new s([{label:"PNG",action:"png"},{label:"PDF",action:"pdf"},{label:"DOCX",action:"docx"},{label:"ODT",action:"odt"},{label:"PPTX",action:"pptx"}],this.$("#export")),this.listenTo(this.exportMenu,"all",function(e){0===e.indexOf("option:")&&(this.exportMenu.hide(),this.exportDashboard(e.substring("option:".length)))},this),this.filterPopupIsVisible=!1,this.listenTo(this,"filterButtonStyle:open",this.openFilterPopupDialog),this.listenTo(this,"filterButtonStyle:close",this.closeFilterPopupDialog),this.setVisibility({back:/dashboard\/viewer/.test(window.location.href)&&/_ddHyperlink=\d+/.test(window.location.href)&&!/noReturn=true/.test(window.location.href)})},remove:function(){this.exportMenu.remove(),i.View.prototype.remove.apply(this,arguments)},setTitle:function(e){this.$(".header .title").text(e)},toggleFilterPopupDialog:function(){this.trigger("button:filterPopup"),this.filterPopupIsVisible?this.closeFilterPopupDialog():this.openFilterPopupDialog()},goBack:function(){this.trigger("button:back")},openFilterPopupDialog:function(){this.$("#filterPopup").addClass("pressed").addClass("down"),this.filterPopupIsVisible=!0},closeFilterPopupDialog:function(){this.$("#filterPopup").removeClass("pressed").removeClass("down"),this.filterPopupIsVisible=!1},setVisibility:function(e){var t=this;n.each(n.keys(e),function(o){var i=t.$("#"+o),n=i.parent().prev();i[e[o]?"removeClass":"addClass"]("hidden"),n.hasClass("separator")&&n[e[o]?"show":"hide"]()})},setEnabled:function(e){var t=this;n.each(n.keys(e),function(o){e[o]?t.$("#"+o).attr("disabled",!1):t.$("#"+o).removeClass("over").attr("disabled",!0)})},exportDashboard:function(e){this.trigger("button:export",e)},runUndo:function(){this.trigger("button:undo")},runUndoAll:function(){this.trigger("button:undoAll")},runRedo:function(){this.trigger("button:redo")}})});