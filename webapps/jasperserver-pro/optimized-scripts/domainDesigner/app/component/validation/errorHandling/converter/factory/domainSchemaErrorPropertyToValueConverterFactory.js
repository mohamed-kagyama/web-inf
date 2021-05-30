/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/extractPropertyByKeyUtil"],function(e,r,t){var a=e("underscore"),u=e("../../util/extractPropertyByKeyUtil"),n=a.template('"{{=value}}"');t.exports={create:function(e){return{convert:function(r){var t;if(a.isNumber(e))t=r.parameters[e];else{var i=u.extract(r.parameters,e);t=i&&i.value}return a.isUndefined(t)?t:n({value:t})}}}}});