<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<script type="text/javascript" id="crosstabConstantState">
    <js:xssNonce type="javascript"/>
    <c:set var="props" value="${viewModel.propertyMap}"/>
    localContext.reportMenuTitle = '<spring:message code="ADH_019b_MENU_REPORT_TITLE_CROSSTAB" javaScriptEscape="true"/>';
    localContext.noDataTryFilterMessage = '<spring:message code="ADH_290_NO_DATA_TRY_FILTER" javaScriptEscape="true"/>';
    localContext.noDataMessage = '<spring:message code="ADH_291_NO_DATA" javaScriptEscape="true"/>';
    localContext.totalsLabel = '<spring:message code="ADH_231_TOTALS" javaScriptEscape="true"/>';
    localContext.overflowConfirmMessage = '<spring:message code="ADH_280_MORE_CONFIRM_MESSAGE" javaScriptEscape="true"/>';
    <c:choose>
    <c:when test="${olapCrosstabMode == 'selected'}">
    	localContext.missingDimensionMeasureMessage = '<spring:message code="ADH_264_XTAB_STATUS_MISSING_DIMENSION_MEASURE" javaScriptEscape="true"/>';
    	localContext.missingDimensionMessage = '<spring:message code="ADH_264_XTAB_STATUS_MISSING_DIMENSION" javaScriptEscape="true"/>';
    	    </c:when>
    <c:otherwise>
    	localContext.missingDimensionMeasureMessage = '<spring:message code="ADH_264_XTAB_STATUS_MISSING_FIELD_MEASURE" javaScriptEscape="true"/>';
    	localContext.missingDimensionMessage = '<spring:message code="ADH_264_XTAB_STATUS_MISSING_FIELD" javaScriptEscape="true"/>';
    </c:otherwise>
    </c:choose>
    localContext.missingMeasureMessage = '<spring:message code="ADH_264_XTAB_STATUS_MISSING_MEASURE" javaScriptEscape="true"/>';

    localContext.DEFAULT_CELL_WIDTH = "${viewModel.defaultCellWidth}";
</script>
