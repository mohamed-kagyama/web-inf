/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../../../../../common/template/menuItemWithOptionsTemplate.htm"],function(e,t,n){var o=e("text!../../../../../common/template/menuItemWithOptionsTemplate.htm");n.exports={create:function(e){return{getMenuOptions:function(t){return{additionalSettings:{menuOptionTemplate:o,hideOnMouseLeave:!0},options:e.map(function(e){return e(t)})}}}}}});