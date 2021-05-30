/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil"],function(e,t,n){var i=e("underscore"),r=e("../../../../../../model/schema/util/entityUtil");n.exports=function(e,t){return r.isDataIsland(e.entityType)?e:i.extend({},e,{name:t,label:e.name})}});