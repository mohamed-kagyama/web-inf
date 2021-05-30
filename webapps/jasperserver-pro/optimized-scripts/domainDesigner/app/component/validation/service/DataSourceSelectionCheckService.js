/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,i){function o(e){e=e||e,t.bindAll(this,"isValid"),this.resourceService=e.resourceService,this.dataSourceInfoService=e.dataSourceInfoService}var t=e("underscore");t.extend(o.prototype,{isValid:function(e){var r=this,i=e.uri;return this.resourceService.getResource(i).then(function(){return r.dataSourceInfoService.getDataSourceInfo(i,{refresh:!0})})}}),i.exports=o});