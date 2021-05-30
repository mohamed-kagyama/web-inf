<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ page import="com.jaspersoft.ji.license.LicenseManager" %>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    request.setAttribute("homePage","true");
    LicenseManager licenseManager = LicenseManager.getInstance();


%>
<c:set var="showAnalisysOptions" value="<%=licenseManager.isAnalysisFeatureSupported()%>"/>
<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code='home.title'/></t:putAttribute>
    <t:putAttribute name="bodyID">home_user</t:putAttribute>
    <t:putAttribute name="bodyClass" value="oneColumn"/>
    <t:putAttribute name="moduleName" value="commons/commons.main"/>
    <t:putAttribute name="bodyContent" >
        <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerClass" value="column decorated primary"/>
            <t:putAttribute name="containerTitle"><spring:message code="home.header.title"/></t:putAttribute>
            <t:putAttribute name="swipeScroll" value="${isIPad}"/>
            <t:putAttribute name="bodyContent">
                <iframe id="outerFrame" class="outerDashboardFrame" name="Dashboard" allowtransparency="true" align="center" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" height="99.5%" width="100%" scrolling="no"
                        src="${pageContext.request.contextPath}/dashboard/viewer.html?viewAsDashboardFrame=true&isJasperAnalysis=${showAnalisysOptions}#${demoHomeResource}">
                </iframe>
            </t:putAttribute>
        </t:insertTemplate>
    </t:putAttribute>
</t:insertTemplate>
