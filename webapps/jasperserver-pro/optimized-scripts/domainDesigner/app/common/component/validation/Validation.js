/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","./enum/messageTypesEnum","text!./template/validationTemplate.htm"],function(e,t,n){var s=e("vue"),i=e("./enum/messageTypesEnum"),u=e("text!./template/validationTemplate.htm");n.exports=s.extend({template:u,props:["message","type"],computed:{isError:function(){return this.type===i.ERROR},isSuccess:function(){return this.type===i.SUCCESS},isWarning:function(){return this.type===i.WARNING}}})});