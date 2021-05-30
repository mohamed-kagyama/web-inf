/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BiComponentError","./enum/biComponentErrorCodes","./enum/biComponentErrorMessages"],function(o,r,e){var n=o("./BiComponentError"),t=o("./enum/biComponentErrorCodes"),E=o("./enum/biComponentErrorMessages");e.exports=n.extend({constructor:function(o){n.prototype.constructor.call(this,t.ALREADY_DESTROYED_ERROR,E[t.ALREADY_DESTROYED_ERROR])}})});