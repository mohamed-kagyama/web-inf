/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../common/util/numberUtil"],function(r,e,n){var o=r("underscore"),t=r("../../../../../common/util/numberUtil");n.exports={convert:function(r){return r=o.isString(r)?t.formatStringNumber(r):t.formatNumber(r),t.removeThousandsDelimiter(r)}}});