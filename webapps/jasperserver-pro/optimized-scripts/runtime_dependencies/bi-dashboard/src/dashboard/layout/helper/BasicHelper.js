/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/util/classUtil","underscore","backbone"],function(n,t,e){var o=n("runtime_dependencies/js-sdk/src/common/util/classUtil"),i=n("underscore"),c=n("backbone"),s=o.extend({constructor:function(n){this.strategy=n},init:function(n){this.container=n},start:function(n){},drag:function(n){},stop:function(n){},drop:function(n,t){},deinit:function(){}});i.extend(s.prototype,c.Events),e.exports=s});