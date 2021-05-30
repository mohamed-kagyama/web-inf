/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../util/removePathFragmentUtil","../../../../../util/uriUtil"],function(t,e,i){function r(t,e){var i=e.path,r=e.table,u=n.getSeparator();return r&&(i=l(i,r.id)),t.id=u+i.join(u),t.levelNesting=i.length,t}var l=t("../util/removePathFragmentUtil"),n=t("../../../../../util/uriUtil");i.exports=r});