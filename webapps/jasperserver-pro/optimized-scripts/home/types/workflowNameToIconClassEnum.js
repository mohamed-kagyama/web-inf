/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./workflowNameEnum"],function(o,r,e){function n(o,r,e){return r in o?Object.defineProperty(o,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):o[r]=e,o}var w,i,l=o("./workflowNameEnum"),a=l.adminWorkflowName,f=l.workflowNameEnum,c=(w={},n(w,f.ADHOC,"workflow-icon-adhocview"),n(w,f.REPORT,"workflow-icon-report"),n(w,f.DASHBOARD,"workflow-icon-dashboard"),n(w,f.DATA_SOURCE,"workflow-icon-datasource"),n(w,f.DOMAIN,"workflow-icon-domain"),n(w,f.ADMIN,"workflow-icon-admin"),w),m=(i={},n(i,a.REPOSITORY,"workflow-icon-repository"),n(i,a.ROLES,"workflow-icon-roles"),n(i,a.SERVER_SETTINGS,"workflow-icon-serversettings"),n(i,a.USERS,"workflow-icon-users"),i);r.workflowNameToIconClassEnum=c,r.adminWorkflowNameToIconClassEnum=m});