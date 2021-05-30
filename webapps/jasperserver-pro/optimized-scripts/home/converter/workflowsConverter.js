/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../types/workflowNameToIconClassEnum","../types/workflowNameToPrimaryActionClassEnum","bundle!HomeBundle","../types/workflowCategoryEnum"],function(o,e,a){function r(o){var e=o._links,a=e.create,r=a&&a.title?a.title:"",n=e.resources&&e.resources[0],t=n&&n.title?n.title:"";return{name:o.name,title:o.label,description:o.description,iconClass:i[o.name],iconAriaLabel:"",primaryActionClass:c[o.name],primaryActionHasIcon:!0,isSecondaryActionDisabled:!0,primaryActionUrl:a?a.href:void 0,secondaryActionUrl:n&&n.href,primaryActionLabel:r,secondaryActionLabel:t,primaryActionAriaLabel:"".concat(r," ").concat(o.label),secondaryActionAriaLabel:"".concat(t," ").concat(o.label)}}function n(o){return{name:o.name,title:o.label,description:o.description,iconClass:i[o.name],iconAriaLabel:"",primaryActionClass:c[o.name],primaryActionHasIcon:!0,secondaryActionLabel:"",secondaryActionAriaLabel:"",isSecondaryActionDisabled:!0,primaryActionUrl:o.controls.href,primaryActionLabel:o.controls.label,primaryActionAriaLabel:"".concat(o.controls.label," ").concat(o.label)}}var t=o("../types/workflowNameToIconClassEnum"),i=t.workflowNameToIconClassEnum,l=o("../types/workflowNameToPrimaryActionClassEnum"),c=l.workflowNameToPrimaryActionClassEnum,s=o("bundle!HomeBundle"),m=o("../types/workflowCategoryEnum"),y=function(o){var e=o.filter(function(o){return o.category===m.VISUALIZATIONS}).map(r),a=o.filter(function(o){return o.category===m.DATA}).map(r),t=o.filter(function(o){return o.category===m.ADMIN}).map(n),i=[];return e.length>0&&i.push({title:s["category.visualizations"],categoryClass:"workflowsVisualizations",items:e}),a.length>0&&i.push({title:s["category.data"],categoryClass:"workflowsData",items:a}),t.length>0&&i.push({title:s["category.admin"],categoryClass:"workflowsAdmin",items:t}),i};e.workflowsConverter=y});