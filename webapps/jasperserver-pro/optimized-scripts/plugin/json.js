/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","text"],function(r){"use strict";var t=r("text");return{load:function(r,e,n,a){var u=function(r){try{var t=JSON.parse(r);n(t)}catch(r){n.error(r)}};return t.load(r,e,u,a)}}});