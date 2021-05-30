<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<html>
<js:xssNonce/>
<center><h1>Error</h1></center>
<table width=100% height=100% bgcolor="#ffaa22">
<tr><td>
<%= request.getAttribute("error") %>
</td></tr>
</table>
</html>


 