/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react"],function(e,l,a){var t=e("react");l.SelectControl=function(e){return t.createElement("div",{className:"control"},t.createElement("label",null,e.label,":",t.createElement("select",{className:e.class,onChange:e.onChange,value:e.selectedValue},e.options.map(function(e){return t.createElement("option",{key:e.value,value:e.value},e.label)}))))}});