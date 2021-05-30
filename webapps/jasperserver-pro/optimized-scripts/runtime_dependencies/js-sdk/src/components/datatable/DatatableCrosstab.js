/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","backbone","underscore","text!./template/datatableCrosstabTemplate.htm"],function(e,t,a){var r=e("jquery"),n=e("backbone"),i=e("underscore"),l=e("text!./template/datatableCrosstabTemplate.htm");a.exports=n.View.extend({template:i.template(l),initialize:function(){this.render()},render:function(){return this.$el=r(this.template()),this}})});