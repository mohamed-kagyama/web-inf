<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<script id="exportDataFileTemplate" type="text/template">
    <fieldset id="exportDataFile" class="item first">
        <js:xssNonce/>
        <legend class="">
            <span><spring:message code="export.file.name"/></span>
        </legend>
        <label for="filenameId">
            <input type="text" id="filenameId" value="{{-defaultFileName}}"/>
            <span id="fileNameMessage" class="message warning"></span>
        </label>
        <iframe id="exportFrame" src="" style="display: none" ></iframe>
        <div id="response"></div>
    </fieldset>
</script>

<script id="exportOptionsTemplatesShort" type="template/mustache">
    <fieldset id="exportOptions" class="group">
        <js:xssNonce/>
        <legend class="">
            <span><spring:message code="export.options"/></span>
        </legend>
        <ul class="list inputSet">
            <li class="leaf">
                <div class="control checkBox">
                    <label class="wrap" title="" for=""><spring:message code="export.include.permission"/></label>
                    <input id="includeRepositoryPermissions" class="" type="checkbox" value="" name="" {{ if (includeRepositoryPermissions) { }}checked="checked"{{ } }}>
                </div>
            </li>
            <li class="leaf">
                <div class="control checkBox">
                    <label class="wrap" title="" for=""><spring:message code="export.report.job"/></label>
                    <input id="includeReportJobs" class="" type="checkbox" value="" name="" {{ if (includeReportJobs) { }}checked="checked"{{ } }}>
                </div>
            </li>
        </ul>
    </fieldset>
</script>

<script id="exportOptionsTemplates" type="template/mustache">
        <fieldset id="exportOptions" class="group">
            <js:xssNonce/>
            <legend class="">
                <span><spring:message code="export.options"/></span>
            </legend>
            <ul class="list inputSet">
                <li class="leaf">
                    <div class="control checkBox">
                        <label class="wrap" title="" for=""><spring:message code="export.everything"/></label>
                        <input id="everything" class="" type="checkbox" value="" name="" {{if (everything) { }}checked="checked"{{ } }}>
                    </div>
                </li>
                <li class="leaf">
                    <fieldset id="userRoleSelection" class="group">
                        <legend class="">
                            <span><spring:message code="export.user.role.selection"/></span>
                        </legend>
                    <ul class="list inputSet">
                        <li class="leaf">
                            <div class="control radio">
                                <label class="wrap" for="noUsersRoles" title=""><spring:message code="export.not.include.users.roles"/></label>
                                <input class="" id="noUsersRoles" type="radio" name="sample" value="" checked="checked">
                            </div>
                        </li>
                        <li class="leaf">
                            <div class="control radio">
                                <label class="wrap" for="roleUsers" title=""><spring:message code="export.role.users"/></label>
                                <input class="" id="roleUsers" type="radio" name="sample" value="" {{if (userForRoles) { }}checked="checked"{{ } }}>
                            </div>
                        </li>
                        <li class="leaf">
                            <div class="control radio">
                                <label class="wrap" for="usersRoles" title="There must be a title"><spring:message code="export.users.roles"/></label>
                                <input class="" id="usersRoles" type="radio" name="sample" value="" {{if (rolesForUser) { }}checked="checked"{{ } }}>
                            </div>
                        </li>
                        <li class="leaf">
                            <fieldset id="selectRolesUsers" class="column two control pickWells">

                            </fieldset>
                        </li>
                    </ul>
                        </fieldset>
                </li>
                <li class="leaf">
                    <div class="control checkBox">
                        <label class="wrap" title="" for=""><spring:message code="export.include.access.events"/></label>
                        <input id="includeAccessEvents" class="" type="checkbox" value="" name="" {{if (includeAccessEvents) { }}checked="checked"{{ } }}>
                    </div>
                </li>
                <li class="leaf">
                    <div class="control checkBox">
                        <label class="wrap" title="" for=""><spring:message code="export.include.audit.events"/></label>
                        <input id="includeAuditEvents" class="" type="checkbox" value="" name="" {{ if (includeAuditEvents) { }}checked="checked"{{ } }}>
                    </div>
                </li>
                <li class="leaf">
                    <div class="control checkBox">
                        <label class="wrap" title="" for=""><spring:message code="export.include.monitoring.events"/></label>
                        <input id="includeMonitoringEvents" class="" type="checkbox" value="" name="" {{if (includeMonitoringEvents) { }}checked="checked"{{ } }}>
                    </div>
                </li>
            </ul>
        </fieldset>
</script>

<script id="controlButtonsTemplate" type="text/template">
        <button id="exportButton" class="button action primary up">
            <span class="wrap"><spring:message code="export.export"/></span>
            <span class="icon"></span>
        </button>
        <js:xssNonce/>
        <button id="cancelExportButton" class="hidden button action up cancel">
            <span class="wrap"><spring:message code="button.cancel"/>
                <span class="icon"></span>
        </button>
</script>

    <script id="authorityPickerTemplate" type="text/template">
    <div class="control combo {{-customClass}} " title="{{-title}}">
    <js:xssNonce/>
    <span class="wrap">{{-title}}:</span>
        <span class="control searchLockup ">
            <div class="wrap">
                <input type="text" tabindex="">
            </div>
            <b class="right">
                <a class="button searchClear"></a>
            </b>
            <a class="button search up"></a>
        </span>

        <div class="authorityPicker" onselectstart="return false">
             <div class="selectBorder upper"></div>
            <ul class="list">
                {{options}}
            </ul>
             <div class="selectBorder lower"></div>
        </div>
    </div>
</script>

<script id="authorityPickerOptions" type="text/template">
    {{if (items) { }}<li class="leaf"><div class=""><span class="leftColumn">{{-name}}{{-username}}</span>{{if (tenantId) { }}<span class="rightColumn">{{-tenantId}}</span>{{ } }}</div></li>{{ } }}
    <js:xssNonce/>
</script>

<script id="exportsDialogTemplate" type="text/template">
    <t:insertTemplate template="/WEB-INF/jsp/templates/exportDialog.jsp">
        <t:putAttribute name="containerClass" value="hidden centered_vert centered_horz"/>
    </t:insertTemplate>
    <js:xssNonce/>
</script>