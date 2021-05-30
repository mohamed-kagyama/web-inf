/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","./errorHandlingUtil","../enum/responseStatusToBundleKeyEnum"],function(e,r,n){function s(e,r){var n;if(r.errorCode&&u[r.errorCode]){var s=[r.errorCode].concat(r.parameters);n=l.apply(l,s)}return n||(n=m[e]),n||(n=l("domain.designer.error.handling.unknown.error",r.parameters)),n}function o(e){var r=d.getErrors(e);return i.map(r,i.partial(s,e.status))}function t(e){return i.first(o(e))}var i=e("underscore"),u=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),d=e("./errorHandlingUtil"),m=e("../enum/responseStatusToBundleKeyEnum"),l=a.create(u);n.exports={getErrorMessages:o,getFirstErrorMessage:t}});