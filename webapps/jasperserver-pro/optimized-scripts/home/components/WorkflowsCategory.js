/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react"],function(e,a,t){var r=e("react"),l=r,o=r.Children,s=function(e){var a=e.title,t=e.children,r=e.categoryClass,s=o.toArray(t);return l.createElement("div",{className:"workflowsCategory ".concat(r)},l.createElement("div",{className:"workflowsTitle"},a),l.createElement("ul",{className:"workflowsBlock","js-itemplural":"items",role:"application","aria-label":"List of ".concat(s.length," items"),"js-navtype":"workflowCard","js-suspended-tabindex":"0"},s))};a.WorkflowsCategory=s});