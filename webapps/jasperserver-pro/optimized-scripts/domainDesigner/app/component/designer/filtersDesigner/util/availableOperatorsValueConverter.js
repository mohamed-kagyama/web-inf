/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,t){var o=r("underscore"),n=o.template("{{-operator}}:{{-rightOperand}}");t.exports={convert:function(r){var e=r.operator,t=r.rightOperand;return n({operator:e,rightOperand:t})},parse:function(r){var e=r.split(":");return{operator:e[0],rightOperand:e[1]}}}});