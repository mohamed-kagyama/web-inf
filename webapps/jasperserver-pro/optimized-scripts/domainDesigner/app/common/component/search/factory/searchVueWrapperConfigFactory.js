/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/searchVueWrapperTemplate.htm"],function(e,t,r){var a=e("text!../template/searchVueWrapperTemplate.htm");r.exports={create:function(e){return{template:a,components:{search:e.search},data:function(){return e.data}}}}});