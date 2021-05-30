/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","requirejs-domready","runtime_dependencies/js-sdk/src/common/util/encrypter"],function(e,r,n){var t=e("jquery"),i=e("underscore"),c=e("requirejs-domready"),o=e("runtime_dependencies/js-sdk/src/common/util/encrypter");c(function(){var e=t("#text1"),r=t("#text2"),n=function(n){t.trim(e.val())&&(window.isEncryptionOn&&o.encryptData({j_password:e.val()},function(e){for(var n in e)r.removeAttr("disabled").val(e[n])}),n.preventDefault())},c=function(n){e.val(""),r.val(""),n.preventDefault()};t("#clearButton").click(c),t("#submitButton").click(n),e.keypress(function(e){13==(e.keyCode||e.which)&&i.defer(n,e)})})});