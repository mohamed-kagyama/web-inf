/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","util/prototypeExtension","./jqueryExtension","prototype"],function(e){var t=e("util/prototypeExtension");return e("./jqueryExtension"),e("prototype"),"string"!=typeof $?(t.extend($),{$:$,$$:$$,$w:$w,Prototype:Prototype,Position:Position,Hash:Hash,$A:$A,Template:Template,Class:Class,$F:$F,Form:Form,$break:$break,$H:$H,Selector:Selector,Field:Field}):{}});