/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/complexJoinHeaderVueTemplate.htm"],function(e,t,m){var r=e("text!../template/complexJoinHeaderVueTemplate.htm");m.exports={create:function(e){var t=e.mixins;return{template:r,props:["join"],mixins:t}}}});