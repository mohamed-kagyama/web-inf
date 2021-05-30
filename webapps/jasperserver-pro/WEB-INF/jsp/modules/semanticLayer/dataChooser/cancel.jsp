<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<head></head>

<body>
<script type="text/javascript">
<c:choose>
<c:when test='${ParentFolderUri != null}'>
    document.location='flow.html?_flowId=searchFlow&lastMode=true'; 
</c:when>
<c:otherwise>
    document.location='flow.html?_flowId=queryBuilderFlow&_flowExecutionKey=${flowExecutionKey}&_eventId=cancel'; 
</c:otherwise>
</c:choose>
</script>
</body>

<js:xssNonce/>

