/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../components/components.searchBox","../actionModel/actionModel.primaryNavigation","../util/utils.common","prototype"],function(o,t,e){var n=o("../components/components.searchBox"),i=o("../actionModel/actionModel.primaryNavigation"),a=o("../util/utils.common"),c=a.encodeUriParameter,r=o("prototype"),s=r.$,h={_searchBox:null,_containerId:"globalSearch",_searchInputId:"searchInput",initialize:function(){this._searchBox=new n({id:this._containerId}),this._searchBox.onSearch=function(o){s(this._searchInputId).setValue(o),i.navigationPaths.search.params+="&searchText="+c(o),i.navigationOption("search")}.bind(this)},setText:function(o){this._searchBox.setText(o)}};e.exports=h});