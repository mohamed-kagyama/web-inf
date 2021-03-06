/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","text!./template/messageTemplate.htm","./enums/messageTypes"],function(e,t,s){var i=e("backbone"),n=e("underscore"),l=e("text!./template/messageTemplate.htm"),m=e("./enums/messageTypes"),o=i.Model.extend({defaults:{visible:!0,icon:!1,title:"Title",text:"Text",type:m.Type.Info}});s.exports=i.View.extend({template:n.template(l),initialize:function(e){this.model=new o(e),this.listenTo(this.model,"change",this.render),this.render()},render:function(){return this.$el.html(this.template(this.model.toJSON())),this}},m)});