/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/importRestErrorCodesEnum","bundle!ImportExportBundle","settings!awsSettings"],function(e,r,t){var n=e("../enum/importRestErrorCodesEnum"),o=e("bundle!ImportExportBundle"),i=e("settings!awsSettings"),u=function(){return i.productTypeIsJrsAmi||i.productTypeIsMpAmi?o["import.decode.failed.aws"]:o["import.decode.failed"]},d=function(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}({},n.IMPORT_DECODE_FAILED,u);t.exports={create:function(e){var r=d[e];return r?r():o[e]||o["import.error.unexpected"]}}});