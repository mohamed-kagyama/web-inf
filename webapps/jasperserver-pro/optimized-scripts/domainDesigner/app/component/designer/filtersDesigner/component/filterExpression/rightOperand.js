/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","text!./template/rightOperandTemplate.htm"],function(e,t,p){var r=e("vue"),a=e("text!./template/rightOperandTemplate.htm");p.exports=r.extend({template:a,props:["value"],methods:{}})});