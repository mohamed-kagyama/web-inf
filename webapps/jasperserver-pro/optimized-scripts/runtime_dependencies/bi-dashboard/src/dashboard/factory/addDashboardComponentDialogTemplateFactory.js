/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/addWebPageViewDialogContentTemplate.htm","text!../template/addTextDialogContentTemplate.htm","text!../template/addImageDialogContentTemplate.htm","text!../template/addAdHocViewDialogContentTemplate.htm","text!../template/properties/basePropertiesDialogTemplate.htm","../enum/dashboardComponentTypes"],function(e,t,a){var m=e("text!../template/addWebPageViewDialogContentTemplate.htm"),o=e("text!../template/addTextDialogContentTemplate.htm"),p=e("text!../template/addImageDialogContentTemplate.htm"),l=e("text!../template/addAdHocViewDialogContentTemplate.htm"),n=e("text!../template/properties/basePropertiesDialogTemplate.htm"),d=e("../enum/dashboardComponentTypes"),i={};i[d.WEB_PAGE_VIEW]=m,i[d.FREE_TEXT]=o,i[d.IMAGE]=p,i[d.ADHOC_VIEW]=l,i[d.TABLE]=l,i[d.CHART]=l,i[d.CROSSTAB]=l,a.exports=function(e){var t;return(t=e.get("type"))in i?i[t]:n}});