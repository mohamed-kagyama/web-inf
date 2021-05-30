/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var t=e("underscore"),o=function(e){this.initialize(e)};t.extend(o.prototype,{initialize:function(e){t.bindAll(this,"isSatisfied"),this.clientDomainSchemaService=e.clientDomainSchemaService},isSatisfied:function(){var e=Boolean(this.clientDomainSchemaService.getFieldsSize()),i=Boolean(this.clientDomainSchemaService.getJoinTreesSize()),n=this.clientDomainSchemaService.isJoinTreesConsistOfASingleComponent();return e&&(!i||n)}}),n.exports=o});