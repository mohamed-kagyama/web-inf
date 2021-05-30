<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%@ include file="../common/jsEdition.jsp" %>
<%@ page import="com.jaspersoft.ji.license.LicenseManager" %>
<%
    LicenseManager licenseManager = LicenseManager.getInstance();
%>
<c:set var="mtSupportedToDelete" value="<%=licenseManager.isMTSupportedToDelete()%>"/>
<c:set var="mtFeatureSupported" value="<%=licenseManager.isMultitenancyFeatureSupported()%>"/>


<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <c:if test="${mtSupportedToDelete}">
        <t:putAttribute name="pageTitle">
            <spring:message code="MT_MANAGE_ORG" javaScriptEscape="true"/>
        </t:putAttribute>
        <t:putAttribute name="bodyID" value="manage_orgs"/>
        <t:putAttribute name="bodyClass">threeColumn manager</t:putAttribute>
        <t:putAttribute name="moduleName" value="manage/manageOrgsMain"/>
        <t:putAttribute name="headerContent" >
            <jsp:include page="orgsState.jsp"/>
        </t:putAttribute>
        <t:putAttribute name="bodyContent">
            <t:insertTemplate template="/WEB-INF/jsp/templates/pageHeader.jsp">
                <t:putAttribute name="pageHeaderIconClass" value="manageOrgs" cascade="false"/>
                <t:putAttribute name="pageHeaderText">
                    <spring:message code="MT_MANAGE_ORG" javaScriptEscape="true"/>
                </t:putAttribute>
            </t:insertTemplate>
            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerID" value="organizations"/>
                <t:putAttribute name="containerClass" value="column decorated primary showingToolBar"/>
                <t:putAttribute name="subHeaderContent" >
                    <div class="toolbar">
                        <ul class="list buttonSet">
                            <c:if test="${mtFeatureSupported}">
                                <li class="node open">
                                    <ul class="list buttonSet">
                                        <%--bug 18939: &#8230 changed to "..." --%>
                                        <li class="leaf"><button id="addNewOrgBtn" class="button capsule text first up"><span class="wrap"><spring:message code="MT_ADD_ORG" javaScriptEscape="true"/>...</span><span class="icon"></span></button></li>
                                    </ul>
                                </li>
                            </c:if>
                            <li class="node open">
                                <ul class="list buttonSet">
                                    <li class="leaf"><button id="deleteAllOrgsBtn" class="button capsule text up" disabled="disabled"><span class="wrap"><spring:message code="jsp.userAndRoleManager.deleteAll" javaScriptEscape="true"/></span><span class="icon"></span></button></li>
                                </ul>
                            </li>
                        </ul>
                    <t:insertTemplate template="/WEB-INF/jsp/templates/control_searchLockup.jsp">
                        <t:putAttribute name="containerID" value="secondarySearchBox"/>
                        <t:putAttribute name="inputID" value="secondarySearchInput"/>
                    </t:insertTemplate>
                    </div>
                    <t:insertTemplate template="/WEB-INF/jsp/modules/manage/manageColumnTitle.jsp">
                        <t:putAttribute name="columnClass" value="threeColumn"/>
                        <t:putAttribute name="firstColumnTitle">
                            <spring:message code="MT_ORG_ID" javaScriptEscape="true"/>
                        </t:putAttribute>
                        <t:putAttribute name="secondColumnTitle">
                            <spring:message code="MT_ORG_NAME" javaScriptEscape="true"/>
                        </t:putAttribute>
                        <t:putAttribute name="thirdColumnTitle">
                            <spring:message code="MT_CHILD_ORG" javaScriptEscape="true"/>
                        </t:putAttribute>
                    </t:insertTemplate>
                </t:putAttribute>
                <t:putAttribute name="bodyID" value="listContainer"/>
                <t:putAttribute name="bodyContent">
                    <ol id="entitiesList"></ol>
                </t:putAttribute>
                <t:putAttribute name="footerContent">
                </t:putAttribute>
            </t:insertTemplate>


            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerID" value="folders"/>
                <t:putAttribute name="containerClass" value="column decorated secondary sizeable"/>
                <t:putAttribute name="containerElements">
                    <div class="sizer horizontal"></div>
                    <button class="button minimize"></button>
                    <div class="icon minimize"></div>
                </t:putAttribute>
                <t:putAttribute name="containerTitle">
                    <spring:message code="MT_ORGANIZATIONS" javaScriptEscape="true"/>
                </t:putAttribute>
                <t:putAttribute name="bodyClass" value=""/>
                <t:putAttribute name="bodyContent" >
                        <ul id="orgTree"></ul>
                        <div id="ajaxbuffer"></div>
                </t:putAttribute>
            </t:insertTemplate>

            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerID" value="properties"/>
                <t:putAttribute name="containerClass" value="column decorated tertiary sizeable"/>
                <t:putAttribute name="containerElements">
                    <div class="sizer horizontal"></div>
                    <button class="button minimize"></button>
                    <div class="icon minimize"></div>
                </t:putAttribute>
                <t:putAttribute name="containerTitle"><spring:message code="jsp.userAndRoleManager.properties" javaScriptEscape="true"/></t:putAttribute>
                <t:putAttribute name="bodyClass" value=""/>

                <t:putAttribute name="headerContent">
                    <div class="tabs">
                        <ul class="control tabSet buttons horizontal ">
                            <li class="tab first selected" tabId="#propertiesTab">
                                <a class="button" id="option_1">
                                    <span class="wrap"><spring:message code="jsp.userAndRoleManager.properties" javaScriptEscape="true"/></span>
                                </a>
                            </li>
                            <!--/.tab-->
                            <li class="tab" tabId="#attributesTab">
                                <a class="button" id="option_2">
                                    <span class="wrap"><spring:message code="jsp.attributes.attributes"/></span>
                                </a>
                            </li>
                        </ul>
                    <div class="control tabSet anchor"></div>
                    </div>
                </t:putAttribute>

                <t:putAttribute name="bodyContent">
                    <div id="propertiesTab">
                        <t:insertTemplate template="/WEB-INF/jsp/templates/nothingToDisplay.jsp">
                            <t:putAttribute name="bodyContent">
                                <div class="content ">
                                    <div id="nothingToDisplayMessage" class="message">
                                        <span class="jr-mInstructor-icon jr-mIcon jr-mIconXLarge jr-message jr"></span>
                                        <span class="message-text crosstab chart"><spring:message code="MT_ORG_NOTHING_TO_DISPLAY" javaScriptEscape="true"/></span>
                                    </div>
                                </div>
                            </t:putAttribute>
                        </t:insertTemplate>

                        <fieldset class="group">
                            <legend class="offLeft"><span><spring:message code="dialog.file.nameAndDescription" javaScriptEscape="true"/></span></legend>
                            <label class="control input text" class="required" for="orgName" title="<spring:message code="MT_ORG_NAME_TEXT" javaScriptEscape="true"/>">
                                <span class="wrap"><spring:message code="MT_ORG_NAME" javaScriptEscape="true"/>:</span>
                                <input class="" id="orgName" type="text" maxlength="100" value="" readonly="readonly"/>
                                <span class="message warning"></span>
                            </label>
                            <label class="control input text" for="orgID" title="<spring:message code="MT_ORG_ID_TEXT" javaScriptEscape="true"/>">
                                <span class="wrap"><spring:message code="MT_ORG_ID" javaScriptEscape="true"/>:</span>
                                <input class="" id="orgID" type="text" maxlength="100" value="" readonly="readonly"/>
                                <span class="hint"><spring:message code="MT_ORG_ID_HINT" javaScriptEscape="true"/></span>
                                <span class="message warning"></span>
                            </label>
                            <label class="control input text" class="required" for="orgAlias" title="<spring:message code="MT_ORG_ALIAS_TEXT" javaScriptEscape="true"/>">
                                <span class="wrap"><spring:message code="MT_ORG_ALIAS" javaScriptEscape="true"/>:</span>
                                <input class="" id="orgAlias" type="text" maxlength="100" value="" readonly="readonly"/>
                                <span class="message warning"></span>
                            </label>
                            <label class="control textArea" for="orgDesc" title="<spring:message code="MT_DESC_TEXT" javaScriptEscape="true"/>">
                                <span class="wrap"><spring:message code="MT_DESCRIPTION" javaScriptEscape="true"/>:</span>
                                <textarea id="orgDesc" type="text" rows="3" cols="30" maxlength="250" readonly="readonly"/></textarea>
                                <span class="message warning"></span>
                            </label>
                        </fieldset>
                        <fieldset id="attributes" class="group">
                                <ul class="list type_attributes">
                                    <li class="node"><span class="label wrap"><spring:message code="MT_NUM_OF_USERS" javaScriptEscape="true"/>:</span>
                                        <span id="assignedUsers">0</span> (<a id="manageUsers" class="launcher"><spring:message code="form.manage" javaScriptEscape="true"/>&#8230;</a>)
                                    </li>
                                    <li class="node"><span class="label wrap"><spring:message code="MT_NUM_OF_ROLES" javaScriptEscape="true"/>:</span>
                                        <span id="assignedRoles">0</span> (<a id="manageRoles" class="launcher"><spring:message code="form.manage" javaScriptEscape="true"/>&#8230;</a>)
                                    </li>
                                    <li class="node"><span class="label wrap"><spring:message code="jsp.userManager.profileAttributes" javaScriptEscape="true"/>:</span></li>
                                </ul>
                        </fieldset>
                    </div>

                    <div id="attributesTab">
                    </div>
                </t:putAttribute>
                <t:putAttribute name="footerID" value="propertiesButtons"/>
                <t:putAttribute name="footerContent">
                    <button id="delete" class="button action up"><span class="wrap"><spring:message code="MT_DELETE" javaScriptEscape="true"/></span><span class="icon"></span></button>
                    <button id="edit" class="button action primary up"><span class="wrap"><spring:message code="form.edit" javaScriptEscape="true"/></span><span class="icon"></span></button>
                    <button id="save" class="button action primary up"><span class="wrap"><spring:message code="form.edit.save" javaScriptEscape="true"/></span><span class="icon"></span></button>
                    <button id="cancel" class="button action up"><span class="wrap"><spring:message code="form.edit.cancel" javaScriptEscape="true"/></span><span class="icon"></span></button>
                </t:putAttribute>
            </t:insertTemplate>

            <t:insertTemplate template="/WEB-INF/jsp/templates/addOrganization.jsp">
                <t:putAttribute name="containerClass" value="hidden"/>
            </t:insertTemplate>


        </t:putAttribute>
    </c:if>
    <c:if test="${!mtSupportedToDelete}">
        <t:putAttribute name="pageTitle"><spring:message code='LIC_019_license.failed'/></t:putAttribute>
        <t:putAttribute name="bodyID" value="licenseError"/>
        <t:putAttribute name="bodyClass" value="oneColumn"/>

        <t:putAttribute name="bodyContent" >
            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerClass" value="column decorated primary noHeader"/>
                <t:putAttribute name="containerTitle"><spring:message code='LIC_019_license.failed'/></t:putAttribute>
                <t:putAttribute name="bodyClass" value="flow"/>
                <t:putAttribute name="bodyContent">
                <div id="flowControls">

                </div>
                    <div id="stepDisplay">
                        <fieldset class="row instructions">
                            <h2 class="textAccent02"><spring:message code='LIC_014_feature.not.licensed.multitenancy'/></h2>
                            <h4><spring:message code='LIC_020_licence.contact.support'/></h4>
                        </fieldset>
                    </div>
                </t:putAttribute>
            </t:insertTemplate>
        </t:putAttribute>
    </c:if>


</t:insertTemplate>
