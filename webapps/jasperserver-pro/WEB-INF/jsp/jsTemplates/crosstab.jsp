<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="t" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>


<script id="${olapCrosstabMode == 'selected' ? 'olap_crosstab' : 'crosstab'}Template" type="text/template">
    <js:xssNonce/>
{{
var olapCrosstabMode =  viewType == 'olap_crosstab' ? true : false;

var numberOfRowGroups =  rowGroups.length;
var numberOfColumnGroups =  crosstab.headerRows.length;
var measureIndex = crosstab.firstMeasureIndex;
var isMeasureInColumns =  crosstab.measureDimensionInColumns;
var measuresIsLastColumn =  !isMeasureInColumns || (measureIndex == numberOfColumnGroups - 1);
var measuresIsLastRow =  isMeasureInColumns || (measureIndex == numberOfRowGroups - 1);

var colGroupsPresent = crosstab.hasConcreteColumnGroups;
var rowGroupsPresent = crosstab.hasConcreteRowGroups;
var measuresPresent = crosstab.numberOfMeasures;

<%-- variables for generation "totals" columns for nonOLAP mode --%>
var lastHeaderOfFirstColumn = (colGroupsPresent && !olapCrosstabMode) ? crosstab.headerRows[0][crosstab.headerRows[0].length - 1] : null;
var totalsColumnSpanCount =  (colGroupsPresent && !olapCrosstabMode) ? (lastHeaderOfFirstColumn && lastHeaderOfFirstColumn.isSummaryCrosstabHeader ? lastHeaderOfFirstColumn.span : 0): 0;

<%-- fix for Bug #23149: 1000 is a max colspan value for IE --%>
var maxColspanCount =  1000 - numberOfRowGroups - (colGroupsPresent ? 2 : 1) - totalsColumnSpanCount;
var safeNumberOfRows = crosstab.safeMemberCount;
var safeNumberOfColumns =  crosstab.safeColumnMode ? crosstab.safeMemberCount : maxColspanCount;
<%--TODO: move to messages --%>
var nullDimension =  "NULL Dimension";
}}

{{ if (crosstab.queryStatus === 'OK') { }}
    <table js-stdnav="false" id="canvasTable"
        class="data table olap crosstab default"
        cellpadding="1" cellspacing="0">

        <caption class="caption">
            {{ if (titleBarShowing) { }}
                <div id="titleCaption">{{- title }}</div>
            {{ } }}
        </caption>
        <!-- rows of header rows -->
        <thead id="headerAxis">
            <%@ include file="crosstabHeaders.jsp" %>
        </thead>

        <!-- detail rows for row group summaries, measures and totals-->
        <tbody id="detailRows">
            <%@ include file="crosstabDetails.jsp" %>
        </tbody>
    </table>
{{ } }}
</script>
