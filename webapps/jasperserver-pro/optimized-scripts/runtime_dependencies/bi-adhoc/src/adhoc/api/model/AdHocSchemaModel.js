/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone"],function(e,n,t){function r(e,n){for(var t,o=e.length-1;o>-1&&!t;o--)if(e[o].group)t=r(e[o].group.elements,n);else{if(!e[o].element)throw new Error("Unknown element type in schema");e[o].element.hierarchicalName===n&&(t=e[o].element)}return t}var o=e("backbone"),i=o.Model.extend({initialize:function(e,n){this.contextPath=n.contextPath},getByReference:function(e){return r(this.get("presentation"),e)}});t.exports=i});