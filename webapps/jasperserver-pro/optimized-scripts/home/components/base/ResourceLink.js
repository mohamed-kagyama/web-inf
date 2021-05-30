/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react"],function(e,a,r){var t=e("react"),c=function(e,a){var r=e.label,c=e.resourceType,l=e.actionAvailable,n=e.date,i=e.url;return t.createElement("li",{tabIndex:-1,ref:a},t.createElement("div",{className:"fileType"},t.createElement("span",{className:"fileType-icon ".concat(c)})),t.createElement("div",{className:"fileName  ".concat(l?"":"disableCursor")},t.createElement("a",{href:i,tabIndex:-1},r),t.createElement("span",{className:"fileDate"},n)))};c.displayName="ResourceLink";var l=t.forwardRef(c);a.ResourceLink=l});