/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,t){function r(e){var n=e.fileLoader;return{loadFileWithContent:function(e){return n.loadFilesWithContent(e).then(function(e){return e[0]})}}}t.exports={create:r}});