/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil"],function(e,i,t){var n=e("underscore"),o=e("../../../../../../model/schema/util/entityUtil"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){},isSatisfiedBy:function(e){return o.isField(e.type)}}),t.exports=r});