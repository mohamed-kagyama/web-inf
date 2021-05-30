<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ page import="com.jaspersoft.ji.license.LicenseManager" %>

<%
    LicenseManager licenseManager = LicenseManager.getInstance();
    request.setAttribute("isDevelopmentEnvironmentType", licenseManager.isDevelopmentEnvironmentType());
%>