/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","request","../../rest/request/RequestWrapper","../../rest/request/requestFactory"],function(e,r,t){var s=e("request"),u=e("../../rest/request/RequestWrapper"),q=e("../../rest/request/requestFactory");t.exports=function(e,r){var t=new u({request:s});e.register("requestWrapper",t),e.register("request",q.create(t))}});