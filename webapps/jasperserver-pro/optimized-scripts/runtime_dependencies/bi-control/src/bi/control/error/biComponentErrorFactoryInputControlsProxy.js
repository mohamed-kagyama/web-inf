/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory","./InputControlsValidationError"],function(r,o,n){var e=r("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory"),t=r("./InputControlsValidationError");e.inputControlsValidationError=function(r){return new t(r)},n.exports=e});