/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,t){function r(e){var n=e.canvasWidth,t=e.minCanvasWidth,r=e.scrollBarWidth;return e.isScrollBarPresent&&(n-=r),n<t?t:n}function i(e){var n=e.offsetLeft,t=e.canvasWidth,r=e.minOffsetInPercent,i=e.maxOffsetInPercent,f=o(n,t);return f>r&&f<i}function f(e){var n=e.canvasWidth,t=e.offsetLeft,r=o(t,n);return{column0Width:r,column1Width:100-r}}function o(e,n){return 100*e/n}function s(e,n){return e*n/100}e("underscore");t.exports={getCanvasOrMinWidth:r,isResizerWithinBoundaries:i,getColumnsWidths:f,convertOffsetLeftToPercent:o,convertOffsetLeftToPx:s}});