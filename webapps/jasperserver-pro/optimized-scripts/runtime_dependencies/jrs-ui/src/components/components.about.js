/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","./components.dialogs"],function(o,i,n){var t=o("jquery"),e=o("./components.dialogs"),u={initialize:function(){u.aboutBox.registerListeners()}};u.aboutBox={show:function(){var o=t("#aboutBox");o.hasClass("hidden")&&e.popup.show(o[0],!0)},_hide:function(){var o=t("#aboutBox");o.hasClass("hidden")||e.popup.hide(o[0])},registerListeners:function(){var o=t("#about"),i=t("#aboutBox button");o.on("click",function(o){o.preventDefault(),u.aboutBox.show()}),i.on("click",function(o){u.aboutBox._hide(),o.stopPropagation()})}},t(function(){void 0===o&&u.initialize()}),n.exports=u});