/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../attributes/enum/attributesTypesEnum"],function(t,e,n){var r=t("../../attributes/enum/attributesTypesEnum");n.exports={initScrollEvent:function(t){var e=t.type===r.SERVER?t.$el.parent():t.$container.parent(),n=t.$el.find(".addNewItem");e.scroll(function(t){n.css("margin-right",20-e.scrollLeft()+"px")})},detachScrollEvent:function(t){t.off()}}});