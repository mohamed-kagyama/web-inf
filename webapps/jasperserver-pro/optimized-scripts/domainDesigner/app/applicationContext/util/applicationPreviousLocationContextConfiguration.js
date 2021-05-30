/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/uriLocation"],function(o,i,e){var r=o("underscore"),n=o("../../util/uriLocation");e.exports=function(o,i){o.register("goToPreviousLocation",r.partial(n.changeLocation,i.previousLocation))}});