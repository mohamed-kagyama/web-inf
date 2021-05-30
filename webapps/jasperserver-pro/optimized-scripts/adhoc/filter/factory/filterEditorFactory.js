/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../editor/FilterEditor","../editor/ReadOnlyFilterEditor","../editor/OlapFilterEditor","../enum/filterDataTypes"],function(e,r,t){var i=e("../editor/FilterEditor"),o=e("../editor/ReadOnlyFilterEditor"),d=e("../editor/OlapFilterEditor"),l=e("../enum/filterDataTypes");t.exports=function(e,r){var t;return t=r?d:e===l.READ_ONLY?o:i,function(e){return new t({model:e})}}});