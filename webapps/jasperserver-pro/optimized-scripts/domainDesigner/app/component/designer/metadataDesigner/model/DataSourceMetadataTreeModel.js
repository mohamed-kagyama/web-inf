/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/util/SimpleModel"],function(e,i,t){var s=e("../../../../../model/util/SimpleModel");t.exports=s.extend({defaults:function(){return{ownDesigner:"",currentDesigner:"",isVisible:!1}},setState:function(e){this.set(e),this.set("isVisible",this.get("ownDesigner")===this.get("currentDesigner"))}})});