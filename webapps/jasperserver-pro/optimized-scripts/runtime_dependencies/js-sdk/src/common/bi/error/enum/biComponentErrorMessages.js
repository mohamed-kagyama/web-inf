/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./biComponentErrorCodes"],function(R,e,r){var E=R("./biComponentErrorCodes"),o={};o[E.UNEXPECTED_ERROR]="An unexpected error has occurred",o[E.SCHEMA_VALIDATION_ERROR]="JSON schema validation failed",o[E.UNSUPPORTED_CONFIGURATION_ERROR]="Unsupported configuration provided",o[E.AUTHENTICATION_ERROR]="Authentication error",o[E.AUTHORIZATION_ERROR]="Authorization error",o[E.CONTAINER_NOT_FOUND_ERROR]="Container was not found in DOM",o[E.REPORT_EXECUTION_FAILED]="Report execution failed",o[E.REPORT_EXECUTION_CANCELLED]="Report execution was cancelled",o[E.REPORT_EXPORT_FAILED]="Report export failed",o[E.REPORT_EXPORT_CANCELLED]="Report export was cancelled",o[E.REPORT_RENDER_ERROR]="Report render error",o[E.REPORT_RENDER_HIGHCHARTS_ERROR]="Highcharts render error",o[E.INPUT_CONTROLS_VALIDATION_ERROR]="InputControls validation error",o[E.ALREADY_DESTROYED_ERROR]="Component has been already destroyed",o[E.NOT_YET_RENDERED_ERROR]="Component has not yet been rendered",o[E.AD_HOC_VIEW_RENDER_ERROR]="Ad Hoc View render error",r.exports=o});