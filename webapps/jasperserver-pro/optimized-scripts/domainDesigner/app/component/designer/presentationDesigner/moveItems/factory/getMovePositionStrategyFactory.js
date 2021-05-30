/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../strategy/moveBottomPositionStrategy","../strategy/moveTopPositionStrategy","../strategy/moveUpPositionStrategy","../strategy/moveDownPositionStrategy","../enum/movePresentationItemsPositionEnum"],function(t,o,e){function i(t){return g[t]}var n=t("../strategy/moveBottomPositionStrategy"),r=t("../strategy/moveTopPositionStrategy"),s=t("../strategy/moveUpPositionStrategy"),a=t("../strategy/moveDownPositionStrategy"),m=t("../enum/movePresentationItemsPositionEnum"),g={};g[m.MOVE_TOP]=r,g[m.MOVE_UP]=s,g[m.MOVE_DOWN]=a,g[m.MOVE_BOTTOM]=n,e.exports={getStrategy:i}});