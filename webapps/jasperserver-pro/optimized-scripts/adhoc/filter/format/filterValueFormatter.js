/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","settings!adhocFilterSettings"],function(e,t,n){var l=e("settings!adhocFilterSettings"),i=l?l.nullValue:null,u=l?l.nullLabel:null;n.exports=function(e){return e===i?u:e}});