<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ page language="java" %>
<%@ page import="java.util.*" %>
<%@ page buffer="none" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<!--<html>
<head>
<link href="../stylesheets/stylesheet.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
function refresh_status() {
  location.reload(true)
}
window.setInterval("refresh_status()",1000);
</script>
<body>

		
			-->

            <js:xssNonce/>


			<table class="formtable" align="center" cellpadding=5 cellspacing=0 border="0" width="100%">
				<tbody>
				<tr class="fheader">
					<td class="tableheadercell">#</td>
					<td class="tableheadercell">Action</td>
					<td class="tableheadercell">Time</td>
					<td class="tableheadercell">Done?</td>
					<td class="tableheadercell">Query&nbsp;status</td>
					<td class="tableheadercell">Query&nbsp;time</td>
					<td class="tableheadercell">Fetch&nbsp;time</td>
				</tr>
				<c:forEach var="request" items="${monitor.requestList}">
					<c:set var="query" value="${request.runningQuery}"/>
					<tr>
						<td align="right">${request.id}</td>
						<td align="left">${request.action}</td>
						<td align="right">${request.time}</td>
						<td align="center">${request.done}</td>
						<td align="center">${not empty query ? query.state : ""}</td>
						<td align="right">${not empty query ? query.queryTime : ""}</td>
						<td align="right">${not empty query ? query.fetchTime : ""}</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
<!--</body>

</html>
-->