/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/propertyNameToDataNameAttributeEnum"],function(e,t,r){var a=e("../enum/propertyNameToDataNameAttributeEnum");r.exports={computed:{dataName:function(){return a[this.propertyName]}}}});