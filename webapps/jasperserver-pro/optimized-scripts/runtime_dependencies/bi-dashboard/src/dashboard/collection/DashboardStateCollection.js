/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../model/DashboardStateModel"],function(t,e,i){var r=t("backbone"),s=t("../model/DashboardStateModel");i.exports=r.Collection.extend({initialize:function(t,e){this.dashboardModel=e.model},init:function(){this.currentState=void 0,this.reset([]),this.saveState()},saveState:function(){var t=this.indexOf(this.currentState);if(t+1<this.length){var e=this.slice(t+1);this.remove(e)}this.currentState=this.add(new s({state:this.dashboardModel.toJSON(!0)},{dashboardModel:this.dashboardModel})),this.trigger("change:currentState",this.currentState,this)},setPreviousState:function(){if(this.currentState){var t=this.indexOf(this.currentState);t>0&&(this.currentState=this.at(t-1),this.currentState.applyState(),this.trigger("change:currentState",this.currentState,this))}},setFirstState:function(){this.length>0&&this.currentState!==this.first()&&(this.currentState=this.first(),this.currentState.applyState(),this.trigger("change:currentState",this.currentState,this))},setNextState:function(){if(this.currentState){var t=this.indexOf(this.currentState);t+1<this.length&&(this.currentState=this.at(t+1),this.currentState.applyState(),this.trigger("change:currentState",this.currentState,this))}},setLastState:function(){this.length>0&&this.currentState!==this.last()&&(this.currentState=this.last(),this.currentState.applyState(),this.trigger("change:currentState",this.currentState,this))},hasPreviousState:function(){return this.currentState!==this.first()},hasNextState:function(){return this.currentState!==this.last()}})});