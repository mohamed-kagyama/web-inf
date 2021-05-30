/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/jrs-ui/src/manage/mng.root","underscore","runtime_dependencies/jrs-ui/src/components/components.webHelp","runtime_dependencies/jrs-ui/src/core/core.layout"],function(e,n,t){function i(e,n){d.orgActionFactory[e](n).invokeAction()}function a(e,n){d.orgManager.actionFactory[e](n).invokeAction()}function o(){return!g.isUndefined(d.manager.tenantsTree.getTenant())}function r(){return d.entityList.getSelectedEntities().length>0}function s(){return d.entityList.getSelectedEntities().length>0}var d=e("runtime_dependencies/jrs-ui/src/manage/mng.root"),g=e("underscore"),l=e("runtime_dependencies/jrs-ui/src/components/components.webHelp"),c=e("runtime_dependencies/jrs-ui/src/core/core.layout");d.orgManager={NAME_REG_EXP:null,ID_REG_EXP:null,ID_REG_EXP_FOR_REPLACEMENT:null,ALIAS_REG_EXP:null,ALIAS_REG_EXP_FOR_REPLACEMENT:null,Event:{},Action:{ALIAS_EXIST:"aliasExist"},initialize:function(e){c.resizeOnClient("folders","organizations","properties"),l.setCurrentContext("admin");var n=g.extend(e,window.localContext.orgMngInitOptions);this.NAME_REG_EXP=new RegExp(d.Configuration.tenantNameNotSupportedSymbols),this.ID_REG_EXP=new RegExp(d.Configuration.tenantIdNotSupportedSymbols),this.ID_REG_EXP_FOR_REPLACEMENT=new RegExp(d.Configuration.tenantIdNotSupportedSymbols,"g"),this.ALIAS_REG_EXP=new RegExp(d.Configuration.tenantIdNotSupportedSymbols),this.ALIAS_REG_EXP_FOR_REPLACEMENT=new RegExp(d.Configuration.tenantIdNotSupportedSymbols,"g"),d.manager.initialize(n),d.manager.entityJsonToObject=function(e){return new d.Organization(e)},this.orgList.initialize({toolbarModel:this.actionModel,text:d.manager.state.text}),d.addDialog.show=function(e){this.addDialog.show(e)}.bind(this),d.addDialog.hide=function(e){this.addDialog.hide(e)}.bind(this),this.properties.initialize(e),this.addDialog.initialize(),d.observe("entity:created",function(e){var n=d.orgManager.addDialog.organization,t=JSON.parse(e.memo.inputData.entity),i=n.isRoot()?"organizations":n.id;t.tenantFolderUri=n.isRoot()?"/"+i+"/"+t.tenantName:n.uri+"/"+t.tenantName,t.parentId=t.parentId||i,d.manager.tenantsTree.addTenant(i,t)}.bindAsEventListener(this)),d.observe("entity:updated",function(e){var n=JSON.parse(e.memo.inputData.entity);if(n){var t=d.manager.tenantsTree,i=d.entityList.getSelectedEntities(),a=t.getTenant(),o=g.isObject(a.parentId)?a.parentId.parentId:a.parentId,r=i.length&&n.tenantId!==a.id?a.id:o,s=!i.length||n.tenantId===a.id;d.manager.tenantsTree.setTenant("name",n.tenantName),d.properties.setValuesProperty("name",n.tenantName),n.tenantName!==a.name&&d.manager.tenantsTree.updateTenant(r,n,s)}}.bindAsEventListener(this)),d.observe("searchAssigned:loaded",function(e){var n=e.memo.responseData;this.properties.setAssigned(n.usersCount,n.rolesCount)}.bindAsEventListener(this)),d.observe("entity:detailsLoaded",function(e){d.invokeServerAction(d.ActionMap.SEARCH_ASSIGNED,{text:""})}.bindAsEventListener(this)),d.observe("entity:deleted",function(e){var n=d.manager.tenantsTree,t=e.memo.inputData,i=t.entity,a=t.entityEvent,o=n.getTenant(),r=a?o.id:o.parentId;n.removeTenant(i,r),!a&&n.selectTenant(r),d.fire(d.Event.ENTITY_SELECT_AND_GET_DETAILS,{entityId:r,entityEvent:!1})}.bindAsEventListener(this)),d.observe("entities:deleted",function(e){var n=d.manager.tenantsTree,t=n.getTenant().id,i=JSON.parse(e.memo.inputData.entities);n.removeTenant(i,t),d.fire(d.Event.ENTITY_SELECT_AND_GET_DETAILS,{entityId:t,entityEvent:!0})}.bindAsEventListener(this)),d.observe("server:unavailable",function(e){var n=d.manager.tenantsTree,t=n?n.getTenant().id:null;new d.Organization({tenantId:t}).navigateToManager()}.bindAsEventListener(this))},actionModel:{ADD:{buttonId:"addNewOrgBtn",action:d.invokeClientAction,actionArgs:"create",test:o},DELETE:{buttonId:"deleteAllOrgsBtn",action:d.invokeClientAction,actionArgs:"deleteAll",test:r}}},void 0===e&&document.observe("dom:loaded",d.orgManager.initialize.bind(d.orgManager)),d.invokeOrgAction=i,d.invokeOrgManagerAction=a,d.canAddOrg=o,d.canDeleteAll=r,d.canDeleteUser=s,t.exports=d});