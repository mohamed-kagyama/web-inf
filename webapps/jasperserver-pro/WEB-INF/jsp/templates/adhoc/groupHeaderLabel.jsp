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

<tx:useAttribute name="headerClass" id="headerClass" classname="java.lang.String" ignore="false"/>
<tx:useAttribute name="id" id="id" classname="java.lang.String" ignore="false"/>
<tx:useAttribute name="levelName" id="levelName" classname="java.lang.String" ignore="false"/>
<tx:useAttribute name="dimensionName" id="dimensionName" classname="java.lang.String" ignore="false"/>
<tx:useAttribute name="isExpandable" id="isExpandable" classname="java.lang.Boolean" ignore="false"/>
<tx:useAttribute name="isLevelExpanded" id="isLevelExpanded" classname="java.lang.Boolean" ignore="false"/>
<tx:useAttribute name="cellContent" id="cellContent" classname="java.lang.String" ignore="false"/>
<tx:useAttribute name="rowspan" id="rowspan" classname="java.lang.Long" ignore="true"/>
<tx:useAttribute name="colspan" id="colspan" classname="java.lang.Long" ignore="true"/>

<th
    class="${headerClass}"
    id="${id}"
    data-level="${levelName}"
    data-dimension="${dimensionName}"
    data-expanable="${isExpandable}"
    <c:if test="${rowspan != null}">rowspan="${rowspan}"</c:if>
    <c:if test="${colspan != null}">colspan="${colspan}"</c:if>>

    <c:if test="${isExpandable}">
        <span class="button disclosure icon ${isLevelExpanded ? 'open' : 'closed'}"></span>
    </c:if>
    ${cellContent}
</th>

<js:xssNonce/>