/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./MultiAxisModelVisitor"],function(t,e,i){function n(){this.startIndex,this.endIndex,this.counter=0,this.index=0,this.result=[],this.terminated=!1}var s=t("underscore"),r=t("./MultiAxisModelVisitor");s.extend(n.prototype,r),n.prototype.preVisit=function(t){t.children.length||(void 0===t.index&&(t.index=this.index,this.index++),this.counter>=this.startIndex&&this.counter<this.endIndex&&this.result.push(t.index),this.counter++)},n.prototype.getResult=function(){return this.result},n.prototype.range=function(t,e){return this.startIndex=t,this.endIndex=e,this.counter=0,this.result=[],this},i.exports=n});