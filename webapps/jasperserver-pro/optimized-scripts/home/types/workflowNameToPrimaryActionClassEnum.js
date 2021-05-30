/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./workflowNameEnum"],function(e,a,r){function n(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}var o,m,i=e("./workflowNameEnum"),t=i.adminWorkflowName,l=i.workflowNameEnum,u=(o={},n(o,l.ADHOC,"create"),n(o,l.REPORT,"create"),n(o,l.DASHBOARD,"create"),n(o,l.DATA_SOURCE,"create"),n(o,l.DOMAIN,"create"),n(o,l.ADMIN,"admin"),o),E=(m={},n(m,t.REPOSITORY,"manage"),n(m,t.ROLES,"manage"),n(m,t.SERVER_SETTINGS,"manage"),n(m,t.USERS,"manage"),m);a.workflowNameToPrimaryActionClassEnum=u,a.adminWorkflowNameToPrimaryActionClass=E});