/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseDataSourceModel","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes","../enum/connectionTypes","bundle!jasperserver_messages"],function(e,r,o){var n=e("underscore"),t=e("./BaseDataSourceModel"),s=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"),i=e("../enum/connectionTypes"),a=e("bundle!jasperserver_messages");o.exports=t.extend({type:s.JNDI_DATA_SOURCE,defaults:function(){var e={};return n.extend(e,t.prototype.defaults,{jndiName:"",timezone:"",connectionType:i.JNDI}),e}(),validation:function(){var e={};return n.extend(e,t.prototype.validation,{jndiName:[{required:!0,msg:a["ReportDataSourceValidator.error.not.empty.reportDataSource.jndiName"]}]}),e}()})});