/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../validation/Validation"],function(e,t,a){var i=e("../validation/Validation");a.exports={create:function(e){return{template:e.template,components:{validation:i},props:["message","type"]}}}});