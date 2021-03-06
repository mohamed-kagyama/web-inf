/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/logging/logger","bundle!RepositoryResourceBundle"],function(e,r,n){function s(e,r){var n=r[e.status]||r.unknown;return o.isString(n)?r[e.status]:o.isFunction(n)?n(e):void 0}var o=e("underscore"),u=e("runtime_dependencies/js-sdk/src/common/logging/logger"),t=e("bundle!RepositoryResourceBundle"),i=u.register("ResourceErrors");n.exports={mapXhrErrorToMessage:function(e,r){var n,o=e&&e.responseJSON&&e.responseJSON.message,u=e&&e.responseJSON&&e.responseJSON.errorCode;return n=s(e,r)||o||t["error.unknown.error"],i.warn(e.status,u,o),n}}});