/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../view/BaseDataSourceView","underscore","bundle!all","../model/CustomDataSourceModel","text!../template/InternalDiagnosticTemplate.htm"],function(e,t,a){var r=e("../view/BaseDataSourceView"),n=e("underscore"),o=e("bundle!all"),l=e("../model/CustomDataSourceModel"),d=e("text!../template/InternalDiagnosticTemplate.htm");a.exports=r.extend({PAGE_TITLE_NEW_MESSAGE_CODE:"resource.datasource.jndi.page.title.new",PAGE_TITLE_EDIT_MESSAGE_CODE:"resource.datasource.jndi.page.title.edit",modelConstructor:l,render:function(){return this.$el.empty(),this.renderBlankBody(),this},renderBlankBody:function(){this.$el.append(n.template(d,{i18n:o}))}})});