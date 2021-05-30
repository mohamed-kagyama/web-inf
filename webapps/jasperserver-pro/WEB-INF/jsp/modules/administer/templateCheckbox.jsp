<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<c:set var="oDesc" value="${(param.oDesc == null || param.oDesc == '') ? param.oName : param.oDesc}"/>

<li class="leaf first">
    <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
        <t:putAttribute name="containerClass" value="panel pane settings"/>
        <t:putAttribute name="containerTitle"><spring:message code="${param.oLabelCode}"/></t:putAttribute>
        <t:putAttribute name="bodyClass" value="twoColumn"/>
        <t:putAttribute name="bodyContent">
            <div class="column simple primary">
                <div class="control checkBox">
                    <label class="wrap" for="input_${param.oName}" title="<spring:message code='${param.oLabelCode}' />">
                        <spring:message code="${oDesc}"/>
                    </label>
                    <input ${param.oValue ? "checked=\"checked\"" : "" } id="input_${param.oName}" type="checkbox" value=""/>
                    <span class="message warning" id="error_${param.oName}">&nbsp;</span>
                </div>
            </div>
            <div class="column simple secondary">
                <fieldset class="actions">
                    <button id="save" name="${param.oName}" disabled="true" class="button action primary up"><span class="wrap"><spring:message code="button.change"/></span></button>
                    <button id="cancel" name="${param.oName}" value="${param.oValue}"  disabled="true" class="button action up"><span class="wrap"><spring:message code="button.cancel"/></span></button>
                </fieldset>
            </div>
        </t:putAttribute>
    </t:insertTemplate>
</li>
