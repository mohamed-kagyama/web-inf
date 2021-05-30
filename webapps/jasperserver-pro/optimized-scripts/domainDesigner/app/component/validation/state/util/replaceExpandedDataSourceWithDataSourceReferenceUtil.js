/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/util/resourcePropertiesUtil"],function(e,r,o){var t=e("underscore"),u=e("../../../../model/util/resourcePropertiesUtil");o.exports={replace:function(e,r){var o=r||u.getEmbeddedResourceUri(e.dataSource),d={dataSourceReference:{uri:o}};return t.extend({},e,{dataSource:d})}}});