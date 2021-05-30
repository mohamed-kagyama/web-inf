<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="tx" uri="http://tiles.apache.org/tags-tiles-extras"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<tx:useAttribute name="isColumnHeader" id="isColumnHeader" classname="java.lang.Boolean" ignore="false"/>
<tx:useAttribute name="tclass" id="tclass" classname="java.lang.String" ignore="false"/>
<tx:useAttribute name="id" id="id" classname="java.lang.String" ignore="false"/>
<tx:useAttribute name="isExpandable" id="isExpandable" classname="java.lang.Boolean" ignore="false"/>
<tx:useAttribute name="expanded" id="expanded" classname="java.lang.Boolean" ignore="false"/>
<tx:useAttribute name="cellContent" id="cellContent" classname="java.lang.String" ignore="false"/>
<tx:useAttribute name="canSort" id="canSort" classname="java.lang.Boolean" ignore="false"/>
<tx:useAttribute name="sortStatus" id="sortStatus" classname="java.lang.Number" ignore="false"/>
<tx:useAttribute name="rowspan" id="rowspan" classname="java.lang.Number" ignore="false"/>
<tx:useAttribute name="colspan" id="colspan" classname="java.lang.Number" ignore="false"/>
<tx:useAttribute name="isSummaryHeader" id="isSummaryHeader" classname="java.lang.Boolean" ignore="false"/>
<tx:useAttribute name="sliceable" id="sliceable" classname="java.lang.Boolean" ignore="false"/>
<tx:useAttribute name="path" id="path" classname="java.lang.String" ignore="false"/>

<c:if test="${isColumnHeader}">
<th
</c:if>
<c:if test="${!isColumnHeader}">
<td
</c:if>
    id="${id}"
    class="${tclass}"
    rowspan="${rowspan}"
    colspan="${colspan}"
    data-isSummaryHeader="${isSummaryHeader}"
    data-fieldValue="${cellContent}"
    data-sliceable="${sliceable}"
    data-expanable="${isExpandable}"
    data-path="${path}">
    <c:if test="${isExpandable}">
        <span class="button disclosure icon ${expanded ? 'open' : 'closed'}"></span>
    </c:if>
    <c:if test="${canSort}">
        <c:set var="sortIcon" value="${sortStatus == 1 ? 'ascending' : (sortStatus == 2 ? 'descending' : 'natural')}"/>
        <span class="icon button ${sortIcon}"></span>
    </c:if>
    <c:choose>
        <%-- This check is made only for case when we receiving empty string from DB. We are trying to prevent escaping &NBSP; --%>
        <%-- Better solution will be NOT to convert empty strings and null values to &nbsp; in java, but make this in templates. --%>
        <c:when test="${cellContent eq '&nbsp;'}">&nbsp;</c:when>
        <c:otherwise>
            <spring:message text="${cellContent}" htmlEscape="true" />
        </c:otherwise>
    </c:choose>
<c:if test="${isColumnHeader}">
</th>
</c:if>
<c:if test="${!isColumnHeader}">
</td>
</c:if>

<js:xssNonce/>