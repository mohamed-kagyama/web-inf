/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore"],function(e,t,n){function r(e){var t=e.treeNodeProvider,n=e.initialDataOptions||{};return{fetch:function(e){return e=e||{},e=o.extend({},n.options,e),t.getData(n.properties,e).then(function(e){return e.visibleNodes})},select:function(e,n){return n=o.extend({select:!0},n),e.isSelectable?t.getData(e,n).then(function(e){return{visibleNodes:e.visibleNodes,selection:e.selection}}):(new i.Deferred).reject(e)},toggle:function(e){return t.getData(e,{open:!e.open}).then(function(e){return{visibleNodes:e.visibleNodes,selection:e.selection}})}}}var i=e("jquery"),o=e("underscore");n.exports={create:r}});