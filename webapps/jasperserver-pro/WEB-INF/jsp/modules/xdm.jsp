<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
  ~ Licensed pursuant to commercial TIBCO End User License Agreement.
  --%>

<jsp:include page="setScriptOptimizationProps.jsp"/>

<!DOCTYPE html>
<html>
<head>

    <%@ include file="common/jsEdition.jsp" %>

        <script type="text/javascript" src="${scriptsUri}/runtime_dependencies/requirejs/require.js"></script>
        <script type="text/javascript" src="${scriptsUri}/require.config.js"></script>

        <c:if test="${param['logEnabled'] == 'true'}">
            <script type="text/javascript">
                requirejs.config({
                    config: {
                        logger: {enabled: true}
                    }
                });

                <c:if test="${param['logLevel'] != null}">
                requirejs.config({
                    config: {
                        logger: {level: "${param['logLevel']}"}
                    }
                });
                </c:if>
            </script>
        </c:if>

    <script type="text/javascript">
        requirejs.config({
            baseUrl: "${scriptsUri}"
        });
        requirejs(["xdmRemote/xdmRemoteMain"]);
    </script>

</head>
<body></body>
</html>
