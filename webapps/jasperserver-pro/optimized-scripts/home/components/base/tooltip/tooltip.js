/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","runtime_dependencies/jrs-ui/src/components/components.tooltip","text!./resourceTooltipTemplate.htm","bundle!HomeBundle"],function(e,t,o){var n=e("underscore"),r=e("jquery"),i=e("runtime_dependencies/jrs-ui/src/components/components.tooltip"),p=i.JSTooltip,u=e("text!./resourceTooltipTemplate.htm"),d=e("bundle!HomeBundle"),l=t.tooltipFactory=function(e,t,o){var r=n.template(u,{uid:o,i18n:d});return t("body").append(t(r)),function(t){new e(t.el,{text:[t.path,t.description],templateId:o})}},c=n.uniqueId("tooltip");t.tooltip=l(p,r,c)});