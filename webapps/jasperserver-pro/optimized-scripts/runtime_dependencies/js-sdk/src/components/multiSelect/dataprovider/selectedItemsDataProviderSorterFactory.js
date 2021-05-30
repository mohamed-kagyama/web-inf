/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,l,r){r.exports={create:function(e){return function(l,r){return l.label===e?-1:r.label===e?1:l.label.localeCompare(r.label)}}}});