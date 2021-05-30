/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu"],function(e,n,t){var o=e("underscore"),r=e("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu");t.exports=o.memoize(function(e,n){var t=n.dataModel.metadata().view().measures(),i=n.table.getSelection(),u=o.reduce(i,function(e,n){return Math.max(e,t.index({id:n.id}))},0),c=o.reduce(i,function(e,n){return Math.min(e,t.index({id:n.id}))},t.length-1),d=[{label:"Move Left",action:n.moveColumnLeft,test:function(){return c>0}},{label:"Move Right",action:"move:right",test:function(){return u<t.length-1}}];return new r(d)})});