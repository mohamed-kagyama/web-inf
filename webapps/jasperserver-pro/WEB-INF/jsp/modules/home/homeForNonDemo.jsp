<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ page import="com.jaspersoft.ji.license.LicenseManager" %>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="authz"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<% request.setAttribute("homePage","true"); %>

<authz:authorize access="hasRole('ROLE_ADMINISTRATOR')">
    <c:set var="bodyId" value="home_admin"/>
</authz:authorize>
<authz:authorize access="!hasRole('ROLE_ADMINISTRATOR')">
    <c:set var="bodyId" value="home_user"/>
</authz:authorize>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code='home.title'/></t:putAttribute>
    <t:putAttribute name="bodyID">${bodyId}</t:putAttribute>
    <t:putAttribute name="bodyClass" value="oneColumn"/>
    <t:putAttribute name="moduleName" value="home/homeMain"/>
    <t:putAttribute name="bodyContent" >
        <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerClass" value="column decorated primary home"/>
            <t:putAttribute name="containerTitle"><spring:message code="home.header.title"/></t:putAttribute>
            <t:putAttribute name="bodyContent"></t:putAttribute>
        </t:insertTemplate>
    </t:putAttribute>
</t:insertTemplate>
