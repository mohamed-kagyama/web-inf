/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,a){function d(e,r){e=n.clone(e);var a=n.pick(e,c);return e=n.omit(e,c),a=n.extend({id:e.id,name:e.name,resourceId:e.resourceId,type:e.type},a),n.extend({resource:a},e)}var n=e("underscore"),c=["parentJoinTreeId","parentTableReferenceId","parentTableReferenceName","canDeleteTableReference","alwaysIncludeTableEnabled","isDerivedTable","tableReferenceId","alwaysIncludeTable","calcFieldSourceId","calcFieldSourceType","derivedTableParentId","derivedTableId"];a.exports=d});