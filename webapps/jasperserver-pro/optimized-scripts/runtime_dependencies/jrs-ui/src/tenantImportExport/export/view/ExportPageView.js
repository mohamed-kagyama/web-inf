/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","./ExportView","runtime_dependencies/js-sdk/src/jrs.configs","../enum/exportTypesEnum"],function(e,t,i){var n=e("backbone"),o=e("./ExportView"),r=e("runtime_dependencies/js-sdk/src/jrs.configs"),s=e("../enum/exportTypesEnum");i.exports=n.View.extend({events:{"click #exportButton":"doExport"},initialize:function(){this.exportView=new o,this.exportView.render({type:r.isProVersion?s.SERVER_PRO:s.SERVER_CE,tenantId:r.isProVersion?"organizations":null}),this.$el.find(".body").append(this.exportView.el),this.listenTo(this.exportView.model,"validated",function(e){var t=this.$("#exportButton"),i=e?null:"disabled";t.attr("disabled",i)},this)},doExport:function(){this.exportView.doExport()}})});