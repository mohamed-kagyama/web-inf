/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BiComponentError","./enum/biComponentErrorCodes","./enum/biComponentErrorMessages"],function(r,o,e){var t=r("./BiComponentError"),n=r("./enum/biComponentErrorCodes"),s=r("./enum/biComponentErrorMessages");e.exports=t.extend({constructor:function(r){this.validationError=r;var o=r.dataPath.substring(1);t.prototype.constructor.call(this,n.SCHEMA_VALIDATION_ERROR,s[n.SCHEMA_VALIDATION_ERROR]+": "+o+": "+this.validationError.message,[r.dataPath,this.validationError.message])}})});