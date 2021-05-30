/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(r,e,a){var g=r("jquery");a.exports=function(){var r=[];return g(".ui-draggable-dragging").length&&(r=g(".ui-draggable-dragging").data("data")||[]),r}});