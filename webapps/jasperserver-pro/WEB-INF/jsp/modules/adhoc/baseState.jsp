<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<js:out javaScriptEscape="true">
<script id="baseState" type="text/javascript">
    <js:xssNonce type="javascript"/>
    clientKey = clientKey || "${clientKey}";
</script>
</js:out>

<js:out escapeScript="false">
<script type="text/json" id='adhocActionModel' >
    ${viewModel.clientActionModelDocument}
</script>
</js:out>