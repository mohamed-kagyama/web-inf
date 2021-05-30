<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%@ page import="com.jaspersoft.commons.semantic.ConfigurationObject" %>

<%!
    private String maxExecutionTimeSec;
    private String maxResultSetRows;
    private String maxAvailableValues;
    private String displayNullAsZeroForAggregateValue;
    private String canViewQuery;
%><%
    canViewQuery = (String)request.getAttribute("canViewQuery");
    maxAvailableValues = (String)request.getAttribute("maxAvailableValues");
    maxResultSetRows = (String)request.getAttribute("maxResultSetRows");
    maxExecutionTimeSec = (String)request.getAttribute("maxExecutionTimeSec");
    displayNullAsZeroForAggregateValue = (String)request.getAttribute("displayNullAsZeroForAggregateValue");
%>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code="menu.adhoc.options"/></t:putAttribute>
    <t:putAttribute name="bodyID" value="designerOptions"/>
    <t:putAttribute name="bodyClass" value="twoColumn"/>
    <t:putAttribute name="moduleName" value="administer/administerAdhocOptionsMain"/>
    <t:putAttribute name="headerContent">
        <%@ include file="administerState.jsp" %>
    </t:putAttribute>
    <t:putAttribute name="bodyContent">
		<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerID" value="settings"/>
		    <t:putAttribute name="containerClass" value="column decorated primary"/>
		    <t:putAttribute name="containerTitle"><spring:message code="menu.adhoc.options"/></t:putAttribute>
		    <t:putAttribute name="bodyClass" value=""/>
		    <t:putAttribute name="bodyContent">
                <ol class="list settings">
                    <li class="node">
                        <div class="wrap">
                            <h2 class="title settingsGroup"><spring:message code="QG_106_GENERAL"/></h2>
                        </div>
                        <p class="description"><spring:message code="QG_106_GENERAL_EXPLAIN"/></p>
                        <ol class="list settings">
                            <jsp:include page="templateCheckbox.jsp" flush="true">
                                <jsp:param name="oName" value="canViewQuery"/>
                                <jsp:param name="oDesc" value="QG_107_VIEW_QUERY_EXPLAIN"/>
                                <jsp:param name="oLabelCode" value="QG_107_VIEW_QUERY"/>
                                <jsp:param name="oValue" value="<%=canViewQuery%>"/>
                            </jsp:include>
                            <jsp:include page="templateCheckbox.jsp" flush="true" >
                                <jsp:param name="oName" value="displayNullAsZeroForAggregateValue"/>
                                <jsp:param name="oDesc" value="QG_107_DISPLAY_NULL_AS_ZERO_EXPLAIN"/>
                                <jsp:param name="oLabelCode" value="QG_107_DISPLAY_NULL_AS_ZERO"/>
                                <jsp:param name="oValue" value="<%=displayNullAsZeroForAggregateValue%>"/>
                            </jsp:include>
                        </ol>
                    </li>
					<li class="node">
						<div class="wrap">
							<h2 class="title settingsGroup"><spring:message code="QG_100_QUERY_LIMITS"/></h2>
						</div>
						<p class="description"><spring:message code="QG_100_QUERY_LIMITS_EXPLAIN"/></p>
						<ol class="list settings">
                            <jsp:include page="templateInputText.jsp" flush="true">
                                <jsp:param name="oName" value="maxAvailableValues"/>
                                <jsp:param name="oDesc" value="QG_101_MAX_AVAILABLE_VALUES_EXPLAIN"/>
                                <jsp:param name="oLabelCode" value="QG_101_MAX_AVAILABLE_VALUES"/>
                                <jsp:param name="oValue" value="<%=maxAvailableValues%>"/>
                            </jsp:include>
                            <jsp:include page="templateInputText.jsp" flush="true" >
                                <jsp:param name="oName" value="maxResultSetRows"/>
                                <jsp:param name="oDesc" value="QG_102_MAX_ROWS_EXPLAIN"/>
                                <jsp:param name="oLabelCode" value="QG_102_MAX_ROWS"/>
                                <jsp:param name="oValue" value="<%=maxResultSetRows%>"/>
                            </jsp:include>
                            <jsp:include page="templateInputText.jsp" flush="true" >
                                <jsp:param name="oName" value="maxExecutionTimeSec"/>
                                <jsp:param name="oDesc" value="QG_103_MAX_SECS_EXPLAIN"/>
                                <jsp:param name="oLabelCode" value="QG_103_MAX_SECS"/>
                                <jsp:param name="oValue" value="<%=maxExecutionTimeSec%>"/>
                            </jsp:include>

                        </ol>
                    </li>
                    <li class="node">
                        <div class="wrap">
                            <h2 class="title settingsGroup"><spring:message code="QG_100_DATA_POLICIES"/></h2>
                        </div>
                        <p class="description"><spring:message code="QG_100_DATA_POLICIES_EXPLAIN"/></p>
                        <ol class="list settings">
                              <jsp:include page="templateCheckbox.jsp" flush="true" >
                                  <jsp:param name="oName" value="domainDataStrategy"/>
                                  <jsp:param name="oDesc" value="QG_104_DOMAIN_STRATEGY_ENABLED_EXPLAIN"/>
                                  <jsp:param name="oLabelCode" value="QG_104_DOMAIN_STRATEGY_ENABLED"/>
                                  <jsp:param name="oValue" value='<%=request.getAttribute("domainStrategyEnabled")%>'/>
                              </jsp:include>
                              <jsp:include page="templateCheckbox.jsp" flush="true" >
                                  <jsp:param name="oName" value="sqlQueryDataStrategy"/>
                                  <jsp:param name="oDesc" value="QG_105_SQL_STRATEGY_ENABLED_EXPLAIN"/>
                                  <jsp:param name="oLabelCode" value="QG_105_SQL_STRATEGY_ENABLED"/>
                                  <jsp:param name="oValue" value='<%=request.getAttribute("sqlStrategyEnabled")%>'/>
                              </jsp:include>

                        </ol>
					</li>
                </ol>

		    </t:putAttribute>
		    <t:putAttribute name="footerContent">
		    </t:putAttribute>
		</t:insertTemplate>

		<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
		    <t:putAttribute name="containerID" value="serverSettingsMenu"/>
		    <t:putAttribute name="containerClass" value="column decorated secondary sizeable"/>
            <t:putAttribute name="containerElements">
                <div class="sizer horizontal"></div>
                <button class="button minimize"></button>
            </t:putAttribute>
		    <t:putAttribute name="containerTitle"><spring:message code="menu.settings"/></t:putAttribute>
		    <t:putAttribute name="bodyClass" value=""/>
		    <t:putAttribute name="bodyContent">
		    	<!--
		    	   NOTE: these objects serve as navigation links, load respective pages
		    	 -->
                <ul class="list responsive filters">
                    <li class="leaf"><p class="wrap button" id="navLogSettings"><b class="icon"></b><spring:message code="menu.log.Settings"/></p></li>
                    <li class="leaf"><p class="wrap button" id="logCollectors"><b class="icon"></b><spring:message code="logCollectors.title"/></p></li>
                    <li class="leaf selected"><p class="wrap button" id="navDesignerOptions"><b class="icon"></b><spring:message code="menu.adhoc.options"/></p></li>
                    <li class="leaf"><p class="wrap button" id="navDesignerCache"><b class="icon"></b><spring:message code="menu.adhoc.cache"/></p></li>
                    <li class="leaf"><p class="wrap button" id="navAnalysisOptions"><b class="icon"></b><spring:message code="menu.mondrian.properties"/></p></li>
                    <li class="leaf"><p class="wrap button" id="navAwsSettings"><b class="icon"></b><spring:message code="menu.aws.settings"/></p></li>
                    <li class="leaf"><p class="wrap button" id="navCustomAttributes"><b class="icon"></b><spring:message code="menu.server.attributes"/></p></li>
                    <li class="leaf"><p class="wrap button" id="navResetSettings"><b class="icon"></b><spring:message code="menu.edit.settings"/></p></li>
                    <li class="leaf"><p class="wrap button" id="navImport"><b class="icon"></b><spring:message code="import.import"/></p></li>
                    <li class="leaf"><p class="wrap button" id="navExport"><b class="icon"></b><spring:message code="export.export"/></p></li>
                    <li class="leaf" disabled="disabled"><p class="wrap separator" href="#"><b class="icon"></b></p></li>
                </ul>
		    </t:putAttribute>
		    <t:putAttribute name="footerContent">
		    </t:putAttribute>
		</t:insertTemplate>

	</t:putAttribute>

</t:insertTemplate>
