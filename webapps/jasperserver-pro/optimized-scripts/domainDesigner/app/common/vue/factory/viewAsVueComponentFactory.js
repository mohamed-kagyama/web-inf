/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue"],function(e,t,n){var r=e("vue");n.exports={create:function(e){var t=e.view;return r.extend({template:"<div></div>",mounted:function(){t.setElement(this.$el),t.render()}})}}});