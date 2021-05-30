<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

    <%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
    <%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
    <%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    <c:set var="bodyClass" value="oneColumn"/>
    <t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
        <t:putAttribute name="pageTitle" value="${reportUnitObject.label}"/>
        <t:putAttribute name="bodyID" value="reportViewer"/>
        <t:putAttribute name="bodyClass" value="${bodyClass}"/>
        <t:putAttribute name="moduleName" value="reportViewer/reportViewerMain"/>
        <t:putAttribute name="headerContent">

            <%@ include file="../viewReport/ViewReportState.jsp" %>
        </t:putAttribute>

        <t:putAttribute name="bodyContent" >

            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerID" value="reportViewFrame"/>
                <!-- ========== REPORT CONTAINER =========== -->
                <t:putAttribute name="swipeScroll" value="${isIPad}"/>
                <t:putAttribute name="bodyContent">
                    <%--c:if test="${empty param.frame}">
                        <center>
                    </c:if--%>
                    <div id="reportContainer" class="" style="position:relative;"></div>
                    <%--c:if test="${empty param.frame}">
                        </center>
                    </c:if--%>
                </t:putAttribute>
            </t:insertTemplate>
        </t:putAttribute>
    </t:insertTemplate>