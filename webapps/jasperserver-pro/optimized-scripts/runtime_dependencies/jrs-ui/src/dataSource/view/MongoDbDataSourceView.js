/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../view/CustomDataSourceView","text!../template/mongoDbSpecificTemplate.htm"],function(e,t,o){var i=e("underscore"),n=e("../view/CustomDataSourceView"),r=e("text!../template/mongoDbSpecificTemplate.htm");o.exports=n.extend({PAGE_TITLE_NEW_MESSAGE_CODE:"resource.datasource.mongo.page.title.new",PAGE_TITLE_EDIT_MESSAGE_CODE:"resource.datasource.mongo.page.title.edit",render:function(){return this.$el.empty(),this.renderMongoDbSpecificSection(),this.renderTestConnectionSection(),this},renderMongoDbSpecificSection:function(){this.$el.append(i.template(r,this.templateData()))}})});