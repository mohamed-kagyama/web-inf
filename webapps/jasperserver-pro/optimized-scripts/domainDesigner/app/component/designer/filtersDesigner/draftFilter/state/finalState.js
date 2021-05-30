/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,i){var o=r("underscore");i.exports={enter:function(r,e){var i,t=r.deferred,s=r.currentFilter,n=r.newFilterOptions;o.extend(s.expression,{operator:n.operator,right:n.rightOperand}),i=o.isEmpty(r.error)&&!o.isEmpty(s.errors.right)?s.errors.right:{errorMessage:r.error},s.errors={right:i},o.isUndefined(n.isRawValueEditor)||o.extend(s,{isRawValueEditor:n.isRawValueEditor}),t.resolve(s)}}});