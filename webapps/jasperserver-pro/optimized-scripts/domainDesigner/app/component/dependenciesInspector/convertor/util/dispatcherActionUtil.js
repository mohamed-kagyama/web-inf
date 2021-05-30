/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var n=e("underscore");t.exports={getTargetEntityType:function(e){var r;return e.changes&&e.changes.schema&&(r=e.changes.schema.entityType),r},getTargetEntitiesIds:function(e){var r,t=n.first(e.args);return n.isObject(t)?t.id?r=[t.id]:t.ids&&(r=t.ids):t&&(r=[t]),r||(r=[]),r}}});