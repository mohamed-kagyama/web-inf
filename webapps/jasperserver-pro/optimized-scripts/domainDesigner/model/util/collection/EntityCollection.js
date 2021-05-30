/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../util/binarySearch","./IndexedCollection"],function(e,r,i){var t=e("underscore"),n=e("../../../util/binarySearch"),o=e("./IndexedCollection"),d=function(e,r){r=r||{},o.call(this,e,r),this._ordered=r.ordered};t.extend(d.prototype,o.prototype,{fromArray:function(e,r){r=t.defaults(r||{},{indexConfig:[{name:"id"}]}),o.prototype.fromArray.call(this,e,r)},indexOf:function(e){if(this._ordered&&e&&e.id){var r=e.id;return n(this.collection,function(e){return r-e.id})}return o.prototype.indexOf.call(this,e)},byId:function(e){if(this._ordered){var r=this.indexOf({id:e});return this.at(r)}return this.byField("id",e)},removeById:function(e){var r=this.indexOf({id:e});if(r>=0)return this.remove(r)},_getCollectionClass:function(){return d}}),i.exports=d});