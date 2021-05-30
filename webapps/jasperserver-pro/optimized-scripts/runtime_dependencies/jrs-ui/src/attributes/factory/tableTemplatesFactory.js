/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../../attributes/templates/attributesDesignerTemplate.htm","text!../../attributes/templates/attributesViewerTemplate.htm","text!../../attributes/templates/emptyViewerTemplate.htm"],function(t,e,a){var r=t("text!../../attributes/templates/attributesDesignerTemplate.htm"),m=t("text!../../attributes/templates/attributesViewerTemplate.htm"),i=t("text!../../attributes/templates/emptyViewerTemplate.htm");a.exports=function(t){return t=t||{},t.readOnly?t.empty?i:m:r}});