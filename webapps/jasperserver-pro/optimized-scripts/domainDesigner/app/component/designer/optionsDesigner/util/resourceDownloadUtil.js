/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./fileDownloader","../../../../../rest/enum/endpointsEnum"],function(e,n,o){var r=e("./fileDownloader"),d=e("../../../../../rest/enum/endpointsEnum");o.exports={downloadResource:function(e,n,o){if(e.content)r.download(e.content.raw,o(e));else{var t=d.RESOURCES_SERVICE+e.uri;r.downloadUrl(t,n(e))}}}});