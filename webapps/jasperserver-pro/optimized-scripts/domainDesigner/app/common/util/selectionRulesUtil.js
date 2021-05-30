/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,t){function i(e){return 1===e.which}function r(e){return e.ctrlKey||e.metaKey}function u(e){return e.shiftKey}function o(e){return i(e)&&!r(e)&&!u(e)}function c(e){return i(e)&&r(e)}function f(e){return i(e)&&u(e)}t.exports={isSingleSelection:o,isMultipleSelection:c,isCtrlKeyHeld:r,isShiftKeyHeld:u,isLeftMouseButton:i,isRangeSelection:f}});