<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<script id="adhocFilterState" type="text/javascript">
    <js:xssNonce type="javascript"/>
    localContext.numberOfExistingFilters = ${fn:length(viewModel.existingFilters)};
    //need to comment this out because of bug 24053
    //Because in other case during calling adhocDesigner.updateBase this script will evaluated (with incorrect data)
    //AFTER evaluating of baseState script where undoModeNames has correct value.
    //localContext.undoModeNames = "${viewModel.undoModeNames}".split(", ");
</script>

<%--
 HACK to fix bug 22529 - somewhy in IE <script id="adhocFilterState"> tag is not evaluated on AJAX request
 possibly due to compatibility mode.
 --%>
<textarea class="hidden" style="display:none" name="_evalScript">
    localContext.numberOfExistingFilters = ${fn:length(viewModel.existingFilters)};
    localContext.undoModeNames = "${viewModel.undoModeNames}".split(", ");
</textarea>