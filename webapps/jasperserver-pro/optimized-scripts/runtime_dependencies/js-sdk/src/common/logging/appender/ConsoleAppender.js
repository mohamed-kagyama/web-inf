/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(o,e,t){function r(){}r.prototype.console=function(){if("undefined"==typeof console){var o=function(){};return{assert:o,clear:o,count:o,debug:o,dir:o,dirxml:o,error:o,group:o,groupCollapsed:o,groupEnd:o,info:o,log:o,markTimeline:o,profile:o,profileEnd:o,table:o,time:o,timeEnd:o,timeStamp:o,trace:o,warn:o}}return console}(),r.prototype.write=function(o){var e=this.console.log;switch(o.level.toString()){case"DEBUG":e=this.console.debug||this.console.log;break;case"INFO":e=this.console.info||this.console.log;break;case"WARN":e=this.console.warn;break;case"ERROR":e=this.console.error}try{e.apply(this.console,o.toArray())}catch(t){try{Function.prototype.apply.call(e,this.console,o.toArray())}catch(o){}}},t.exports=r});