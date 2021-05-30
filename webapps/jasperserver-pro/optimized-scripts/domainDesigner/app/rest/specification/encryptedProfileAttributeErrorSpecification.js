/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/encryptedProfileAttributeErrorEnum"],function(r,e,n){var t=r("underscore"),o=r("../enum/encryptedProfileAttributeErrorEnum");n.exports={isSatisfiedBy:function(r){return t.some(r,function(r){return r.errorCode===o.ENCRYPTED_PROFILE_ATTRIBUTE_ERROR})}}});