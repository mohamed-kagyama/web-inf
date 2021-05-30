/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./userSettings/getMinValue","./userSettings/getMaxValue","./userSettings/getDecimalPlaces","./userSettings/getValueSuffix","./userSettings/getLayout","./userSettings/getColorStops","./userSettings/getPlotOffsets"],function(e,t,s){var u=e("./userSettings/getMinValue"),g=e("./userSettings/getMaxValue"),i=e("./userSettings/getDecimalPlaces"),r=e("./userSettings/getValueSuffix"),a=e("./userSettings/getLayout"),l=e("./userSettings/getColorStops"),n=e("./userSettings/getPlotOffsets"),S=function(e){var t=e&&e.chartState||{},s=u(t),S=g(t);if(S<s){var o=[s,S];S=o[0],s=o[1]}var f=a(t),c=i(t),x=r(t),V=l(t);return{layout:f,plotOffsets:n(t),minValue:s,maxValue:S,decimalPlaces:c,colorStops:V,valueSuffix:x}};s.exports=S});