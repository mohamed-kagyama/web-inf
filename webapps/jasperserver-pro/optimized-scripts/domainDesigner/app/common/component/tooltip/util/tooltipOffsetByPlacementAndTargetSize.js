/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/pointerOffsetByPlacementUtil","../../enum/pointerDimensionsInEmEnum","../enum/tooltipPointerOffsetEnum","../../util/emToPxUtil","../../enum/placementsEnum"],function(t,e,o){function n(t,e){return t.top<0?t.top-e.top:t.top+e.top}function f(t,e){return t.left<0?t.left-e.left:t.left+e.left}function r(t,e){var o=u.getPointerOffset(t),r=e.offset,m=e.target,E=a[t];return T(m,t)&&(r=i.extend({},r,E(e))),{top:n(o,r),left:f(o,r)}}function T(t,e){var o=_[e];if(!o)return!1;var n=O.convertEmToPx(2*(o+p));return t.offsetWidth<n}var i=t("underscore"),u=t("../../util/pointerOffsetByPlacementUtil"),m=t("../../enum/pointerDimensionsInEmEnum"),E=t("../enum/tooltipPointerOffsetEnum"),O=t("../../util/emToPxUtil"),s=t("../../enum/placementsEnum"),l=E.TOP_RIGHT_BOTTOM_RIGHT_POINTER_OFFSET_RIGHT,c=m.WIDTH/2,p=m.WIDTH,P=E.TOP_LEFT_BOTTOM_LEFT_POINTER_OFFSET_LEFT,_={};_[s.TOP_RIGHT]=l,_[s.BOTTOM_RIGHT]=l,_[s.TOP_LEFT]=P,_[s.BOTTOM_LEFT]=P;var a={};a[s.BOTTOM_LEFT]=function(t){return{left:-1*(O.convertEmToPx(P)+O.convertEmToPx(c))+t.target.offsetWidth/2,top:t.offset.top}},a[s.BOTTOM_RIGHT]=function(t){return{left:O.convertEmToPx(l)+O.convertEmToPx(c)-t.target.offsetWidth/2,top:t.offset.top}},a[s.TOP_LEFT]=function(t){return{left:-1*(O.convertEmToPx(P)+O.convertEmToPx(c))+t.target.offsetWidth/2,top:t.offset.top}},a[s.TOP_RIGHT]=function(t){return{left:O.convertEmToPx(l)+O.convertEmToPx(c)-t.target.offsetWidth/2,top:t.offset.top}},o.exports={getOffset:r}});