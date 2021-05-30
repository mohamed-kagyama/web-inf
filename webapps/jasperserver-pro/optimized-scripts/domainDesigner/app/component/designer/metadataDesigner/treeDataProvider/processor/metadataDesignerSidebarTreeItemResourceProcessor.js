/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,d){function c(e,r){var d=i.pick(e,["id","resourceId","type","calcFieldSourceId","calcFieldSourceType","derivedTableId","derivedTableParentId"]);return i.extend({resource:d},i.omit(e,["derivedTableId","derivedTableParentId","calcFieldSourceId","calcFieldSourceType"]))}var i=e("underscore");d.exports=c});