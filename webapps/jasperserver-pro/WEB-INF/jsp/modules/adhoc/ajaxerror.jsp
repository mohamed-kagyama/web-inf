<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:if test="${not empty header['x-requested-with']}">
    <c:set var="SKIP_XSS_ESCAPE" value="true" scope="page"/>
</c:if>

<div id="ajaxerror">
    ${ajaxerror}
</div>
