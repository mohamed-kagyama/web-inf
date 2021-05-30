/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(n,e,o){function i(n,e){return Boolean(!e&&n)}function r(n,e){return Boolean(e)}function u(n,e){return Boolean(n&&!e)}function s(n,e){return Boolean(e)}function t(n,e){return!e}function l(n,e){return u(n,e)}n("underscore");o.exports={isSuppressCircularJoinOn:i,isIncludeAllDataIslandJoinsOn:r,isAlwaysIncludeTableEnabled:t,isJoinWeightEnabled:l,isUseMinimumPathJoinsOn:u,isUseAllDAtaIslandJoinsOn:s}});