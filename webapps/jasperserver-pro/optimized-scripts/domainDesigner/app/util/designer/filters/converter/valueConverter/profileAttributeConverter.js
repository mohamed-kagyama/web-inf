/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/util/profileAttributeUtil"],function(e,t,r){var i=e("underscore"),o=e("../../../../../../model/util/profileAttributeUtil");r.exports={convert:function(e){if(i.isString(e)&&o.containsProfileAttribute(e))return e}}});