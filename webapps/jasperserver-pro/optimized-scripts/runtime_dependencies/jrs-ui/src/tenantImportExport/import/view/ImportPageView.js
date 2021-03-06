/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","runtime_dependencies/js-sdk/src/jrs.configs","./ImportView","../../export/enum/exportTypesEnum"],function(e,i,t){var n=e("backbone"),o=e("runtime_dependencies/js-sdk/src/jrs.configs"),r=e("./ImportView"),s=e("../../export/enum/exportTypesEnum");t.exports=n.View.extend({events:{"click #importButton":"doImport"},initialize:function(){this.importView=new r,this.importView.render({tenantId:o.isProVersion?"organizations":null,type:o.isProVersion?s.SERVER_PRO:s.SERVER_CE}),this.$el.find(".body").append(this.importView.el),this.listenTo(this.importView.model,"validated",function(e){var i=this.$("#importButton"),t=e?null:"disabled";i.attr("disabled",t)},this)},doImport:function(){this.importView.doImport()}})});