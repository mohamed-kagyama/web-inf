/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../../common/vue/computed/i18nComputed"],function(e,o,t){var n=e("underscore"),i=e("../../../../../../../common/vue/computed/i18nComputed");t.exports={computed:n.extend({primaryButtonLabel:function(){return this.isRepositoryTab?this.i18n2["button.add"]:this.i18n["domain.designer.advanced.options.securityFileUploadDialog.button.import"]}},i)}});