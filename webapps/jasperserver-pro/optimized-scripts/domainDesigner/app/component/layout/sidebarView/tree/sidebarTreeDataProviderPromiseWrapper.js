/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(e,r,t){var n=e("jquery");t.exports=function(e){return function(r){var t=new n.Deferred,o=e(r);return o?t.resolve({data:o.items,total:o.total}):t.resolve()}}});