/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","./jive.column"],function(n,e,i){var t=n("jquery"),o=n("./jive.column"),r=null,l=function(n){this.config={id:null,allColumnsData:null},t.extend(this.config,n),n.genericProperties?r=n.genericProperties:this.config.genericProperties=r,this.parent=null,this.columns=[],this.columnMap={},this.loader=null};l.prototype={registerPart:function(n){var e=new o(n);e.parent=this,e.loader=this.loader,this.columns[n.columnIndex]=e,this.columnMap[n.id]=e},getId:function(){return this.config.id},_notify:function(n){this.parent._notify(n)}},i.exports=l});