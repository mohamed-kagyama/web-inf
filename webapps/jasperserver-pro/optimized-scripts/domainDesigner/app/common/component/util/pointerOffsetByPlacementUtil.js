/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/placementsEnum","./emToPxUtil","../enum/pointerDimensionsInEmEnum"],function(e,t,n){var o=e("../enum/placementsEnum"),T=e("./emToPxUtil"),m=e("../enum/pointerDimensionsInEmEnum"),f={};f[o.TOP]={top:-1,left:0},f[o.TOP_LEFT]={top:-1,left:0},f[o.TOP_RIGHT]={top:-1,left:0},f[o.BOTTOM]={top:1,left:0},f[o.LEFT]={top:0,left:-1},f[o.RIGHT]={top:0,left:1},f[o.RIGHT_TOP]={top:0,left:1},f[o.BOTTOM_LEFT]={top:1,left:0},f[o.BOTTOM_RIGHT]={top:1,left:0},n.exports={getPointerOffset:function(e){var t=T.convertEmToPx(m.HEIGHT),n=f[e];if(n)return{top:n.top*t,left:n.left*t}}}});