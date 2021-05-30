/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","./GenericNotificationCategoryDetail","text!./template/genericNotificationAllCategoryDetailsTemplate.htm"],function(e,t,i){var a=e("vue"),o=e("./GenericNotificationCategoryDetail"),l=e("text!./template/genericNotificationAllCategoryDetailsTemplate.htm");i.exports=a.extend({props:["categoryDetails"],template:l,components:{detail:o}})});