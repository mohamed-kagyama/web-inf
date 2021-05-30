/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(T,A,_){var E={};E.ACCEPT_FLAT_DATA="application/flatData+json",E.ACCEPT_MULTI_LEVEL_DATA="application/multiLevelData+json",E.ACCEPT_MULTI_AXIS_DATA="application/multiAxisData+json",E.ACCEPT_ALL_DATA=[E.ACCEPT_FLAT_DATA,E.ACCEPT_MULTI_LEVEL_DATA,E.ACCEPT_MULTI_AXIS_DATA].join(", "),E.ACCEPT_NO_FLAT=[E.ACCEPT_MULTI_LEVEL_DATA,E.ACCEPT_MULTI_AXIS_DATA].join(", "),E.CONTENT_TYPE_PROVIDED_QUERY="application/execution.providedQuery+json",E.CONTENT_TYPE_MULTI_LEVEL_QUERY="application/execution.multiLevelQuery+json",E.CONTENT_TYPE_MULTI_AXIS_QUERY="application/execution.multiAxisQuery+json",_.exports=E});