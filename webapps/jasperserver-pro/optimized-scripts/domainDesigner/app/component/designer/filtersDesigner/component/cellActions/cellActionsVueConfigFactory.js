/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/cellActionsTemplate.htm","../../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,t,i){var r=e("text!./template/cellActionsTemplate.htm"),s=e("../../../../../../model/schema/enum/schemaEntitiesEnum");i.exports={create:function(e){return{template:r,props:["filter"],computed:{canEdit:function(){return this.filter.type!==s.COMPLEX_FILTER}},methods:{onDelete:function(){e.filtersDesignerEventBus.trigger("filter:remove",{id:this.filter.id,sourceId:this.filter.sourceId,sourceType:this.filter.sourceType})},onEdit:function(){e.filtersDesignerEventBus.trigger("filter:edit",{id:this.filter.id,sourceId:this.filter.sourceId,sourceType:this.filter.sourceType})}}}}}});