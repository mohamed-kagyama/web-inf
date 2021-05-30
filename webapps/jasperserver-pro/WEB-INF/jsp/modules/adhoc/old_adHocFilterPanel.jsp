<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<!-- create filter row for each of the existing filters -->
<%@ include file="filterState.jsp" %>

<ul class="list filters">
    <js:xssNonce/>

    <li class="leaf">
        <%-- complex filters are supported only for nonOLAP for now --%>
        <c:if test="${viewModel.viewType != 'olap_crosstab'}">
            <%@ include file="adHocFilterComplexPodTemplate.jsp" %>
        </c:if>
    </li>
    <c:forEach var="filter" items="${viewModel.existingFilters}">
        <li class="leaf">
            <%@ include file="adHocFilterPodTemplate.jsp" %>
        </li>
    </c:forEach>
</ul>

