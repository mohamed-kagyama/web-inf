<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ page language="java" contentType="application/javascript; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

/**
 * ${sessionScope.XSS_NONCE} do not remove
 *
 * @author: Igor Nesterenko, Sergey Prilukin
 * @version $Id: visualize.jsp 51369 2014-11-12 13:59:41Z sergey.prilukin $
 */

<jsp:include page="setScriptOptimizationProps.jsp"/>

<%-- Temporary solution for JasperMobile. Will be removed in next release. --%>
<c:set var="_showInputControls" value="${true}" scope="session"/>

<c:choose>
    <c:when test="${param['_showInputControls'] == 'false'}">
        <c:set var="_showInputControls" value="${false}" scope="session"/>
    </c:when>
</c:choose>

<c:choose>
    <c:when test="${optimizeJavascript == true}">
        <c:import url="${scriptsFolderInternal}/visualize/visualize.js" />
        <%-- Workaround to fix jquery.ui.datepicker in case if optimization is enabled. In this case __jrsConfigs__ will not be global --%>
        visualize.__jrsConfigs__["userLocale"] = "${userLocale}";
        visualize.__jrsConfigs__["avaliableLocales"] = [<c:forEach items="${userLocales}" var="locale" varStatus="sts">"${locale.code}"<c:if test="${!sts.last}">, </c:if></c:forEach>];

    <%--TODO: maybe it's better to move it to visualize.js--%>
        if (typeof define === "function" && define.amd) {
            define([], function () {
                return visualize;
            });
        }

    </c:when>
    <c:otherwise>
        <%-- Workaround to fix jquery.ui.datepicker. Set global __jrsConfigs__ property --%>
        var __jrsConfigs__ = {
            userLocale: "${userLocale}",
            avaliableLocales: [<c:forEach items="${userLocales}" var="locale" varStatus="sts">"${locale.code}" <c:if test="${!sts.last}">, </c:if> </c:forEach>]
        };
        <c:import url="${scriptsFolderInternal}/runtime_dependencies/requirejs/require.js"/>
        <c:import url="${scriptsFolderInternal}/require.config.js"/>

        <%--Use not optimized version of loader for development proposes--%>
        <c:import url="${scriptsFolderInternal}/visualize/loader/jasper.js" />
        <%--Use not optimized version of visualize for development proposes--%>
        <c:import url="${scriptsFolderInternal}/visualize/visualize.js" />
    </c:otherwise>
</c:choose>

var themeHref = "${baseUrl}/" + "<spring:theme code='theme.css'/>".split("/").slice(0, -1).join("/");

visualize.config({
    server : "${baseUrl}",
    scripts : "${scriptsFolder}",
    logEnabled: ${logEnabled},
    logLevel: "${logLevel}",
    _showInputControls: "${_showInputControls}" === "true",
    _visualizeScriptUrl : "/client/visualize.js",
    theme: {
        href: themeHref
    }
});
<% out.flush(); %>
