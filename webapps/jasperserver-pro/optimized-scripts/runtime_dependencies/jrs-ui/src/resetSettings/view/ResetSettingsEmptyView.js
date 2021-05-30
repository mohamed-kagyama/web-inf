/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone.marionette","text!../templates/emptyCollectionViewTemplate.htm"],function(e,t,m){var o=e("underscore"),a=e("backbone.marionette"),l=e("text!../templates/emptyCollectionViewTemplate.htm"),n=a.ItemView.extend({className:"table-row",template:o.template(l)});m.exports=n});