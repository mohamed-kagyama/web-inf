/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/calcFieldsAvailableItemsTreeTemplate.htm"],function(e,t,l){function i(e){return{itemsTemplate:a,listItemHeight:e.listItemHeight,dataProvider:e.dataProvider,selection:{allowed:{left:!1,right:!1}}}}var a=e("text!../template/calcFieldsAvailableItemsTreeTemplate.htm");l.exports={getTreeOptions:i}});