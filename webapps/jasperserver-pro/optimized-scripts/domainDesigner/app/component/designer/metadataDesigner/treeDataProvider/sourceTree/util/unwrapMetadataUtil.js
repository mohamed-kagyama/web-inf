/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){function t(e,r){var n=[];return e?(n=r.metadataResourcePath.length?u.reduce(e,function(e,r){return e=e.concat(r.group.elements||[])},[]):e)||[]:n}var u=e("underscore");n.exports={unwrap:t}});