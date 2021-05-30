<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>


<li class="leaf last">
    <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
        <t:putAttribute name="containerClass" value="panel pane settings"/>
        <t:putAttribute name="containerTitle"><spring:message code='${param.oLabelCode}' /></t:putAttribute>
        <t:putAttribute name="bodyClass" value="twoColumn"/>
        <t:putAttribute name="bodyContent">
            <div class="column simple primary">
            <label class="control input text" for="input_${param.oName}" title="<spring:message code='${param.oLabelCode}' />">
                <span class="wrap"><spring:message code="${param.oDesc}"/></span>
                <select id="input_${param.oName}" name="">
                    <c:forEach items="${param.oSelectOptions}" var="option">
                        <option value="${option}" <c:if test="${option==param.oValue}"> "selected"</c:if> >${option}</option>
                    </c:forEach>
                </select>
                <span class="message warning" id="error_${param.oName}">&nbsp;</span>
            </label>
        </div>
        <div class="column simple secondary">
            <fieldset class="actions">
                <button id="save" name="${param.oName}" disabled="true" class="button action primary up"><span class="wrap"><spring:message code="button.change"/></span></button>
                <button id="cancel" name="${param.oName}" value="${param.oValue}" disabled="true" class="button action up"><span class="wrap"><spring:message code="button.cancel"/></span></button>
            </fieldset>
        </div>
        </t:putAttribute>
    </t:insertTemplate>
</li>
