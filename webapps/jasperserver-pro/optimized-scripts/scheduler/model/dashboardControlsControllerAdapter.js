/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery"],function(e,r,n){var t=e("underscore"),o=e("jquery");n.exports=function(e){this.controls=[],this.validate=function(){var r=new o.Deferred,n=this.controls.map(function(r){var n=r.model.getOwnerParameterName(),o=e.get("source").parameters.parameterValues,i={};return t.isUndefined(o[n])?i[n]=o[r.model.id]:i[n]=o[n],r.inputControlCollection.updateState({params:i})});return n.length?1===n.length?n[0].done(function(e){r.resolve(!e.inputControlState[0].error)}).fail(function(){r.fail()}):o.when.apply(o,n).done(function(){r.resolve(t.reduce(arguments,function(e,r){return e&&!r[0].inputControlState[0].error}),!0)}).fail(function(){r.reject()}):r.resolve(!0),r}}});