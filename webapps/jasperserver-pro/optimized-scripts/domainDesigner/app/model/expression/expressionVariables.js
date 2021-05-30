/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/expressionsEnum","./expressionWalker","./expressionVariableEscapingUtil"],function(e,n,r){function a(e){var n=[],r=!1,a={variable:function(){r=!0},name:function(e){r&&(l.isVariableEscaped(e)&&(e=l.unEscapeVariable(e)),n.push(e),r=!1)}};return u.walk(e,a),s.uniq(n)}function i(e,n){var r={variable:function(e){var r=o.operators.name.name,a=n(e[r]);s.isUndefined(a)||(e[r]=a)}};return u.walk(e,r),e}var s=e("underscore"),o=e("../enum/expressionsEnum"),u=e("./expressionWalker"),l=e("./expressionVariableEscapingUtil");r.exports={collect:a,updateVariableName:i}});