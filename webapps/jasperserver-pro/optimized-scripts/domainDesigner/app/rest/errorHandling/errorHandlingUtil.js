/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,n){function t(r){return r.properties||r.parameters||[]}function s(r){var e=t(r),n={errorCode:r.errorCode,parameters:e};return r.details&&(n.details=o(r.details)),n}function o(r){return r=u.isArray(r)?r:[r],u.map(r,s)}function i(r){var e={};if(r.responseJSON)e=r.responseJSON;else if(r.responseText)try{e=JSON.parse(r.responseText)}catch(r){}return e}var u=r("underscore");n.exports={getErrors:function(r){return o(i(r))}}});