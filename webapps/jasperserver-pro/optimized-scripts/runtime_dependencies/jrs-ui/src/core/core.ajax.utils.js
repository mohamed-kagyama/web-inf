/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../components/components.dialogs","../namespace/namespace","jquery"],function(e,r,o){function n(e,r){(e&&e.indexOf("sessionAttributeMissingException"))>-1?p.clusterErrorPopup.show(e):p.errorPopup.show(e,!1,r)}function s(e){if(500==e.status)return n(e.responseText),!0;if(e.getResponseHeader("LoginRequested"))return document.location=".",!0;if(e.getResponseHeader("JasperServerError"))return e.getResponseHeader("SuppressError")||(1==d(".dashboardViewFrame").length?(d(document.body).html(e.responseText),d("#"+u.fid,window.parent.document).removeClass("hidden").show()):n(e.responseText)),!0;return!1}function t(){}function a(){}var p=e("../components/components.dialogs"),i=e("../namespace/namespace"),u=i.JRS,d=e("jquery");r.showErrorPopup=n,r.baseErrorHandler=s,r.errorHandler=t,r.showMessageDialog=a});