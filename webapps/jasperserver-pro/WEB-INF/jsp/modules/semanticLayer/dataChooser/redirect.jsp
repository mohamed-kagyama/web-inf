<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<html>
<head>
    <script type="text/javascript">
        <js:xssNonce type="javascript"/>
        <js:out javaScriptEscape="true">
            <c:choose>
                <c:when test='${ParentFolderUri != null}'>
                    window.location.href = "flow.html?_flowId=searchFlow&lastMode=true";
                </c:when>
                <c:otherwise>
                    window.location.href = "flow.html?_flowId=queryBuilderFlow&decorate=${param.decorate}&_flowExecutionKey=${flowExecutionKey}&_eventId=finishWizard&selectedReportType=${reportType}&realm=${sessionScope['slReportUri']}&saveConfirmation=${param.saveConfirmation}";
                </c:otherwise>
            </c:choose>
        </js:out>
    </script>
</head>
<body>Redirecting...</body>
</html>