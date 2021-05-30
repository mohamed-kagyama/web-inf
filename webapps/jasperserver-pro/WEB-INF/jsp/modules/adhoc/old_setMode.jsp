<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%--These varables need to be loaded first--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

{
    "decimalSeparator":"${requestScope.decimalSeparatorForUserLocale}",
    "groupingSeparator":"${requestScope.groupingSeparatorForUserLocale}",
    "selectedThemeId":"${requestScope.viewModel.theme}",
    "viewType":"${requestScope.viewModel.viewType}",

    "flowExecutionKey": "${flowExecutionKey}",
    "clientKey":"${clientKey}",
    "serverTimeoutInterval":${serverTimeoutInterval},
    "addFilterWidgetByDefault":${addFilterWidgetByDefault},
    "filterAutoSubmitTimer":${filterAutoSubmitTimer},
    "organizationId":"${organizationId}",
    "publicFolderUri":"${publicFolderUri}",
    "constantFieldsLevel":"${constant_fields_level}",
    "isAnalysisFeatureSupported":${isAnalysisFeatureSupported},

    "usingAdhocLauncher":"${param.adhocLauncher}",

    "adhocActionModel":${viewModel.clientActionModelDocument}
}