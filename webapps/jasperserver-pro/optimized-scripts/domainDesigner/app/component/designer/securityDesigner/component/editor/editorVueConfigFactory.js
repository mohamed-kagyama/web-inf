/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","react","react-dom","./RSecurityEditor"],function(e,t,r){var n=e("bundle!DomainDesignerBundle"),i=e("react"),o=e("react-dom"),u=o.render,d=e("./RSecurityEditor");r.exports={create:function(e){return{template:"<div/>",props:["securityFile"],computed:{i18n:function(){return n}},methods:{},mounted:function(){var t=i.createElement(d,{options:e,message:""}),r=this.$el;void 0!==this.$parent&&(r=this.$parent.$el),u(t,r)}}}}});