/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BiComponentError","./enum/biComponentErrorCodes","./enum/biComponentErrorMessages"],function(o,e,r){var n=o("./BiComponentError"),t=o("./enum/biComponentErrorCodes"),i=o("./enum/biComponentErrorMessages");r.exports=n.extend({constructor:function(o){this.exception=o,n.prototype.constructor.call(this,t.UNEXPECTED_ERROR,i[t.UNEXPECTED_ERROR]+" : "+this.exception.toString())}})});