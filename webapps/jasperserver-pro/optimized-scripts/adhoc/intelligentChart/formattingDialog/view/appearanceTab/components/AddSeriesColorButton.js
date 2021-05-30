/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react","./base/PlusButton","bundle!adhoc_messages"],function(e,t,n){var o=e("react"),u=e("./base/PlusButton"),r=u.PlusButton,s=e("bundle!adhoc_messages"),l=function(e){return function(t){return o.createElement(e,{label:s.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ADD_SERIES_COLOR,onClick:t.onClick})}},a=l(r);t.createAddSeriesColorButton=l,t.AddSeriesColorButton=a});