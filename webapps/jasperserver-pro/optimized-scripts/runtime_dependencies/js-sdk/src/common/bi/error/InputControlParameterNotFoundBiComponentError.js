/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BiComponentError","./enum/biComponentErrorCodes"],function(o,r,e){var n=o("./BiComponentError"),t=o("./enum/biComponentErrorCodes");e.exports=n.extend({constructor:function(o){n.prototype.constructor.call(this,t.INPUT_CONTROL_PARAMETER_NOT_FOUND_ERROR,o)}})});