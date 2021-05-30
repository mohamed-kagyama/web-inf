/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory","./AdHocViewRenderError"],function(r,e,o){var n=r("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory"),i=r("./AdHocViewRenderError");n.adHocViewRender=function(r){return new i(r)},o.exports=n});