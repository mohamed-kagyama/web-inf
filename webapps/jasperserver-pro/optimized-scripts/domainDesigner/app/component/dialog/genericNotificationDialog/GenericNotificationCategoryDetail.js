/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","text!./template/genericNotificationCategoryDetailTemplate.htm"],function(e,t,i){var a=e("vue"),o=e("text!./template/genericNotificationCategoryDetailTemplate.htm");i.exports=a.extend({props:{detail:{type:String,default:""}},template:o})});