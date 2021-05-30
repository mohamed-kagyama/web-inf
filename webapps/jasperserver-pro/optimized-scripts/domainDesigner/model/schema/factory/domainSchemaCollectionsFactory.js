/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../util/collection/EntityCollection"],function(e,n,t){var o=e("../../util/collection/EntityCollection");t.exports={create:function(){return{constantGroups:new o,dataIslands:new o,dataSources:new o,dataSourceGroups:new o,tables:new o,tableGroups:new o,fields:new o,tableReferences:new o,filters:new o,joinTrees:new o,joins:new o,joinAliases:new o,joinExpressions:new o,presentationSets:new o,presentationFields:new o}}}});