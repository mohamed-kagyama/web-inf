/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/properties/dashboardPropertiesDialogTemplate.htm","text!../template/properties/filterPropertiesDialogTemplate.htm","text!../template/properties/controls/autoRefreshControlTemplate.htm","../factory/showTitleBarElementsControlTemplateFactory","text!../template/properties/controls/showVisualizeSelectorIconControlTemplate.htm","text!../template/properties/controls/addressControlTemplate.htm","text!../template/properties/controls/webRepoAddressControlTemplate.htm","text!../template/properties/controls/scrollBarsControlTemplate.htm","text!../template/properties/controls/bordersControlTemplate.htm","text!../template/properties/controls/sourceDataControlTemplate.htm","text!../template/properties/controls/sourceReportControlTemplate.htm","text!../template/properties/controls/sourceAdHocViewControlTemplate.htm","text!../template/properties/controls/scaleToFitControlTemplate.htm","text!../template/properties/controls/filter/filtersPerRowControlTemplate.htm","text!../template/properties/controls/filter/filterButtonsPositionControlTemplate.htm","text!../template/properties/controls/applyResetButtonControlTemplate.htm","text!../template/properties/controls/text/textInputControlTemplate.htm","text!../template/properties/basePropertiesDialogTemplate.htm","../enum/dashboardComponentTypes"],function(t,e,o){function r(t){return"<div>"+t+"</div>"}var l=t("text!../template/properties/dashboardPropertiesDialogTemplate.htm"),p=t("text!../template/properties/filterPropertiesDialogTemplate.htm"),s=t("text!../template/properties/controls/autoRefreshControlTemplate.htm"),m=t("../factory/showTitleBarElementsControlTemplateFactory"),a=t("text!../template/properties/controls/showVisualizeSelectorIconControlTemplate.htm"),n=t("text!../template/properties/controls/addressControlTemplate.htm"),i=t("text!../template/properties/controls/webRepoAddressControlTemplate.htm"),T=t("text!../template/properties/controls/scrollBarsControlTemplate.htm"),c=t("text!../template/properties/controls/bordersControlTemplate.htm"),h=t("text!../template/properties/controls/sourceDataControlTemplate.htm"),x=t("text!../template/properties/controls/sourceReportControlTemplate.htm"),C=t("text!../template/properties/controls/sourceAdHocViewControlTemplate.htm"),R=t("text!../template/properties/controls/scaleToFitControlTemplate.htm"),u=t("text!../template/properties/controls/filter/filtersPerRowControlTemplate.htm"),d=t("text!../template/properties/controls/filter/filterButtonsPositionControlTemplate.htm"),E=t("text!../template/properties/controls/applyResetButtonControlTemplate.htm"),f=t("text!../template/properties/controls/text/textInputControlTemplate.htm"),A=t("text!../template/properties/basePropertiesDialogTemplate.htm"),P=t("../enum/dashboardComponentTypes"),B={};B[P.DASHBOARD_PROPERTIES]=[l,s].join("\n"),B[P.WEB_PAGE_VIEW]=[A,n,m(P.WEB_PAGE_VIEW),T,s].join("\n"),B[P.REPORT]=[A,x,m(P.REPORT),a,R,s].join("\n"),B[P.FREE_TEXT]=[A,f].join("\n"),B[P.IMAGE]=[A,i,m(P.IMAGE),c,R].join("\n"),B[P.FILTER_GROUP]=[A,u,E,d].join("\n"),B[P.INPUT_CONTROL]=p,B[P.ADHOC_VIEW]=[A,C,m(P.ADHOC_VIEW),a,R,s].join("\n"),B[P.CROSSTAB]=[A,h,m(P.CROSSTAB),a,R,s].join("\n"),B[P.TABLE]=B[P.CROSSTAB],B[P.CHART]=B[P.CROSSTAB],o.exports=function(t){var e;return r((e=t.get("type"))in B?B[e]:A)}});