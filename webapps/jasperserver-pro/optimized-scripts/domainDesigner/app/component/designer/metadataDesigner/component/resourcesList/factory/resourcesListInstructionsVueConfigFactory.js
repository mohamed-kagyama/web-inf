/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/resourcesListInstructionsVueTemplate.htm"],function(t,e,i){var r=t("text!../template/resourcesListInstructionsVueTemplate.htm");i.exports={create:function(t){return{template:r,mixins:t.mixins,props:["instructionTitle","instructionText"],mounted:function(){this._destroyDroppable&&this._destroyDroppable(),this._initializeDroppable&&this._initializeDroppable()}}}}});