/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){function i(){return{parentId:null,items:{}}}function r(e,t){var n=i();return c.each(e,function(e){n.items[e.id]=e}),n.parentId=t,n}function s(e){var t=e.selection;return c.each(e.items,function(n){e.isItemSelected(n)?delete t.items[n.id]:t.items[n.id]=n},this),c.isEmpty(t.items)?t=i():t.parentId=e.parentId,t}var c=e("underscore");n.exports={create:function(e){e=e||{};var t=e.items,n=e.parentId||null,i=e.selection,d=e.isItemSelected;return t=c.isArray(t)?t:[t],e.toggle?s({selection:i,items:t,isItemSelected:d,parentId:n}):r(t,n)}}});