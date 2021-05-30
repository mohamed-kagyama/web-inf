/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/enum/joinsEnum","../enum/joinWeightsEnum"],function(e,n,i){var r=e("underscore"),d=e("../../../../model/enum/joinsEnum"),t=e("../enum/joinWeightsEnum");i.exports={create:function(e,n){e=r.extend({},e,{rightSide:r.extend({},e.rightSide,{tableReferenceId:n.parentTableReferenceId,fieldId:n.id})});var i=e.leftSide,o=e.rightSide;return{leftTableReferenceId:i.tableReferenceId,rightTableReferenceId:o.tableReferenceId,joinTreeId:e.joinTreeId,joinType:d.joinTypes.inner.name,joinWeight:t.defaultOption.value,expression:{leftFieldId:i.fieldId,rightFieldId:o.fieldId,operator:d.joinOperators.equals.name}}}}});