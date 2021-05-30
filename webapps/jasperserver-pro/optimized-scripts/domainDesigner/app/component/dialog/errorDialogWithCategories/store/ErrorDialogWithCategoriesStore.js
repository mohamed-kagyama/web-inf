/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/util/SimpleModel"],function(e,t,r){var i=e("../../../../../model/util/SimpleModel");r.exports=i.extend({defaults:function(){return{errors:[],header:"",confirmLabel:"",confirmEvent:"",rejectLabel:"",rejectEvent:"",show:!1}},setState:function(e){this.set(this.defaults()),this.set(e)}})});