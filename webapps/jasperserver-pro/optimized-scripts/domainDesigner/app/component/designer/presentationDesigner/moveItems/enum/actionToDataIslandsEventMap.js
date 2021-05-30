/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./movePresentationItemsPositionEnum","../../../../../dispatcher/enum/applicationStateEventsEnum"],function(E,e,_){var t=E("./movePresentationItemsPositionEnum"),n=E("../../../../../dispatcher/enum/applicationStateEventsEnum"),N={};N[t.MOVE_TOP]=n.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS,N[t.MOVE_UP]=n.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_UP,N[t.MOVE_DOWN]=n.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_DOWN,N[t.MOVE_BOTTOM]=n.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS,_.exports=N});