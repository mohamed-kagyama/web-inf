/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../errorHandling/errorHandlingUtil"],function(r,i,n){var e=r("../errorHandling/errorHandlingUtil");n.exports=function(r){return{isSatisfiedBy:function(i){var n=e.getErrors(i);return r.isSatisfiedBy(n)}}}});