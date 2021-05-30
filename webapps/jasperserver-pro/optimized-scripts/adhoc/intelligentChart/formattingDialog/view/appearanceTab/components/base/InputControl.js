/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react"],function(e,t,n){var a=e("react");t.InputControl=function(e){return a.createElement("div",{className:"control"},a.createElement("label",null,e.label,":",a.createElement("input",{type:"text",className:e.class,value:e.value,onChange:e.onChange})))}});