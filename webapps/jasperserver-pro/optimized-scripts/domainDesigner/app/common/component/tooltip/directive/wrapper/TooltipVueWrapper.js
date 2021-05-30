/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","vue","../../../util/positionUtil","../../component/tooltipVueConfig","../../util/tooltipOffsetByPlacementAndTargetSize","text!./template/tooltipWrapperTemplate.htm"],function(t,e,i){function o(){return{type:"",placement:"",content:{},isVisible:!0,timeout:f,offset:{top:0,left:0},target:"",styleObj:{}}}function n(t){return a.getOffset(t.placement,{target:t.target,offset:t.offset})}function s(t){l.extend(this,t,{isVisible:!0,styleObj:{visibility:"hidden"}}),this.placement&&this.$nextTick(function(){var t=r.getPlacementWithPosition({placement:this.placement,targetEl:this.target,parentEl:this.$el.parentElement,sourceEl:this.$el}),e=t.placement,i=n({placement:e,target:this.target,offset:this.offset});l.extend(this,{isVisible:!0,styleObj:{top:i.top+t.top+"px",left:i.left+t.left+"px",position:"absolute"},placement:e})})}var l=t("underscore"),p=t("vue"),r=t("../../../util/positionUtil"),u=t("../../component/tooltipVueConfig"),a=t("../../util/tooltipOffsetByPlacementAndTargetSize"),m=t("text!./template/tooltipWrapperTemplate.htm"),f=500;i.exports=p.extend({template:m,components:{tooltip:p.extend(u)},data:function(){return o()},computed:{getTimeout:function(){return l.isNumber(this.timeout)&&this.timeout>=0?this.timeout:f}},methods:{setState:function(t){this.timerId=setTimeout(l.bind(s,this),this.getTimeout,t)},remove:function(){this.$destroy()},resetState:function(){l.extend(this,o()),clearTimeout(this.timerId)}}})});