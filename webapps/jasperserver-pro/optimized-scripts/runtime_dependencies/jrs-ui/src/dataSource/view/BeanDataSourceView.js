/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../view/BaseDataSourceView","../model/BeanDataSourceModel","text!../template/beanSpecificTemplate.htm"],function(e,t,a){var n=e("underscore"),r=e("../view/BaseDataSourceView"),i=e("../model/BeanDataSourceModel"),o=e("text!../template/beanSpecificTemplate.htm");a.exports=r.extend({PAGE_TITLE_NEW_MESSAGE_CODE:"resource.datasource.bean.page.title.new",PAGE_TITLE_EDIT_MESSAGE_CODE:"resource.datasource.bean.page.title.edit",modelConstructor:i,render:function(){return this.$el.empty(),this.renderBeanSpecificSection(),this.renderTestConnectionSection(),this},renderBeanSpecificSection:function(){this.$el.append(n.template(o,this.templateData()))}})});