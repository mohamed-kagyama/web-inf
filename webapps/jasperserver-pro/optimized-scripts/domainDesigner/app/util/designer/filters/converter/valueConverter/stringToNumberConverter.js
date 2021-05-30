/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../common/util/numberUtil"],function(e,i,r){var m=e("../../../../../common/util/numberUtil");r.exports={convert:function(e){return m.replaceLocalizedDecimalDelimiterWithNumberDecimalDelimiter(m.removeThousandsDelimiter(e))}}});