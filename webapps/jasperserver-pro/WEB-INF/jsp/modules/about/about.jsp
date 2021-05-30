<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ page import="com.jaspersoft.ji.license.LicenseManager" %>
<%@ page import="com.jaspersoft.ji.license.LicenseCheckStatus" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>

<%
    LicenseManager licenseManager = LicenseManager.getInstance();
    LicenseCheckStatus licenseCheckStatus = licenseManager.checkLicense();
    String licenseType="";
    if (licenseCheckStatus.isLicenseAccepted()) {
        if (licenseManager.isDevelopmentEnvironmentType()) {
            licenseType = LicenseManager.ENV_TYPE_DEVELOPMENT;
        } else {
            licenseType = licenseManager.getLicenseTypeString();
        }
    }
%>
<c:set var="licenseAccepted" value="<%=licenseCheckStatus.isLicenseAccepted()%>"/>
<c:if test="${licenseAccepted}">
    <c:set var="supportedFeatureNames" value="<%=licenseManager.getSupportedFeatureNames()%>"/>
    <c:set var="licenseProductEditionName" value="<%= licenseManager.getProductEditionName() %>"/>
    <c:set var="licenseFormatedExpirationDate" value="<%=licenseManager.getFormattedExpirationDate()%>"/>
</c:if>
<c:set var="licenseType" value="<%=licenseType%>"/>
<c:set var="licenseCheckStatus" value="<%=licenseCheckStatus.getMessage()%>"/>
<tiles:insertTemplate template="/WEB-INF/jsp/templates/aboutBox.jsp">
    <tiles:putAttribute name="containerClass" value="hidden centered_vert centered_horz"/>
    <tiles:putAttribute name="bodyContent">
        <c:if test="${!licenseAccepted}">
            <p class="message">${licenseCheckStatus}</p>
        </c:if>
        <c:if test="${licenseAccepted}">
            <p class="message"><spring:message code='NAV_146_ABOUT_LICENSE_PRODUCT_EDITION'/>:&nbsp;<span class="emphasis">${licenseProductEditionName}</span></p>
            <c:if test="${supportedFeatureNames!=null}">
                <p class="message"><spring:message code="NAV_147_ABOUT_LICENSE_FEATURES"/>: <span class="emphasis">${supportedFeatureNames}</span></p>
            </c:if>
            <p class="message"><spring:message code="dialog.aboutBox.productVersion"/>: <span class="emphasis"><spring:message code='PRO_VERSION'/></span></p>
            <p class="message"><spring:message code="dialog.aboutBox.build"/>: <span class="emphasis"><spring:message code='BUILD_DATE_STAMP'/>_<spring:message code='BUILD_TIME_STAMP'/></span></p>
            <p class="message"><spring:message code="NAV_142_ABOUT_LICENSE_TYPE"/>: <span class="emphasis">${licenseType}</span></p>
            <p class="message"><spring:message code="NAV_143_ABOUT_LICENSE_EXPIRATION"/>: <span class="emphasis">${licenseFormatedExpirationDate}</span></p>

        </c:if>
    </tiles:putAttribute>
</tiles:insertTemplate>