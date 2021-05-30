/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./movePresentationItemsPositionEnum","../../../../../dispatcher/enum/applicationStateEventsEnum"],function(E,e,T){var N=E("./movePresentationItemsPositionEnum"),_=E("../../../../../dispatcher/enum/applicationStateEventsEnum"),t={};t[N.MOVE_TOP]=_.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS,t[N.MOVE_UP]=_.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_UP,t[N.MOVE_DOWN]=_.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_DOWN,t[N.MOVE_BOTTOM]=_.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS,T.exports=t});