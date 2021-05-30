/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}(function(e){return e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(n){return function(t){return!!e.data(t,n)}}):function(n,t,r){return!!e.data(n,r[3])}})});