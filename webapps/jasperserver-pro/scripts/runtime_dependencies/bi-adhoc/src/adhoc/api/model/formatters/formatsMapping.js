define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  en: {
    none: {
      'medium,hide': 'MMM D, YYYY',
      'short,hide': 'M/D/YY',
      'long,hide': 'MMMM D, YYYY',
      'medium,medium': 'MMM D, YYYY h:mm:ss A',
      'hide,medium': 'h:mm:ss A',
      'hide,short': 'h:mm A',
      'hide,long': 'h:mm:ss A z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    year: {
      'medium,hide': 'YYYY',
      'short,hide': 'YYYY',
      'long,hide': 'YYYY',
      'medium,medium': 'YYYY',
      'hide,medium': 'YYYY',
      'hide,short': 'YYYY',
      'hide,long': 'YYYY',
      'HH:mm:ss': 'YYYY'
    },
    quarter: {
      'medium,hide': '[Q]Q YYYY',
      'short,hide': '[Q]Q YYYY',
      'long,hide': '[Q]Q YYYY',
      'medium,medium': '[Q]Q YYYY',
      'hide,medium': '[Q]Q YYYY',
      'hide,short': '[Q]Q YYYY',
      'hide,long': '[Q]Q YYYY',
      'HH:mm:ss': '[Q]Q YYYY'
    },
    month: {
      'medium,hide': 'MMMM YYYY',
      'short,hide': 'MMMM YYYY',
      'long,hide': 'MMMM YYYY',
      'medium,medium': 'MMMM YYYY',
      'hide,medium': 'MMMM YYYY',
      'hide,short': 'MMMM YYYY',
      'hide,long': 'MMMM YYYY',
      'HH:mm:ss': 'MMMM YYYY'
    },
    day: {
      'medium,hide': 'MMM D, YYYY',
      'short,hide': 'M/D/YY',
      'long,hide': 'MMMM D, YYYY',
      'medium,medium': 'MMM D, YYYY h:mm:ss A',
      'hide,medium': 'h:mm:ss A',
      'hide,short': 'h:mm A',
      'hide,long': 'h:mm:ss A z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    hour: {
      'medium,hide': 'h:mm A',
      'short,hide': 'h:mm A',
      'long,hide': 'h:mm A',
      'medium,medium': 'h:mm A',
      'hide,medium': 'h:mm A',
      'hide,short': 'h:mm A',
      'hide,long': 'h:mm A',
      'HH:mm:ss': 'h:mm A'
    },
    minute: {
      'medium,hide': 'h:mm A',
      'short,hide': 'h:mm A',
      'long,hide': 'h:mm A',
      'medium,medium': 'h:mm A',
      'hide,medium': 'h:mm A',
      'hide,short': 'h:mm A',
      'hide,long': 'h:mm A',
      'HH:mm:ss': 'h:mm A'
    },
    second: {
      'medium,hide': 'h:mm:ss A',
      'short,hide': 'M/D/YY',
      'long,hide': 'MMMM D, YYYY',
      'medium,medium': 'MMM D, YYYY h:mm:ss A',
      'hide,medium': 'h:mm:ss A',
      'hide,short': 'h:mm A',
      'hide,long': 'h:mm:ss A z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    millisecond: {
      'medium,hide': 'HH:mm:ss.SSS',
      'short,hide': 'HH:mm:ss.SSS',
      'long,hide': 'HH:mm:ss.SSS',
      'medium,medium': 'HH:mm:ss.SSS',
      'hide,medium': 'HH:mm:ss.SSS',
      'hide,short': 'HH:mm:ss.SSS',
      'hide,long': 'HH:mm:ss.SSS',
      'HH:mm:ss': 'HH:mm:ss.SSS'
    },
    hour_by_day: {
      'medium,hide': 'M/D/YY h:mm A',
      'short,hide': 'M/D/YY h:mm A',
      'long,hide': 'M/D/YY h:mm A',
      'medium,medium': 'M/D/YY h:mm A',
      'hide,medium': 'M/D/YY h:mm A',
      'hide,short': 'M/D/YY h:mm A',
      'hide,long': 'M/D/YY h:mm A',
      'HH:mm:ss': 'M/D/YY h:mm A'
    },
    minute_by_day: {
      'medium,hide': 'M/D/YY h:mm A',
      'short,hide': 'M/D/YY h:mm A',
      'long,hide': 'M/D/YY h:mm A',
      'medium,medium': 'M/D/YY h:mm A',
      'hide,medium': 'M/D/YY h:mm A',
      'hide,short': 'M/D/YY h:mm A',
      'hide,long': 'M/D/YY h:mm A',
      'HH:mm:ss': 'M/D/YY h:mm A'
    },
    second_by_day: {
      'medium,hide': 'M/D/YY h:mm:ss A',
      'short,hide': 'M/D/YY h:mm:ss A',
      'long,hide': 'M/D/YY h:mm:ss A',
      'medium,medium': 'M/D/YY h:mm:ss A',
      'hide,medium': 'M/D/YY h:mm:ss A',
      'hide,short': 'M/D/YY h:mm:ss A',
      'hide,long': 'M/D/YY h:mm:ss A',
      'HH:mm:ss': 'M/D/YY h:mm:ss A'
    },
    millisecond_by_day: {
      'medium,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'short,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'long,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'medium,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,short': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,long': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'HH:mm:ss': 'MMM DD, YYYY hh:mm:ss.SSS A'
    }
  },
  de: {
    none: {
      'medium,hide': 'DD.MM.YYYY',
      'short,hide': 'DD.MM.YY',
      'long,hide': 'D. MMMM YYYY',
      'medium,medium': 'DD.MM.YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    year: {
      'medium,hide': 'YYYY',
      'short,hide': 'YYYY',
      'long,hide': 'YYYY',
      'medium,medium': 'YYYY',
      'hide,medium': 'YYYY',
      'hide,short': 'YYYY',
      'hide,long': 'YYYY',
      'HH:mm:ss': 'YYYY'
    },
    quarter: {
      'medium,hide': '[Q]Q YYYY',
      'short,hide': '[Q]Q YYYY',
      'long,hide': '[Q]Q YYYY',
      'medium,medium': '[Q]Q YYYY',
      'hide,medium': '[Q]Q YYYY',
      'hide,short': '[Q]Q YYYY',
      'hide,long': '[Q]Q YYYY',
      'HH:mm:ss': '[Q]Q YYYY'
    },
    month: {
      'medium,hide': 'MMMM YYYY',
      'short,hide': 'MMMM YYYY',
      'long,hide': 'MMMM YYYY',
      'medium,medium': 'MMMM YYYY',
      'hide,medium': 'MMMM YYYY',
      'hide,short': 'MMMM YYYY',
      'hide,long': 'MMMM YYYY',
      'HH:mm:ss': 'MMMM YYYY'
    },
    day: {
      'medium,hide': 'DD.MM.YYYY',
      'short,hide': 'DD.MM.YY',
      'long,hide': 'D. MMMM YYYY',
      'medium,medium': 'DD.MM.YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    hour: {
      'medium,hide': 'HH:mm',
      'short,hide': 'HH:mm',
      'long,hide': 'HH:mm',
      'medium,medium': 'HH:mm',
      'hide,medium': 'HH:mm',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm',
      'HH:mm:ss': 'HH:mm'
    },
    minute: {
      'medium,hide': 'HH:mm',
      'short,hide': 'HH:mm',
      'long,hide': 'HH:mm',
      'medium,medium': 'HH:mm',
      'hide,medium': 'HH:mm',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm',
      'HH:mm:ss': 'HH:mm'
    },
    second: {
      'medium,hide': 'HH:mm:ss',
      'short,hide': 'DD.MM.YY',
      'long,hide': 'D. MMMM YYYY',
      'medium,medium': 'DD.MM.YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    millisecond: {
      'medium,hide': 'HH:mm:ss.SSS',
      'short,hide': 'HH:mm:ss.SSS',
      'long,hide': 'HH:mm:ss.SSS',
      'medium,medium': 'HH:mm:ss.SSS',
      'hide,medium': 'HH:mm:ss.SSS',
      'hide,short': 'HH:mm:ss.SSS',
      'hide,long': 'HH:mm:ss.SSS',
      'HH:mm:ss': 'HH:mm:ss.SSS'
    },
    hour_by_day: {
      'medium,hide': 'DD.MM.YY HH:mm',
      'short,hide': 'DD.MM.YY HH:mm',
      'long,hide': 'DD.MM.YY HH:mm',
      'medium,medium': 'DD.MM.YY HH:mm',
      'hide,medium': 'DD.MM.YY HH:mm',
      'hide,short': 'DD.MM.YY HH:mm',
      'hide,long': 'DD.MM.YY HH:mm',
      'HH:mm:ss': 'DD.MM.YY HH:mm'
    },
    minute_by_day: {
      'medium,hide': 'DD.MM.YY HH:mm',
      'short,hide': 'DD.MM.YY HH:mm',
      'long,hide': 'DD.MM.YY HH:mm',
      'medium,medium': 'DD.MM.YY HH:mm',
      'hide,medium': 'DD.MM.YY HH:mm',
      'hide,short': 'DD.MM.YY HH:mm',
      'hide,long': 'DD.MM.YY HH:mm',
      'HH:mm:ss': 'DD.MM.YY HH:mm'
    },
    second_by_day: {
      'medium,hide': 'DD.MM.YY HH:mm:ss',
      'short,hide': 'DD.MM.YY HH:mm:ss',
      'long,hide': 'DD.MM.YY HH:mm:ss',
      'medium,medium': 'DD.MM.YY HH:mm:ss',
      'hide,medium': 'DD.MM.YY HH:mm:ss',
      'hide,short': 'DD.MM.YY HH:mm:ss',
      'hide,long': 'DD.MM.YY HH:mm:ss',
      'HH:mm:ss': 'DD.MM.YY HH:mm:ss'
    },
    millisecond_by_day: {
      'medium,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'short,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'long,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'medium,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,short': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,long': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'HH:mm:ss': 'MMM DD, YYYY hh:mm:ss.SSS A'
    }
  },
  es: {
    none: {
      'medium,hide': 'DD-MMM-YYYY',
      'short,hide': 'D/MM/YY',
      'long,hide': 'D [de] MMMM [de] YYYY',
      'medium,medium': 'DD-MMM-YYYY H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    year: {
      'medium,hide': 'YYYY',
      'short,hide': 'YYYY',
      'long,hide': 'YYYY',
      'medium,medium': 'YYYY',
      'hide,medium': 'YYYY',
      'hide,short': 'YYYY',
      'hide,long': 'YYYY',
      'HH:mm:ss': 'YYYY'
    },
    quarter: {
      'medium,hide': '[Q]Q YYYY',
      'short,hide': '[Q]Q YYYY',
      'long,hide': '[Q]Q YYYY',
      'medium,medium': '[Q]Q YYYY',
      'hide,medium': '[Q]Q YYYY',
      'hide,short': '[Q]Q YYYY',
      'hide,long': '[Q]Q YYYY',
      'HH:mm:ss': '[Q]Q YYYY'
    },
    month: {
      'medium,hide': 'MMMM YYYY',
      'short,hide': 'MMMM YYYY',
      'long,hide': 'MMMM YYYY',
      'medium,medium': 'MMMM YYYY',
      'hide,medium': 'MMMM YYYY',
      'hide,short': 'MMMM YYYY',
      'hide,long': 'MMMM YYYY',
      'HH:mm:ss': 'MMMM YYYY'
    },
    day: {
      'medium,hide': 'DD-MMM-YYYY',
      'short,hide': 'D/MM/YY',
      'long,hide': 'D [de] MMMM [de] YYYY',
      'medium,medium': 'DD-MMM-YYYY H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    hour: {
      'medium,hide': 'H:mm',
      'short,hide': 'H:mm',
      'long,hide': 'H:mm',
      'medium,medium': 'H:mm',
      'hide,medium': 'H:mm',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm',
      'HH:mm:ss': 'H:mm'
    },
    minute: {
      'medium,hide': 'H:mm',
      'short,hide': 'H:mm',
      'long,hide': 'H:mm',
      'medium,medium': 'H:mm',
      'hide,medium': 'H:mm',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm',
      'HH:mm:ss': 'H:mm'
    },
    second: {
      'medium,hide': 'H:mm:ss',
      'short,hide': 'D/MM/YY',
      'long,hide': 'D [de] MMMM [de] YYYY',
      'medium,medium': 'DD-MMM-YYYY H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    millisecond: {
      'medium,hide': 'HH:mm:ss.SSS',
      'short,hide': 'HH:mm:ss.SSS',
      'long,hide': 'HH:mm:ss.SSS',
      'medium,medium': 'HH:mm:ss.SSS',
      'hide,medium': 'HH:mm:ss.SSS',
      'hide,short': 'HH:mm:ss.SSS',
      'hide,long': 'HH:mm:ss.SSS',
      'HH:mm:ss': 'HH:mm:ss.SSS'
    },
    hour_by_day: {
      'medium,hide': 'D/MM/YY H:mm',
      'short,hide': 'D/MM/YY H:mm',
      'long,hide': 'D/MM/YY H:mm',
      'medium,medium': 'D/MM/YY H:mm',
      'hide,medium': 'D/MM/YY H:mm',
      'hide,short': 'D/MM/YY H:mm',
      'hide,long': 'D/MM/YY H:mm',
      'HH:mm:ss': 'D/MM/YY H:mm'
    },
    minute_by_day: {
      'medium,hide': 'D/MM/YY H:mm',
      'short,hide': 'D/MM/YY H:mm',
      'long,hide': 'D/MM/YY H:mm',
      'medium,medium': 'D/MM/YY H:mm',
      'hide,medium': 'D/MM/YY H:mm',
      'hide,short': 'D/MM/YY H:mm',
      'hide,long': 'D/MM/YY H:mm',
      'HH:mm:ss': 'D/MM/YY H:mm'
    },
    second_by_day: {
      'medium,hide': 'D/MM/YY H:mm:ss',
      'short,hide': 'D/MM/YY H:mm:ss',
      'long,hide': 'D/MM/YY H:mm:ss',
      'medium,medium': 'D/MM/YY H:mm:ss',
      'hide,medium': 'D/MM/YY H:mm:ss',
      'hide,short': 'D/MM/YY H:mm:ss',
      'hide,long': 'D/MM/YY H:mm:ss',
      'HH:mm:ss': 'D/MM/YY H:mm:ss'
    },
    millisecond_by_day: {
      'medium,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'short,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'long,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'medium,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,short': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,long': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'HH:mm:ss': 'MMM DD, YYYY hh:mm:ss.SSS A'
    }
  },
  fr: {
    none: {
      'medium,hide': 'D MMM YYYY',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D MMMM YYYY',
      'medium,medium': 'D MMM YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    year: {
      'medium,hide': 'YYYY',
      'short,hide': 'YYYY',
      'long,hide': 'YYYY',
      'medium,medium': 'YYYY',
      'hide,medium': 'YYYY',
      'hide,short': 'YYYY',
      'hide,long': 'YYYY',
      'HH:mm:ss': 'YYYY'
    },
    quarter: {
      'medium,hide': '[Q]Q YYYY',
      'short,hide': '[Q]Q YYYY',
      'long,hide': '[Q]Q YYYY',
      'medium,medium': '[Q]Q YYYY',
      'hide,medium': '[Q]Q YYYY',
      'hide,short': '[Q]Q YYYY',
      'hide,long': '[Q]Q YYYY',
      'HH:mm:ss': '[Q]Q YYYY'
    },
    month: {
      'medium,hide': 'MMMM YYYY',
      'short,hide': 'MMMM YYYY',
      'long,hide': 'MMMM YYYY',
      'medium,medium': 'MMMM YYYY',
      'hide,medium': 'MMMM YYYY',
      'hide,short': 'MMMM YYYY',
      'hide,long': 'MMMM YYYY',
      'HH:mm:ss': 'MMMM YYYY'
    },
    day: {
      'medium,hide': 'D MMM YYYY',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D MMMM YYYY',
      'medium,medium': 'D MMM YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    hour: {
      'medium,hide': 'HH:mm',
      'short,hide': 'HH:mm',
      'long,hide': 'HH:mm',
      'medium,medium': 'HH:mm',
      'hide,medium': 'HH:mm',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm',
      'HH:mm:ss': 'HH:mm'
    },
    minute: {
      'medium,hide': 'HH:mm',
      'short,hide': 'HH:mm',
      'long,hide': 'HH:mm',
      'medium,medium': 'HH:mm',
      'hide,medium': 'HH:mm',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm',
      'HH:mm:ss': 'HH:mm'
    },
    second: {
      'medium,hide': 'HH:mm:ss',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D MMMM YYYY',
      'medium,medium': 'D MMM YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    millisecond: {
      'medium,hide': 'HH:mm:ss.SSS',
      'short,hide': 'HH:mm:ss.SSS',
      'long,hide': 'HH:mm:ss.SSS',
      'medium,medium': 'HH:mm:ss.SSS',
      'hide,medium': 'HH:mm:ss.SSS',
      'hide,short': 'HH:mm:ss.SSS',
      'hide,long': 'HH:mm:ss.SSS',
      'HH:mm:ss': 'HH:mm:ss.SSS'
    },
    hour_by_day: {
      'medium,hide': 'DD/MM/YY HH:mm',
      'short,hide': 'DD/MM/YY HH:mm',
      'long,hide': 'DD/MM/YY HH:mm',
      'medium,medium': 'DD/MM/YY HH:mm',
      'hide,medium': 'DD/MM/YY HH:mm',
      'hide,short': 'DD/MM/YY HH:mm',
      'hide,long': 'DD/MM/YY HH:mm',
      'HH:mm:ss': 'DD/MM/YY HH:mm'
    },
    minute_by_day: {
      'medium,hide': 'DD/MM/YY HH:mm',
      'short,hide': 'DD/MM/YY HH:mm',
      'long,hide': 'DD/MM/YY HH:mm',
      'medium,medium': 'DD/MM/YY HH:mm',
      'hide,medium': 'DD/MM/YY HH:mm',
      'hide,short': 'DD/MM/YY HH:mm',
      'hide,long': 'DD/MM/YY HH:mm',
      'HH:mm:ss': 'DD/MM/YY HH:mm'
    },
    second_by_day: {
      'medium,hide': 'DD/MM/YY HH:mm:ss',
      'short,hide': 'DD/MM/YY HH:mm:ss',
      'long,hide': 'DD/MM/YY HH:mm:ss',
      'medium,medium': 'DD/MM/YY HH:mm:ss',
      'hide,medium': 'DD/MM/YY HH:mm:ss',
      'hide,short': 'DD/MM/YY HH:mm:ss',
      'hide,long': 'DD/MM/YY HH:mm:ss',
      'HH:mm:ss': 'DD/MM/YY HH:mm:ss'
    },
    millisecond_by_day: {
      'medium,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'short,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'long,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'medium,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,short': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,long': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'HH:mm:ss': 'MMM DD, YYYY hh:mm:ss.SSS A'
    }
  },
  it: {
    none: {
      'medium,hide': 'D-MMM-YYYY',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D MMMM YYYY',
      'medium,medium': 'D-MMM-YYYY H.mm.ss',
      'hide,medium': 'H.mm.ss',
      'hide,short': 'H.mm',
      'hide,long': 'H.mm.ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    year: {
      'medium,hide': 'YYYY',
      'short,hide': 'YYYY',
      'long,hide': 'YYYY',
      'medium,medium': 'YYYY',
      'hide,medium': 'YYYY',
      'hide,short': 'YYYY',
      'hide,long': 'YYYY',
      'HH:mm:ss': 'YYYY'
    },
    quarter: {
      'medium,hide': '[Q]Q YYYY',
      'short,hide': '[Q]Q YYYY',
      'long,hide': '[Q]Q YYYY',
      'medium,medium': '[Q]Q YYYY',
      'hide,medium': '[Q]Q YYYY',
      'hide,short': '[Q]Q YYYY',
      'hide,long': '[Q]Q YYYY',
      'HH:mm:ss': '[Q]Q YYYY'
    },
    month: {
      'medium,hide': 'MMMM YYYY',
      'short,hide': 'MMMM YYYY',
      'long,hide': 'MMMM YYYY',
      'medium,medium': 'MMMM YYYY',
      'hide,medium': 'MMMM YYYY',
      'hide,short': 'MMMM YYYY',
      'hide,long': 'MMMM YYYY',
      'HH:mm:ss': 'MMMM YYYY'
    },
    day: {
      'medium,hide': 'D-MMM-YYYY',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D MMMM YYYY',
      'medium,medium': 'D-MMM-YYYY H.mm.ss',
      'hide,medium': 'H.mm.ss',
      'hide,short': 'H.mm',
      'hide,long': 'H.mm.ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    hour: {
      'medium,hide': 'H.mm',
      'short,hide': 'H.mm',
      'long,hide': 'H.mm',
      'medium,medium': 'H.mm',
      'hide,medium': 'H.mm',
      'hide,short': 'H.mm',
      'hide,long': 'H.mm',
      'HH:mm:ss': 'H.mm'
    },
    minute: {
      'medium,hide': 'H.mm',
      'short,hide': 'H.mm',
      'long,hide': 'H.mm',
      'medium,medium': 'H.mm',
      'hide,medium': 'H.mm',
      'hide,short': 'H.mm',
      'hide,long': 'H.mm',
      'HH:mm:ss': 'H.mm'
    },
    second: {
      'medium,hide': 'H.mm.ss',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D MMMM YYYY',
      'medium,medium': 'D-MMM-YYYY H.mm.ss',
      'hide,medium': 'H.mm.ss',
      'hide,short': 'H.mm',
      'hide,long': 'H.mm.ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    millisecond: {
      'medium,hide': 'HH:mm:ss.SSS',
      'short,hide': 'HH:mm:ss.SSS',
      'long,hide': 'HH:mm:ss.SSS',
      'medium,medium': 'HH:mm:ss.SSS',
      'hide,medium': 'HH:mm:ss.SSS',
      'hide,short': 'HH:mm:ss.SSS',
      'hide,long': 'HH:mm:ss.SSS',
      'HH:mm:ss': 'HH:mm:ss.SSS'
    },
    hour_by_day: {
      'medium,hide': 'DD/MM/YY H.mm',
      'short,hide': 'DD/MM/YY H.mm',
      'long,hide': 'DD/MM/YY H.mm',
      'medium,medium': 'DD/MM/YY H.mm',
      'hide,medium': 'DD/MM/YY H.mm',
      'hide,short': 'DD/MM/YY H.mm',
      'hide,long': 'DD/MM/YY H.mm',
      'HH:mm:ss': 'DD/MM/YY H.mm'
    },
    minute_by_day: {
      'medium,hide': 'DD/MM/YY H.mm',
      'short,hide': 'DD/MM/YY H.mm',
      'long,hide': 'DD/MM/YY H.mm',
      'medium,medium': 'DD/MM/YY H.mm',
      'hide,medium': 'DD/MM/YY H.mm',
      'hide,short': 'DD/MM/YY H.mm',
      'hide,long': 'DD/MM/YY H.mm',
      'HH:mm:ss': 'DD/MM/YY H.mm'
    },
    second_by_day: {
      'medium,hide': 'DD/MM/YY H.mm.ss',
      'short,hide': 'DD/MM/YY H.mm.ss',
      'long,hide': 'DD/MM/YY H.mm.ss',
      'medium,medium': 'DD/MM/YY H.mm.ss',
      'hide,medium': 'DD/MM/YY H.mm.ss',
      'hide,short': 'DD/MM/YY H.mm.ss',
      'hide,long': 'DD/MM/YY H.mm.ss',
      'HH:mm:ss': 'DD/MM/YY H.mm.ss'
    },
    millisecond_by_day: {
      'medium,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'short,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'long,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'medium,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,short': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,long': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'HH:mm:ss': 'MMM DD, YYYY hh:mm:ss.SSS A'
    }
  },
  ja: {
    none: {
      'medium,hide': 'YYYY/MM/DD',
      'short,hide': 'YY/MM/DD',
      'long,hide': 'YYYY/MM/DD',
      'medium,medium': 'YYYY/MM/DD H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    year: {
      'medium,hide': 'YYYY',
      'short,hide': 'YYYY',
      'long,hide': 'YYYY',
      'medium,medium': 'YYYY',
      'hide,medium': 'YYYY',
      'hide,short': 'YYYY',
      'hide,long': 'YYYY',
      'HH:mm:ss': 'YYYY'
    },
    quarter: {
      'medium,hide': '[Q]Q YYYY',
      'short,hide': '[Q]Q YYYY',
      'long,hide': '[Q]Q YYYY',
      'medium,medium': '[Q]Q YYYY',
      'hide,medium': '[Q]Q YYYY',
      'hide,short': '[Q]Q YYYY',
      'hide,long': '[Q]Q YYYY',
      'HH:mm:ss': '[Q]Q YYYY'
    },
    month: {
      'medium,hide': 'MMMM YYYY',
      'short,hide': 'MMMM YYYY',
      'long,hide': 'MMMM YYYY',
      'medium,medium': 'MMMM YYYY',
      'hide,medium': 'MMMM YYYY',
      'hide,short': 'MMMM YYYY',
      'hide,long': 'MMMM YYYY',
      'HH:mm:ss': 'MMMM YYYY'
    },
    day: {
      'medium,hide': 'YYYY/MM/DD',
      'short,hide': 'YY/MM/DD',
      'long,hide': 'YYYY/MM/DD',
      'medium,medium': 'YYYY/MM/DD H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    hour: {
      'medium,hide': 'H:mm',
      'short,hide': 'H:mm',
      'long,hide': 'H:mm',
      'medium,medium': 'H:mm',
      'hide,medium': 'H:mm',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm',
      'HH:mm:ss': 'H:mm'
    },
    minute: {
      'medium,hide': 'H:mm',
      'short,hide': 'H:mm',
      'long,hide': 'H:mm',
      'medium,medium': 'H:mm',
      'hide,medium': 'H:mm',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm',
      'HH:mm:ss': 'H:mm'
    },
    second: {
      'medium,hide': 'H:mm:ss',
      'short,hide': 'YY/MM/DD',
      'long,hide': 'YYYY/MM/DD',
      'medium,medium': 'YYYY/MM/DD H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'H:mm',
      'hide,long': 'H:mm:ss z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    millisecond: {
      'medium,hide': 'HH:mm:ss.SSS',
      'short,hide': 'HH:mm:ss.SSS',
      'long,hide': 'HH:mm:ss.SSS',
      'medium,medium': 'HH:mm:ss.SSS',
      'hide,medium': 'HH:mm:ss.SSS',
      'hide,short': 'HH:mm:ss.SSS',
      'hide,long': 'HH:mm:ss.SSS',
      'HH:mm:ss': 'HH:mm:ss.SSS'
    },
    hour_by_day: {
      'medium,hide': 'YY/MM/DD H:mm',
      'short,hide': 'YY/MM/DD H:mm',
      'long,hide': 'YY/MM/DD H:mm',
      'medium,medium': 'YY/MM/DD H:mm',
      'hide,medium': 'YY/MM/DD H:mm',
      'hide,short': 'YY/MM/DD H:mm',
      'hide,long': 'YY/MM/DD H:mm',
      'HH:mm:ss': 'YY/MM/DD H:mm'
    },
    minute_by_day: {
      'medium,hide': 'YY/MM/DD H:mm',
      'short,hide': 'YY/MM/DD H:mm',
      'long,hide': 'YY/MM/DD H:mm',
      'medium,medium': 'YY/MM/DD H:mm',
      'hide,medium': 'YY/MM/DD H:mm',
      'hide,short': 'YY/MM/DD H:mm',
      'hide,long': 'YY/MM/DD H:mm',
      'HH:mm:ss': 'YY/MM/DD H:mm'
    },
    second_by_day: {
      'medium,hide': 'YY/MM/DD H:mm:ss',
      'short,hide': 'YY/MM/DD H:mm:ss',
      'long,hide': 'YY/MM/DD H:mm:ss',
      'medium,medium': 'YY/MM/DD H:mm:ss',
      'hide,medium': 'YY/MM/DD H:mm:ss',
      'hide,short': 'YY/MM/DD H:mm:ss',
      'hide,long': 'YY/MM/DD H:mm:ss',
      'HH:mm:ss': 'YY/MM/DD H:mm:ss'
    },
    millisecond_by_day: {
      'medium,hide': 'M DD, YYYY hh:mm:ss.SSS A',
      'short,hide': 'M DD, YYYY hh:mm:ss.SSS A',
      'long,hide': 'M DD, YYYY hh:mm:ss.SSS A',
      'medium,medium': 'M DD, YYYY hh:mm:ss.SSS A',
      'hide,medium': 'M DD, YYYY hh:mm:ss.SSS A',
      'hide,short': 'M DD, YYYY hh:mm:ss.SSS A',
      'hide,long': 'M DD, YYYY hh:mm:ss.SSS A',
      'HH:mm:ss': 'M DD, YYYY hh:mm:ss.SSS A'
    }
  },
  pt: {
    none: {
      'medium,hide': 'DD/MM/YYYY',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D [de] MMMM [de] YYYY',
      'medium,medium': 'DD/MM/YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'H[h]m[min]s[s] z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    year: {
      'medium,hide': 'YYYY',
      'short,hide': 'YYYY',
      'long,hide': 'YYYY',
      'medium,medium': 'YYYY',
      'hide,medium': 'YYYY',
      'hide,short': 'YYYY',
      'hide,long': 'YYYY',
      'HH:mm:ss': 'YYYY'
    },
    quarter: {
      'medium,hide': '[Q]Q YYYY',
      'short,hide': '[Q]Q YYYY',
      'long,hide': '[Q]Q YYYY',
      'medium,medium': '[Q]Q YYYY',
      'hide,medium': '[Q]Q YYYY',
      'hide,short': '[Q]Q YYYY',
      'hide,long': '[Q]Q YYYY',
      'HH:mm:ss': '[Q]Q YYYY'
    },
    month: {
      'medium,hide': 'MMMM YYYY',
      'short,hide': 'MMMM YYYY',
      'long,hide': 'MMMM YYYY',
      'medium,medium': 'MMMM YYYY',
      'hide,medium': 'MMMM YYYY',
      'hide,short': 'MMMM YYYY',
      'hide,long': 'MMMM YYYY',
      'HH:mm:ss': 'MMMM YYYY'
    },
    day: {
      'medium,hide': 'DD/MM/YYYY',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D [de] MMMM [de] YYYY',
      'medium,medium': 'DD/MM/YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'H[h]m[min]s[s] z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    hour: {
      'medium,hide': 'HH:mm',
      'short,hide': 'HH:mm',
      'long,hide': 'HH:mm',
      'medium,medium': 'HH:mm',
      'hide,medium': 'HH:mm',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm',
      'HH:mm:ss': 'HH:mm'
    },
    minute: {
      'medium,hide': 'HH:mm',
      'short,hide': 'HH:mm',
      'long,hide': 'HH:mm',
      'medium,medium': 'HH:mm',
      'hide,medium': 'HH:mm',
      'hide,short': 'HH:mm',
      'hide,long': 'HH:mm',
      'HH:mm:ss': 'HH:mm'
    },
    second: {
      'medium,hide': 'HH:mm:ss',
      'short,hide': 'DD/MM/YY',
      'long,hide': 'D [de] MMMM [de] YYYY',
      'medium,medium': 'DD/MM/YYYY HH:mm:ss',
      'hide,medium': 'HH:mm:ss',
      'hide,short': 'HH:mm',
      'hide,long': 'H[h]m[min]s[s] z',
      'HH:mm:ss': 'HH:mm:ss'
    },
    millisecond: {
      'medium,hide': 'HH:mm:ss.SSS',
      'short,hide': 'HH:mm:ss.SSS',
      'long,hide': 'HH:mm:ss.SSS',
      'medium,medium': 'HH:mm:ss.SSS',
      'hide,medium': 'HH:mm:ss.SSS',
      'hide,short': 'HH:mm:ss.SSS',
      'hide,long': 'HH:mm:ss.SSS',
      'HH:mm:ss': 'HH:mm:ss.SSS'
    },
    hour_by_day: {
      'medium,hide': 'DD/MM/YY HH:mm',
      'short,hide': 'DD/MM/YY HH:mm',
      'long,hide': 'DD/MM/YY HH:mm',
      'medium,medium': 'DD/MM/YY HH:mm',
      'hide,medium': 'DD/MM/YY HH:mm',
      'hide,short': 'DD/MM/YY HH:mm',
      'hide,long': 'DD/MM/YY HH:mm',
      'HH:mm:ss': 'DD/MM/YY HH:mm'
    },
    minute_by_day: {
      'medium,hide': 'DD/MM/YY HH:mm',
      'short,hide': 'DD/MM/YY HH:mm',
      'long,hide': 'DD/MM/YY HH:mm',
      'medium,medium': 'DD/MM/YY HH:mm',
      'hide,medium': 'DD/MM/YY HH:mm',
      'hide,short': 'DD/MM/YY HH:mm',
      'hide,long': 'DD/MM/YY HH:mm',
      'HH:mm:ss': 'DD/MM/YY HH:mm'
    },
    second_by_day: {
      'medium,hide': 'DD/MM/YY HH:mm:ss',
      'short,hide': 'DD/MM/YY HH:mm:ss',
      'long,hide': 'DD/MM/YY HH:mm:ss',
      'medium,medium': 'DD/MM/YY HH:mm:ss',
      'hide,medium': 'DD/MM/YY HH:mm:ss',
      'hide,short': 'DD/MM/YY HH:mm:ss',
      'hide,long': 'DD/MM/YY HH:mm:ss',
      'HH:mm:ss': 'DD/MM/YY HH:mm:ss'
    },
    millisecond_by_day: {
      'medium,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'short,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'long,hide': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'medium,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,medium': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,short': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'hide,long': 'MMM DD, YYYY hh:mm:ss.SSS A',
      'HH:mm:ss': 'MMM DD, YYYY hh:mm:ss.SSS A'
    }
  },
  zh: {
    none: {
      'medium,hide': 'YYYY-M-D',
      'short,hide': 'YY-M-D',
      'long,hide': 'YYYY年M月D日',
      'medium,medium': 'YYYY-M-D H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'Ah:mm',
      'hide,long': 'Ahh时mm分ss秒',
      'HH:mm:ss': 'HH:mm:ss'
    },
    year: {
      'medium,hide': 'YYYY',
      'short,hide': 'YYYY',
      'long,hide': 'YYYY',
      'medium,medium': 'YYYY',
      'hide,medium': 'YYYY',
      'hide,short': 'YYYY',
      'hide,long': 'YYYY',
      'HH:mm:ss': 'YYYY'
    },
    quarter: {
      'medium,hide': '[Q]Q YYYY',
      'short,hide': '[Q]Q YYYY',
      'long,hide': '[Q]Q YYYY',
      'medium,medium': '[Q]Q YYYY',
      'hide,medium': '[Q]Q YYYY',
      'hide,short': '[Q]Q YYYY',
      'hide,long': '[Q]Q YYYY',
      'HH:mm:ss': '[Q]Q YYYY'
    },
    month: {
      'medium,hide': 'MMMM YYYY',
      'short,hide': 'MMMM YYYY',
      'long,hide': 'MMMM YYYY',
      'medium,medium': 'MMMM YYYY',
      'hide,medium': 'MMMM YYYY',
      'hide,short': 'MMMM YYYY',
      'hide,long': 'MMMM YYYY',
      'HH:mm:ss': 'MMMM YYYY'
    },
    day: {
      'medium,hide': 'YYYY-M-D',
      'short,hide': 'YY-M-D',
      'long,hide': 'YYYY年M月D日',
      'medium,medium': 'YYYY-M-D H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'Ah:mm',
      'hide,long': 'Ahh时mm分ss秒',
      'HH:mm:ss': 'HH:mm:ss'
    },
    hour: {
      'medium,hide': 'Ah:mm',
      'short,hide': 'Ah:mm',
      'long,hide': 'Ah:mm',
      'medium,medium': 'Ah:mm',
      'hide,medium': 'Ah:mm',
      'hide,short': 'Ah:mm',
      'hide,long': 'Ah:mm',
      'HH:mm:ss': 'Ah:mm'
    },
    minute: {
      'medium,hide': 'Ah:mm',
      'short,hide': 'Ah:mm',
      'long,hide': 'Ah:mm',
      'medium,medium': 'Ah:mm',
      'hide,medium': 'Ah:mm',
      'hide,short': 'Ah:mm',
      'hide,long': 'Ah:mm',
      'HH:mm:ss': 'Ah:mm'
    },
    second: {
      'medium,hide': 'H:mm:ss',
      'short,hide': 'YY-M-D',
      'long,hide': 'YYYY年M月D日',
      'medium,medium': 'YYYY-M-D H:mm:ss',
      'hide,medium': 'H:mm:ss',
      'hide,short': 'Ah:mm',
      'hide,long': 'Ahh时mm分ss秒',
      'HH:mm:ss': 'HH:mm:ss'
    },
    millisecond: {
      'medium,hide': 'HH:mm:ss.SSS',
      'short,hide': 'HH:mm:ss.SSS',
      'long,hide': 'HH:mm:ss.SSS',
      'medium,medium': 'HH:mm:ss.SSS',
      'hide,medium': 'HH:mm:ss.SSS',
      'hide,short': 'HH:mm:ss.SSS',
      'hide,long': 'HH:mm:ss.SSS',
      'HH:mm:ss': 'HH:mm:ss.SSS'
    },
    hour_by_day: {
      'medium,hide': 'YY-M-D Ah:mm',
      'short,hide': 'YY-M-D Ah:mm',
      'long,hide': 'YY-M-D Ah:mm',
      'medium,medium': 'YY-M-D Ah:mm',
      'hide,medium': 'YY-M-D Ah:mm',
      'hide,short': 'YY-M-D Ah:mm',
      'hide,long': 'YY-M-D Ah:mm',
      'HH:mm:ss': 'YY-M-D Ah:mm'
    },
    minute_by_day: {
      'medium,hide': 'YY-M-D Ah:mm',
      'short,hide': 'YY-M-D Ah:mm',
      'long,hide': 'YY-M-D Ah:mm',
      'medium,medium': 'YY-M-D Ah:mm',
      'hide,medium': 'YY-M-D Ah:mm',
      'hide,short': 'YY-M-D Ah:mm',
      'hide,long': 'YY-M-D Ah:mm',
      'HH:mm:ss': 'YY-M-D Ah:mm'
    },
    second_by_day: {
      'medium,hide': 'YY-M-D H:mm:ss',
      'short,hide': 'YY-M-D H:mm:ss',
      'long,hide': 'YY-M-D H:mm:ss',
      'medium,medium': 'YY-M-D H:mm:ss',
      'hide,medium': 'YY-M-D H:mm:ss',
      'hide,short': 'YY-M-D H:mm:ss',
      'hide,long': 'YY-M-D H:mm:ss',
      'HH:mm:ss': 'YY-M-D H:mm:ss'
    },
    millisecond_by_day: {
      'medium,hide': 'MMMM DD, YYYY hh:mm:ss.SSS A',
      'short,hide': 'MMMM DD, YYYY hh:mm:ss.SSS A',
      'long,hide': 'MMMM DD, YYYY hh:mm:ss.SSS A',
      'medium,medium': 'MMMM DD, YYYY hh:mm:ss.SSS A',
      'hide,medium': 'MMMM DD, YYYY hh:mm:ss.SSS A',
      'hide,short': 'MMMM DD, YYYY hh:mm:ss.SSS A',
      'hide,long': 'MMMM DD, YYYY hh:mm:ss.SSS A',
      'HH:mm:ss': 'MMMM DD, YYYY hh:mm:ss.SSS A'
    }
  }
};

});