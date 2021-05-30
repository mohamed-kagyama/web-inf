<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<%--Apply input controls--%>

<jsp:include page="../inputControls/commonInputControlsImports.jsp" />

<script type="text/javascript">
    <js:out javaScriptEscape="true">
    if (typeof __jrsConfigs__.adhoc === "undefined") {
        __jrsConfigs__.adhoc = {}; // prepare variable to store all intermediate variables
    }

    __jrsConfigs__.adhoc.adhocDesigner = __jrsConfigs__.adhoc.adhocDesigner || {};
    __jrsConfigs__.adhoc.adhocDesigner.systemWarning = '${systemWarning}';
    __jrsConfigs__.adhoc.adhocDesignerViewModelViewType = "${viewModel.viewType}";
    </js:out>
</script>
