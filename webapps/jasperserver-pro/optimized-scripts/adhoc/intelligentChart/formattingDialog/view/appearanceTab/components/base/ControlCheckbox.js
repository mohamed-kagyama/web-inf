/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react"],function(e,t,n){var c=e("react");t.ControlCheckbox=function(e){return c.createElement("div",{className:"control checkBox"},c.createElement("label",{htmlFor:e.id},e.label),c.createElement("input",{id:e.id,name:e.id,type:"checkbox",defaultChecked:e.defaultChecked,onChange:e.onChange}))}});