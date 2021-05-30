/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./wrapper/PopoverVueWrapper"],function(e,p,r){function o(e,p){e._popoverVueWrapper.setState(p.value)}var u=e("./wrapper/PopoverVueWrapper");r.exports={bind:function(e,p){e._popoverVueWrapper=new u({directiveEl:e}),document.body.appendChild(e._popoverVueWrapper.$mount().$el),o(e,p)},update:o,unbind:function(e){e._popoverVueWrapper.remove(),delete e._popoverVueWrapper}}});