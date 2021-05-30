/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,o,l){l.exports={update:function(e,o){var l=e.scrollTop,r=e.clientHeight,t=o.value;t!==o.oldValue&&t>r+l&&(e.scrollTop=t)}}});