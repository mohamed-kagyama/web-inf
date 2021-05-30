<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ page contentType="text/html; charset=utf-8" %>

<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="authz"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<authz:authorize access="hasRole('ROLE_DEMO')">
    <%--
        We have special home page for demo user only on PostgreSQL db.
        For other DB's it have same home page as other users.
    --%>
    <c:if test="${demoHomeResourceExists}">
        <jsp:include page="homeForDemo.jsp"/>
    </c:if>
    <c:if test="${not demoHomeResourceExists}">
        <jsp:include page="homeForNonDemo.jsp"/>
    </c:if>
</authz:authorize>
<authz:authorize access="!hasRole('ROLE_DEMO')">
    <jsp:include page="homeForNonDemo.jsp"/>
</authz:authorize>

