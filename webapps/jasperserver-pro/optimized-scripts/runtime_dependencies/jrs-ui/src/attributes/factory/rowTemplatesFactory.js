/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../../attributes/templates/rowDesignerEditTemplate.htm","text!../../attributes/templates/rowDesignerViewTemplate.htm","text!../../attributes/templates/emptyDesignerTemplate.htm","text!../../attributes/templates/rowViewTemplate.htm"],function(t,e,m){var r=t("text!../../attributes/templates/rowDesignerEditTemplate.htm"),a=t("text!../../attributes/templates/rowDesignerViewTemplate.htm"),i=t("text!../../attributes/templates/emptyDesignerTemplate.htm"),s=t("text!../../attributes/templates/rowViewTemplate.htm");m.exports=function(t){return t=t||{},t.readOnly?s:t.empty?i:t.editMode?r:a}});