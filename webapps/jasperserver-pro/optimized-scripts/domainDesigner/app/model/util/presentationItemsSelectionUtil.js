/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./clientSchemaModelUtil"],function(e,t,n){var r=e("underscore"),c=e("./clientSchemaModelUtil");n.exports={getPresentationItemsSelection:function(e){var t,n=r.clone(e.currentSelection),i=e.collections;return t=r.reduce(n.items,function(e,t,n){return c.checkIfResourceExistsInSchemaByIdAndType(Number(n),t.type,i)||e.push(n),e},[]),n.items=r.omit(n.items,t),r.isEmpty(n.items)&&(n.parentId=null),n}}});