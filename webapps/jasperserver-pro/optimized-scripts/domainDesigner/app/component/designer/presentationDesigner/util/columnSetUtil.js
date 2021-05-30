/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/columnSetEnum"],function(n,e,u){function t(n){return n===c.DEFAULT}function i(n){return n===c.IDENTIFICATION}function r(n){return n===c.BUNDLE_KEYS}function o(n){return n===c.DATA}var c=n("../enum/columnSetEnum");u.exports={isDefault:t,isIdentification:i,isBundleKeys:r,isData:o}});