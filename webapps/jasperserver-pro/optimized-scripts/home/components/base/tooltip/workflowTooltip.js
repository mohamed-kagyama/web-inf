/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","runtime_dependencies/jrs-ui/src/components/components.tooltip","text!./workflowTooltipTemplate.htm"],function(o,e,t){var n=o("underscore"),r=o("jquery"),i=o("runtime_dependencies/jrs-ui/src/components/components.tooltip"),p=i.JSTooltip,l=o("text!./workflowTooltipTemplate.htm"),u=e.workflowTooltipFactory=function(o,e,t){var r=n.template(l,{uid:t});return e("body").append(e(r)),function(e,n){new o(n,{text:[e],templateId:t})}},c=n.uniqueId("workflowTooltip");e.workflowTooltip=u(p,r,c)});