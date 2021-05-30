/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/util/SimpleModel"],function(e,i,t){var o=e("underscore"),n=e("../../../../../model/util/SimpleModel");t.exports=n.extend({constructor:function(e,i){this.clientDomainValidationService=i.clientDomainValidationService,n.prototype.constructor.call(this,e)},toJSON:function(e){var i=this.get("saveDialogProperties");return o.extend({},this.clientDomainValidationService.serializeToSaveSchema(e),i)}})});