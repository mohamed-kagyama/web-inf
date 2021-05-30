<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="t" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<div id="highChartsRepo">
    <div id="chartOptions"></div>
    <ul id="chartMenu" class="menu vertical" style="display:none">
        <li class="leaf" action="chart-format">
        	<p class="wrap">
        		<span class="icon"></span>
                <spring:message code="ADH_1214_ICHARTS_MENU_ITEM_CHART_FORMAT"/>
            </p>
        </li>
    </ul>

    <div id="chartContainer"></div>

    <div id="chartFormatDialog" class="panel dialog overlay moveable centered_horz centered_vert hidden"></div>

    <div id="dataLevelSelector" class="panel dialog overlay data-level-selector moveable centered_horz centered_vert hidden">
        <div class="content">
            <div class="header mover">
                <div class="closeIcon"></div>
                <div class="title"><spring:message code="ADH_1214_ICHARTS_DATA_LEVEL_SELECTOR_TITLE"/></div>
            </div>
            <div class="body"></div>
        </div>
    </div>

    <script id="dataLevelSelectorTemplate" type="text/html">
        <tr>
            <js:xssNonce/>
            {{ if (label) { }}
            <td class="olap_level_name"><div><div class="olap_level_label">{{- label.name }}</div></div></td>
            {{ } }}
            <td><div class="jrs-slider"></div></td>
        </tr>
    </script>
    <script id="sliderTickTemplate" type="text/html">
        <div class="sliderTick" level-name="{{-label}}" style="left:{{-width}}%">
            <js:xssNonce/>
            <div class="tickOverlay"></div>
        </div>
    </script>
    <script id="titleCaptionTemplate" type="text/html">
        <div id="titleCaption" class="highChartsTitle shadow"></div>
        <js:xssNonce/>
    </script>
    <script id="levelSelectorTemplate" type="text/html">
        <table id="{{-id}}" cellspacing="10" class="levelSelector" style="display: table;">
            <js:xssNonce/>
            <tbody>
            <tr>
                <td colspan="{{-colspan}}" class="select-header">{{-name}}</td>
            </tr>
            </tbody>
        </table>
    </script>
</div>

