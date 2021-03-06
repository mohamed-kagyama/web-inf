/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone.epoxy","underscore","./epoxyCustomBindingHandlers","./epoxyCustomBindingFilters"],function(i,n,e){var s=i("backbone.epoxy"),t=i("underscore"),o=i("./epoxyCustomBindingHandlers"),d=i("./epoxyCustomBindingFilters");e.exports={epoxifyView:function(){var i=this.remove;s.View.mixin(this),i&&(this.remove=i),this.bindingFilters&&(this.bindingFilters=t.extend({},d,this.bindingFilters)),this.bindingHandlers&&(this.bindingHandlers=t.extend({},o,this.bindingHandlers))},applyEpoxyBindings:function(){this.applyBindings&&this.applyBindings()},removeEpoxyBindings:function(){this.removeBindings&&this.removeBindings()}}});