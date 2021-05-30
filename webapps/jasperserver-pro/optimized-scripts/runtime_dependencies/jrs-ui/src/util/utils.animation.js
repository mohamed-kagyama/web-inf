/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","scriptaculous/src/effects","prototype"],function(e,n,o){function t(e,n,o,t){new d.Move(y(e),{sync:!1,x:n,y:o,mode:"absolute",duration:t||.2})}function r(e,n,o,t){new d.Move(y(e),{sync:!1,x:n,y:o,mode:"relative",duration:t||.2})}function a(e,n,o,t){for(var r=[],a=0;a<e.length;++a)r[a]=new d.Move(e[a],{sync:!0,x:n,y:o,mode:"relative"});new d.Parallel(r,{duration:t||1})}function u(e,n,o){y(e).fade({duration:n||1,from:1,to:o||0})}function i(e,n,o){for(var t=[],r=0;r<e.length;++r)t[r]=new d.Fade(e[r],{sync:!0,from:1,to:o||0});new d.Parallel(t,{duration:n||1})}function f(e,n,o){y(e).appear({duration:n||1,from:0,to:o||1})}function l(e,n,o){for(var t=[],r=0;r<e.length;++r)t[r]=new d.Appear(e[r],{sync:!0,from:0,to:o||1});new d.Parallel(t,{duration:n||1})}function c(e,n,o){var t=y(e).identify();d.Pulsate(t,{pulses:n||5,duration:o||2})}function s(e,n){var e=y(e);return e.show(),e.style.left=n.clientX,e.style.top=n.clientY,e}var d=e("scriptaculous/src/effects"),p=e("prototype"),y=p.$;n.renderImageOverMousePointer=s,n.pulsate=c,n.appear=f,n.appearMany=l,n.fade=u,n.fadeMany=i,n.move=r,n.moveMany=a,n.moveTo=t});