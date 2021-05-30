<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<script id="chartConstantState">
  <js:xssNonce type="javascript"/>
  //parent report menu
  localContext.showChartLabel = '<spring:message code="ADH_099a_SHOW_CHART" javaScriptEscape="true"/>';
  localContext.hideChartLabel = '<spring:message code="ADH_099b_HIDE_CHART" javaScriptEscape="true"/>';
  localContext.chartLabel = '<spring:message code="ADH_570_CHART_LABEL" javaScriptEscape="true"/>';
  localContext.seriesLabel = '<spring:message code="ADH_571_SERIES_LABEL" javaScriptEscape="true"/>';
  localContext.byLabel = '<spring:message code="ADH_572_BY_LABEL" javaScriptEscape="true"/>';
  //hover for quick arrow
  localContext.quickAdd = '<spring:message code="ADH_110b_CLICK_ARROW_CHART_ADD" javaScriptEscape="true"/>';
  localContext.quickReplace = '<spring:message code="ADH_110c_CLICK_ARROW_CHART_REPLACE" javaScriptEscape="true"/>';

  localContext.reportMenuTitle = '<spring:message code="ADH_019c_MENU_REPORT_TITLE_CHART" javaScriptEscape="true"/>';

  //padding
  localContext.chartPadding = ${viewModel.chartPadding};
</script>