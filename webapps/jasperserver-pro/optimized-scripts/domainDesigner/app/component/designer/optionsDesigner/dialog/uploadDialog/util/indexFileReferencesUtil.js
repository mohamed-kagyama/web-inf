/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var u=e("underscore");n.exports={indexFileReferences:function(e){return u.map(e,function(e,r){return{uri:e,index:r}})}}});