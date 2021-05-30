/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../rest/enum/mimeTypesEnum"],function(e,n,o){function d(e,n){var o,d=new Blob([e],{type:r.OCTET_STREAM});window.navigator.msSaveOrOpenBlob?window.navigator.msSaveOrOpenBlob(d,n):(o=window.URL.createObjectURL(d),t(o,n),window.URL.revokeObjectURL(o))}function t(e,n){a.href=e,a.download=n,a.click()}var r=e("../../../../../rest/enum/mimeTypesEnum"),a=document.createElement("a");a.style="display: none",document.body.appendChild(a),o.exports={download:d,downloadUrl:t}});