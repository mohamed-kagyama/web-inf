/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./isValueProfileAttributeValidationRule"],function(e,i,t){var a=e("./isValueProfileAttributeValidationRule");t.exports={validate:function(e){var i=e.start.value,t=e.end.value;if(a.validate(i)&&a.validate(t))return!0}}});