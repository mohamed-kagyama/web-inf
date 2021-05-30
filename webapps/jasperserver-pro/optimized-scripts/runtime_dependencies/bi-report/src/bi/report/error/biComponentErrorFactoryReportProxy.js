/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory","./ReportStatusError","./ReportRenderError"],function(r,e,o){var n=r("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory"),t=r("./ReportStatusError"),i=r("./ReportRenderError");n.reportStatus=function(r){return new t(r)},n.reportRender=function(r){return new i(r)},o.exports=n});