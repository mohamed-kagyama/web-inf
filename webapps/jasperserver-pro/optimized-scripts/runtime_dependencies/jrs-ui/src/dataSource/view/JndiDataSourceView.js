/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../view/BaseDataSourceView","../model/JndiDataSourceModel","text!../template/jndiSpecificTemplate.htm"],function(e,t,i){var n=e("underscore"),r=e("../view/BaseDataSourceView"),o=e("../model/JndiDataSourceModel"),c=e("text!../template/jndiSpecificTemplate.htm");i.exports=r.extend({PAGE_TITLE_NEW_MESSAGE_CODE:"resource.datasource.jndi.page.title.new",PAGE_TITLE_EDIT_MESSAGE_CODE:"resource.datasource.jndi.page.title.edit",modelConstructor:o,render:function(){return this.$el.empty(),this.renderJndiSpecificSection(),this.renderTimezoneSection(),this.renderTestConnectionSection(),this},renderJndiSpecificSection:function(){this.$el.append(n.template(c,this.templateData()))}})});