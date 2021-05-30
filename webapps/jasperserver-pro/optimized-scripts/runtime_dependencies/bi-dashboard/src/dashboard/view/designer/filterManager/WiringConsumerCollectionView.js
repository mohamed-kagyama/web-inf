/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./CollectionView","../../../enum/dashboardWiringStandardIds"],function(e,n,i){var t=e("./CollectionView"),o=e("../../../enum/dashboardWiringStandardIds");i.exports=t.extend({initCollectionEventHandlers:function(){this.listenTo(this.collection,"add remove change:id change:parameter",this.render)},addSubview:function(e){if(e.get("parameter")!==o.APPLY_SLOT)return!e.component||e.component.isParametrized()?t.prototype.addSubview.call(this,e):void 0}})});