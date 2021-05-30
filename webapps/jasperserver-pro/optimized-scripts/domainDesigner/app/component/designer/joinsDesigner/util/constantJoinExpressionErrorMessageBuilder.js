/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../enum/constantJoinExpressionErrorCodesEnum"],function(e,n,r){function s(e){var n,r=e.responseJSON,s=e.validationOptions;switch(r.errorCode){case t.character:n=o(r,s);break;default:n=r.message}return n}function o(e,n){var r=e.properties,s=n.value,o=r[0]&&r[0].value,i=s.indexOf(o),a=i+1;return u(e.errorCode,{key:"invalidCharacter",value:o},{key:"charPositionInLine",value:a})}var i=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=e("../enum/constantJoinExpressionErrorCodesEnum"),u=a.create(i);r.exports={getErrorMessage:s}});