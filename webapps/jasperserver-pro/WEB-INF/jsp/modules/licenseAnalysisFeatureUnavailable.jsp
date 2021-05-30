<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code='LIC_019_license.failed'/></t:putAttribute>
        <t:putAttribute name="bodyID" value="licenseError"/>
        <t:putAttribute name="bodyClass" value="oneColumn"/>

        <t:putAttribute name="bodyContent" >
            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerClass" value="column decorated primary noHeader"/>
                <t:putAttribute name="containerTitle"><spring:message code='LIC_019_license.failed'/></t:putAttribute>
                <t:putAttribute name="bodyClass" value="flow"/>
                <t:putAttribute name="bodyContent">
                    <div id="flowControls"></div>
                    <div id="stepDisplay">
                        <fieldset class="row instructions">
                            <h2 class="textAccent02"><spring:message code='LIC_014_feature.not.licensed.analysis'/></h2>
                            <h4><spring:message code='LIC_020_licence.contact.support'/></h4>
                        </fieldset>
                    </div>
                </t:putAttribute>
            </t:insertTemplate>
        </t:putAttribute>

</t:insertTemplate>
    