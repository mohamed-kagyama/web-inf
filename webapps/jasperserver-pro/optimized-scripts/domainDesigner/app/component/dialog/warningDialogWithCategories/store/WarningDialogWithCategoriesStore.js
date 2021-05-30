/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/util/SimpleModel"],function(e,t,i){var n=e("../../../../../model/util/SimpleModel");i.exports=n.extend({defaults:function(){return{warnings:[],header:"",confirmLabel:"",confirmEvent:"",rejectLabel:"",rejectEvent:""}},setState:function(e){this.set(this.defaults()),this.set(e)}})});