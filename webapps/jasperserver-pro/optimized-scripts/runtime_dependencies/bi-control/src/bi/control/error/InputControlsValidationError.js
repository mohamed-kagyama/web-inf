/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/bi/error/BiComponentError","runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes","runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorMessages"],function(e,r,o){var n=e("runtime_dependencies/js-sdk/src/common/bi/error/BiComponentError"),s=e("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes"),i=e("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorMessages");o.exports=n.extend({constructor:function(e){var r=s.INPUT_CONTROLS_VALIDATION_ERROR,o=i[r];n.prototype.constructor.call(this,r,o,e)}})});