/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,t,r){var i=function(e,t){this.message=e,this.notParsedCalcFields=t};i.prototype.toString=function(){return"CircularReferenceException: "+this.message},i.prototype.getNotParsedCalcFields=function(){return this.notParsedCalcFields},r.exports=i});