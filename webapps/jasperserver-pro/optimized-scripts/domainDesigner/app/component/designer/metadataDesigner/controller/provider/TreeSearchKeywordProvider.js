/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/metadataDesignerUtil"],function(e,t,r){var i=e("underscore"),n=e("../../util/metadataDesignerUtil"),a=function(e){this.treeName=e.treeName};i.extend(a.prototype,{get:function(e){return n.getTreeSearchKeyword(this.treeName,e.viewState)}}),r.exports=a});