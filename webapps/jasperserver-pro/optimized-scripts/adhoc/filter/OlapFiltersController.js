/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseFiltersController","underscore"],function(e,i,t){var n=e("./BaseFiltersController"),r=e("underscore"),o=n.extend({isOlap:!0,initialize:function(){n.prototype.initialize.apply(this,arguments),this.listenTo(this.collection,"change:value",this.updateFilter)},addFilter:function(e){var i=e[0];return this.service.addOlapFilter(i.dimensionId,i.name).done(r.bind(function(e){this.collection.set(e.existingFilters),this.onStateUpdate(e)},this))},updateFilter:function(e){if(e.isValid(!0))return this.service.update(e.get("id"),e.toExpression()).done(r.bind(function(i){var t=this;r.each(i.existingFilters,function(i){if(i.id!==e.get("id")){var n=t.collection.get(i.id);i.expressionType=n.get("expressionType"),n.set(i),n.removeAvailableData();var r=t._getFilterEditorByModel(n);r&&r.render()}}),this.onStateUpdate(i)},this))}});window.OlapFiltersController=o,t.exports=o});