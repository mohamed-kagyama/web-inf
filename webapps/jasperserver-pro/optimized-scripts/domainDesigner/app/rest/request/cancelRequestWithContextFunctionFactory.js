/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,t){t.exports={create:function(e){var r=e.request;return function(e){e=e||{};var t=e.contextUUIDUrl;t&&r({type:"DELETE",url:t})}}}});