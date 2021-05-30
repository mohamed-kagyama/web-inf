/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react"],function(e,r,a){var n=e("react"),t=function(e){var r,a=e.url,t=e.title,c=e.linkClass,l=e.description;return r=l?n.createElement("span",{className:"resourceName-description"},l):n.createElement(n.Fragment,null),n.createElement("li",{tabIndex:-1},n.createElement("div",{className:"resourceType"},n.createElement("span",{className:"resourceType-icon ".concat(c)})),n.createElement("div",{className:"resourceName"},n.createElement("a",{href:a,rel:"noopener noreferrer",className:"resourceName-link",target:"_blank",tabIndex:-1},t),r))};r.ExternalResourceLink=t});