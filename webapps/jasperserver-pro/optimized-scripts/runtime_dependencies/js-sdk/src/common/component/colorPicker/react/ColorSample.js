/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react","../util/colorConvertUtil","./enum/colors"],function(r,o,e){var l=r("react"),t=r("../util/colorConvertUtil"),n=r("./enum/colors"),c="".concat("jr-mControl-launcher-swatchLight"," jr-mControl-launcher-swatchTransparent"),a=function(r){return r===n.TRANSPARENT?c:t.isColorDark(r)?"":"jr-mControl-launcher-swatchLight"},u=function(r){var o={backgroundColor:r.color},e="jr-mControl-launcher-swatch ".concat(a(r.color)," jr");return l.createElement("div",{className:"jr-mControl-launcher jr",onClick:r.onClick},l.createElement("div",{className:e,style:o}),l.createElement("div",{className:"jr-mControl-launcher-hex jr"},r.label))};o.ColorSample=u});