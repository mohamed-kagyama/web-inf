/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./Resizer"],function(e,r,i){var n=e("./Resizer");i.exports={create:function(e){e=e||{};var r=e.Resizer||n;return{bind:function(e,i){var n=i.value,o={config:n};e._resizer=new r(e,o)},unbind:function(e){e._resizer&&e._resizer.remove()}}}}});