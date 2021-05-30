/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!adhoc_messages"],function(e,n,a){function t(e){return u[r+e]||e}var u=e("bundle!adhoc_messages"),r="adh.function.aggregate.name.";a.exports={localizeAggregation:t,getLabel:function(e){if(!e)return null;var n=e.fieldDisplay||e.name;return e.defaultAggregateFunction===e.functionOrDefault?n:n+" ("+t(e.function)+")"}}});