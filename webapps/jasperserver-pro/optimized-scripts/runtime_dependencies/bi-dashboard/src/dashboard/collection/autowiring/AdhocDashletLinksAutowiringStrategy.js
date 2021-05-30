/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseAutowiringStrategy"],function(e,r,t){var i=e("underscore"),n=e("./BaseAutowiringStrategy");t.exports=n.extend({autowire:function(e,r,t){if(r.parametersFromProperties){var n=i.filter(r.get("parameters"),function(e){return i.indexOf(r.parametersFromProperties,e.id)>-1}),o=i.filter(r.get("outputParameters"),function(e){return i.findWhere(n,{id:e.id})});e.each(function(e){if(e.get("component")===r.id){var t=i.findWhere(o,{id:e.get("name")});t&&e.consumers.add({consumer:r.id+":"+t.id})}})}}})});