/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,d){function i(e){var r=new RegExp(n,"g"),d=r.exec(e);return{fieldId:Number(d[2]),joinAliasId:Number(d[1])}}var n="([\\d]+):([\\d]+)";d.exports={parseField:i}});