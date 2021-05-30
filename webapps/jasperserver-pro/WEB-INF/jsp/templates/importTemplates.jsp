<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<script id="importMainTemplate" type="text/template">
<form id="fileUploadForm" method="post" enctype="multipart/form-data" action="rest_v2/import">
    <fieldset id="importDataFile" class="group">
        <legend class="">
            <span><spring:message code="import.file.name"/></span>
            <js:xssNonce/>
        </legend>
        <label for="uploadFile">
            <input name="file" id="uploadFile" type="file" />
            <span class="message warning" id="fileMessage"><spring:message code="import.select.import.file"/></span>
        </label>
    </fieldset>
    <fieldset id="importOptions" class="group">
        <legend class="">
            <span><spring:message code="import.options"/></span>
        </legend>
        <ul class="list inputSet">
            <li class="leaf">
                <div class="control checkBox">
                    <label class="wrap" title="" for=""><spring:message code="import.update"/></label>
                    <input id="update" class="" type="checkbox" value="" name="update" {{ if (update) {}}checked="checked"{{ } }}>
                </div>
                <ul class="list inputSet">
                    <li class="leaf">
                        <div class="control checkBox">
                            <label class="wrap" title="" for=""><spring:message code="import.skip.user.update"/></label>
                            <input id="skipUserUpdate" class="" type="checkbox" value="" name="skip-user-update" {{ if (skipUserUpdate) { }}checked="checked"{{ } }}>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="leaf">
                <div class="control checkBox">
                    <label class="wrap" title="" for=""><spring:message code="export.include.audit.events"/></label>
                    <input id="includeAuditEvents" class="" type="checkbox" name="include-audit-events" {{ if (includeAuditEvents) { }}checked="checked"{{ } }}>
                </div>
            </li>
            <li class="leaf">
                <div class="control checkBox">
                    <label class="wrap" title="" for=""><spring:message code="export.include.access.events"/></label>
                    <input id="includeAccessEvents" class="" type="checkbox" value="" name="include-access-events" {{ if (includeAccessEvents) { }}checked="checked"{{ } }} >
                </div>
            </li>
            <li class="leaf">
                <div class="control checkBox">
                    <label class="wrap" title="" for=""><spring:message code="export.include.monitoring.events"/></label>
                    <input id="includeMonitoringEvents" class="" type="checkbox" value="" name="include-monitoring-events" {{ if (includeMonitoringEvents) { }}checked="checked"{{ } }} >
                </div>
            </li>
            <li class="leaf">
                <div class="control checkBox">
                    <label class="wrap" for=""><spring:message code="import.include.configuration.settings"/></label>
                    <input id="" class="" type="checkbox" value="" name="include-server-settings" {{ if (includeConfigurationSettings) { }}checked="checked"{{ } }}>
                </div>
            </li>
        </ul>
    </fieldset>
</form>
</script>

<script id="importFooterTemplate" type="text/template">
<fieldset id="controlButtons">
    <button id="importButton" class="button action primary up" disabled="disabled">
        <span class="wrap"><spring:message code="import.import"/></span>
        <span class="icon"></span>
    </button>
    <js:xssNonce/>
</fieldset>
</script>
