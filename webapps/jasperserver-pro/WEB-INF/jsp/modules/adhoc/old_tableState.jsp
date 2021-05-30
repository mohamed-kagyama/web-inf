<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<script id="tableState" type="text/javascript">
    <js:xssNonce type="javascript"/>

    localContext.hasNodata = ${viewModel.hasNoData};
    localContext.columns = ${viewModel.columnsJSON};
    localContext.groups = ${viewModel.groupsJSON};
    localContext.sortFields = ${viewModel.sortFieldsJSON};
    localContext.summarizedFields = ${viewModel.summarizedColumnsJSON};
    localContext.fieldsInUse = ${viewModel.fieldsInUseJSON};
    localContext.endOfFile = ${viewModel.allDataFetched};
    localContext.lastCalcFieldAdded = ${viewModel.lastCalcFieldAddedJSON};
    ROW_SIZE_TO_TRIGGER_SCROLLBAR = ${viewModel.rowSizeToTriggerScrollbar};
    localContext.reportMenuTitle = '<spring:message code="ADH_019a_MENU_REPORT_TITLE_TABLE" javaScriptEscape="true"/>';
    localContext.messages = {};
    localContext.messages['cantAddSet'] = '<spring:message code="ADH_109_CANT_ADD_SET" javaScriptEscape="true"/>';
</script>