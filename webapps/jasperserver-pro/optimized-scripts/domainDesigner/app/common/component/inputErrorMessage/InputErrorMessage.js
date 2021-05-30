/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","./inputErrorMessageVueConfigFactory","text!./template/inputErrorMessageTemplate.htm"],function(e,t,r){var a=e("vue"),o=e("./inputErrorMessageVueConfigFactory"),p=e("text!./template/inputErrorMessageTemplate.htm");r.exports=a.extend(o.create({template:p}))});