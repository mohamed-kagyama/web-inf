/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../util/classUtil"],function(r,t,e){var i=r("../../util/classUtil"),s=i.inherit(Error,{constructor:function(r,t,e){this.errorCode=r,this.message=t,this.parameters=e}});s.prototype.toString=function(){return this.errorCode+" : "+this.message},e.exports=s});