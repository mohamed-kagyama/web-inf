<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<!--
 Utility for serving up Online Help Pages in a hosted environment
-->
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<script type="text/javascript" >
    <js:xssNonce type="javascript"/>

    var webHelpModuleState = {};

    // Commented out because it is a work in progress. The architect will sort it out
    webHelpModuleState.contextMap = <%= WebHelpLookup.getInstance().getHelpContextMapAsJSON() %>;
    webHelpModuleState.hostURL = '<%= WebHelpLookup.getInstance().getHostURL() %>';
    webHelpModuleState.pagePrefix = '<%= WebHelpLookup.getInstance().getPagePrefix() %>';
</script>
