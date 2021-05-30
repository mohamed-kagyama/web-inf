/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","settings!domainSettings"],function(e,n,t){var i=e("underscore"),r=e("settings!domainSettings");t.exports={convert:function(e){if(i.isNull(e))return r.nullLabel}}});