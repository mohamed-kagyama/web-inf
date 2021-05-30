<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<div class="secondary">
	<h2 class="palette01"><spring:message code='LOGIN_ROTATING_0_GETTING_STARTED'/></h2>
	<ul class="list decorated" role="application" js-itemplural="tutorials" tabindex="0">
		<li><a tabindex="-1" class="launcher" href="http://community.jaspersoft.com/wiki/jasperreports-server-how-videos-playlist" target="_blank"><spring:message code='LOGIN_ROTATING_PRO_0_GETTING_STARTED_ITEM_1'/></a></li>
		<li><a tabindex="-1" class="launcher" href="http://community.jaspersoft.com/wiki/community-wiki" target="_blank"><spring:message code='LOGIN_ROTATING_PRO_0_GETTING_STARTED_ITEM_2'/></a></li>
		<li><a tabindex="-1" class="launcher" href="http://community.jaspersoft.com/documentation" target="_blank"><spring:message code='LOGIN_ROTATING_PRO_0_GETTING_STARTED_ITEM_3'/></a></li>
		<li><a tabindex="-1" class="launcher" href="http://www.jaspersoft.com/editions" target="_blank"><spring:message code='LOGIN_ROTATING_PRO_0_GETTING_STARTED_ITEM_4'/></a></li>
		<li><a tabindex="-1" class="launcher" href="http://www.jaspersoft.com/getting-started" target="_blank"><spring:message code='LOGIN_ROTATING_PRO_0_GETTING_STARTED_ITEM_5'/></a></li>
	</ul>
</div>
<div class="primary">
	<h2 class="palette01"><spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW'/></h2>
		<ul class="list decorated" role="application" js-itemplural="new features" tabindex="0">
			<li><span class="sellPoint"><spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW_ITEM_1_1'/>:</span> <spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW_ITEM_1_2'/></li>
			<li><span class="sellPoint"><spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW_ITEM_2_1'/>:</span> <spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW_ITEM_2_2'/></li>
			<li><span class="sellPoint"><spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW_ITEM_3_1'/>:</span> <spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW_ITEM_3_2'/></li>
    <li><span class="sellPoint"><spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW_ITEM_4_1'/>:</span> <spring:message code='LOGIN_ROTATING_0_WHAT_IS_NEW_ITEM_4_2'/></li>
		</ul>
</div>

<js:xssNonce/>