/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone"],function(e,n,o){var t=e("backbone");o.exports=t.Collection.extend({findComponentDeep:function(e){var n=this.filter({componentType:e}),o=this.reduce(function(n,o){return n.concat(o.components.findComponentDeep(e))},[]);return n.concat(o)}})});