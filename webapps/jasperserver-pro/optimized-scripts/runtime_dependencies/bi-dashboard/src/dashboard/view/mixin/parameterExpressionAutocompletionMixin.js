/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../designer/ParameterMenu"],function(e,t,i){var n=e("../designer/ParameterMenu");i.exports={applyParameterExpressionAutocompletionMixin:function(){var e=this,t=function(){n.onInput.apply(e,arguments)};this.$("input[data-jrs-parameterized-input]").on("input",t),this.on("close",n.close);var i=this.remove;this.remove=function(){return this.$("input[data-jrs-parameterized-input]").off("input",t),this.off("close",n.close),i.apply(this,arguments)}}}});