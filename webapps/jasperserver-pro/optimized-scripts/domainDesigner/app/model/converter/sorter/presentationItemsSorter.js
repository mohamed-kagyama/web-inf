/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../model/schema/util/entityUtil"],function(e,t,r){function n(e){var t=e.reduce(function(e,t){var r=[];return i.isPresentationSet(t)?(r=n(t.children),t.children.fromArray(r),e.sets.push(t)):i.isPresentationField(t)&&e.fields.push(t),e},{sets:[],fields:[]});return t.fields.concat(t.sets)}var i=e("../../../../model/schema/util/entityUtil");r.exports={sort:function(e){return e.dataIslands.each(function(e){var t=n(e.children);e.children.fromArray(t)}),e}}});