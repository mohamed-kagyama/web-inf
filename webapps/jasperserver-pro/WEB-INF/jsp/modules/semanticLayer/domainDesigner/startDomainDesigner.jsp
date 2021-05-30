<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<script type="text/javascript">
    //${sessionScope.XSS_NONCE} do not remove
</script>

<t:insertTemplate template="/WEB-INF/jsp/templates/pageWithoutDisplayIdAndLegacyLayout.jsp">
    <t:putAttribute name="pageTitle"><spring:message code='domain.designer.page.title' javaScriptEscape='true'/></t:putAttribute>
    <t:putAttribute name="bodyClass" value="jr-jDomainDesigner"/>
    <t:putAttribute name="bodyID" value="domainDesigner"/>
    <t:putAttribute name="moduleName" value="domainDesigner/domainDesignerMain"/>
    <t:putAttribute name="bodyContent">
        <%-- loading dialog will be replaced with domain designer content after loading will be finished --%>
        <div class="jr-mDialog  jr-mDialogModal jr" style="position: absolute; left: calc(50% - 9.125em); top: calc(50% - 7.525em);">
            <div class="jr-mDialog-header jr">
                <h1 class="jr-mDialog-header-title jr"><spring:message code='dialog.overlay.loading'/></h1>
            </div>

            <div class="jr-mDialog-body jr-mDialog-bodyPadded jr">
                <div class="jr-mOverlay jr-mOverlayClear jr">
                    <div class="jr-mSpinner jr-mSpinnerPlain jr"></div>
                </div>
            </div>

            <div class="jr-mDialog-footer jr">
                <button onclick="history.back()" class="jr-mButton jr-mButtonText jr-mButtonPrimary jr-uWidth-100pc jr">
                    <span class="jr-mButton-label jr"><spring:message code='button.cancel'/></span>
                </button>
            </div>
        </div>
    </t:putAttribute>
</t:insertTemplate>