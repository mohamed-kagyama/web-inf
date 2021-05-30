/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define("runtime_dependencies/jrs-ui/src/messages/details/messageDetails",["require","exports","module","../../components/components.toolbarButtons","../../core/core.layout","../../util/utils.common","runtime_dependencies/js-sdk/src/common/util/xssUtil","prototype"],function(e,s,t){var i=e("../../components/components.toolbarButtons"),n=e("../../core/core.layout"),o=e("../../util/utils.common"),a=o.matchAny,c=e("runtime_dependencies/js-sdk/src/common/util/xssUtil"),r=e("prototype"),u=r.$,d={_flowExecutionKey:null,_message:null,toolbar:{_buttons:null,_id:"toolbar",initialize:function(){i.initialize({}),this._buttons=document.body.select(n.TOOLBAR_CAPSULE_PATTERN),this._initEventHandlers()},refresh:function(){this._buttons.each(function(e){i.setButtonState(e,!0)}.bind(this))},_initEventHandlers:function(){u(this._id).observe("click",function(e){var s=a(e.element(),[n.BUTTON_PATTERN],!0);document.location="flow.html?_flowExecutionKey="+d._flowExecutionKey+"&_eventId="+s.identify()}.bindAsEventListener(this))}},initialize:function(e){this._flowExecutionKey=e.flowExecutionKey,this._message=e.message,this._process(),this.toolbar.initialize()},_process:function(){u("subject").update(c.hardEscape(this._message.subject)),u("date").update(c.hardEscape(this._message.date)),u("component").update(c.hardEscape(this._message.component)),u("message").update(c.hardEscape(this._message.message))}};void 0===e&&document.observe("dom:loaded",function(){d.initialize(window.localContext.initOptions)}),t.exports=d}),define("runtime_dependencies/jrs-ui/src/messages/details/messageDetailsMain",["require","exports","module","requirejs-domready","./messageDetails","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,s,t){var i=e("requirejs-domready"),n=e("./messageDetails"),o=e("runtime_dependencies/js-sdk/src/jrs.configs");i(function(){n.initialize(o.messageDetailsInitOptions)})}),define("messages/details/messageDetailsMain",["require","exports","module","runtime_dependencies/jrs-ui/src/messages/details/messageDetailsMain"],function(e,s,t){e("runtime_dependencies/jrs-ui/src/messages/details/messageDetailsMain")});