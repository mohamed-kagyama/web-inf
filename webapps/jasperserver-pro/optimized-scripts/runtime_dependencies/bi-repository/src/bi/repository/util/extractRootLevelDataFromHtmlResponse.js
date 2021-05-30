/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,i){i.exports=function(e){var r=e.trim().match(/^<div\s?(?:(?:.*)=(?:['"]).*(?:['"]))*>(.*)<\/div>/);return JSON.parse(r?r[1]:"{}")}});