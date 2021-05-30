/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./org.mng.main"],function(n,t,o){var i=n("./org.mng.main");i.orgActionFactory={aliasExist:function(n){var t=n.org,o={entityName:t.getNameWithTenant(),alias:t.alias},a=new i.ServerAction(i.orgManager.Action.ALIAS_EXIST,o);return a.onSuccess=function(t){t.exist?n.onExist&&n.onExist(t.uniqueAlias):n.onNotExist&&n.onNotExist()},a.onError=function(t){i.fire(i.Event.SERVER_ERROR,{inputData:n,responseData:t})},a}},i.orgManager.actionFactory={},o.exports=i});