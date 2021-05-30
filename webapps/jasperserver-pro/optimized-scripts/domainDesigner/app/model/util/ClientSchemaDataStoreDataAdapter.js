/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,i){var n=e("underscore"),t=function(e){this.initialize(e)};n.extend(t.prototype,{initialize:function(e){this.schemaModelConverter=e.schemaModelConverter},deserialize:function(e){return this.schemaModelConverter.parse({json:e})},serialize:function(e){return this.schemaModelConverter.toJSON(e)}}),i.exports=t});