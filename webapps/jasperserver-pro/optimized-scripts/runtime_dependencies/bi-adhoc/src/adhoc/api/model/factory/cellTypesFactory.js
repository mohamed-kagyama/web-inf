/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,a,t){t.exports=function(e){var a="jr-mDatatable-cell-";switch(e){case"bigDecimal":case"byte":case"short":case"float":case"integer":case"long":case"double":case"decimal":return a+"number";case"date":case"time":case"timestamp":return a+"date";default:return a+"text"}}});