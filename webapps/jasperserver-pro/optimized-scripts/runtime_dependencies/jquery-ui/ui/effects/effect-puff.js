/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect","./effect-scale"],e):e(jQuery)}(function(e){return e.effects.define("puff","hide",function(f,n){var t=e.extend(!0,{},f,{fade:!0,percent:parseInt(f.percent,10)||150});e.effects.effect.scale.call(this,t,n)})});