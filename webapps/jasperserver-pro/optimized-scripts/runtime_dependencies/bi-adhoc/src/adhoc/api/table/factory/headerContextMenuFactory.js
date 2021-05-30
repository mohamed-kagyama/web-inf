/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu","runtime_dependencies/js-sdk/src/common/component/menu/cascadingMenuTrait"],function(e,n,t){var o=e("underscore"),r=e("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu"),a=e("runtime_dependencies/js-sdk/src/common/component/menu/cascadingMenuTrait"),i=r.extend(a);t.exports=o.memoize(function(e,n){var t=n.dataModel.metadata().view().measures(),o=t.index({id:e}),r=t[o],a=[{label:"Use for Sorting..."},{label:"Remove Summary"},{label:"Change Function",children:[{label:"Distinct Count"},{label:"Count All"}]},{label:"Change Data Format",test:function(){return r.isMeasure},children:[{label:"-1,234.56"},{label:"-1235"},{label:"($1,234.56)"},{label:"($1,235)"}]},{label:"Move Left",action:n.moveColumnLeft,test:function(){return o>0}},{label:"Move Right",action:"move:right",test:function(){return o<t.length-1}}];return new i(a)})});