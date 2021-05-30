/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./VisualizationTypeValidator","./ParameterNameValidator","./ParameterValueValidator"],function(a,e,r){var t=a("./VisualizationTypeValidator"),i=a("./ParameterNameValidator"),o=a("./ParameterValueValidator"),l=[t,i,o];r.exports=function(a){return{validate:function(e,r){for(var t,i=0;!t&&i<l.length;)t=l[i++].validate(a,e,r);return t}}}});