/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone"],function(e,r,t){var n=e("backbone");t.exports=n.Model.extend({constructor:function(e,r){r||(r={}),this.parent=r.parent,n.Model.prototype.constructor.call(this,e,r)},_notify:function(e){this.parent._notify(e)},handleServerError:function(e){var r=this.get("uiModuleType");r&&r.handleServerError(e)},handleClientError:function(e){var r=this.get("uiModuleType");r&&r.handleClientError(e)}})});