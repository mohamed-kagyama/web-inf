/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(i,n){"function"==typeof define&&define.amd?define(["numeral"],n):n("object"==typeof module&&module.exports?require("./numeral"):i.numeral)}(this,function(i){!function(){i.register("locale","bg",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"\u0445\u0438\u043b",million:"\u043c\u043b\u043d",billion:"\u043c\u043b\u0440\u0434",trillion:"\u0442\u0440\u043b\u043d"},ordinal:function(i){return""},currency:{symbol:"\u043b\u0432"}})}(),function(){i.register("locale","chs",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"\u5343",million:"\u767e\u4e07",billion:"\u5341\u4ebf",trillion:"\u5146"},ordinal:function(i){return"."},currency:{symbol:"\xa5"}})}(),function(){i.register("locale","cs",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"tis.",million:"mil.",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"K\u010d"}})}(),function(){i.register("locale","da-dk",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mio",billion:"mia",trillion:"b"},ordinal:function(i){return"."},currency:{symbol:"DKK"}})}(),function(){i.register("locale","de-ch",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){return"."},currency:{symbol:"CHF"}})}(),function(){i.register("locale","de",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){return"."},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","en-au",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){var n=i%10;return 1==~~(i%100/10)?"th":1===n?"st":2===n?"nd":3===n?"rd":"th"},currency:{symbol:"$"}})}(),function(){i.register("locale","en-gb",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){var n=i%10;return 1==~~(i%100/10)?"th":1===n?"st":2===n?"nd":3===n?"rd":"th"},currency:{symbol:"\xa3"}})}(),function(){i.register("locale","en-za",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){var n=i%10;return 1==~~(i%100/10)?"th":1===n?"st":2===n?"nd":3===n?"rd":"th"},currency:{symbol:"R"}})}(),function(){i.register("locale","es-es",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mm",billion:"b",trillion:"t"},ordinal:function(i){var n=i%10;return 1===n||3===n?"er":2===n?"do":7===n||0===n?"mo":8===n?"vo":9===n?"no":"to"},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","es",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mm",billion:"b",trillion:"t"},ordinal:function(i){var n=i%10;return 1===n||3===n?"er":2===n?"do":7===n||0===n?"mo":8===n?"vo":9===n?"no":"to"},currency:{symbol:"$"}})}(),function(){i.register("locale","et",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:" tuh",million:" mln",billion:" mld",trillion:" trl"},ordinal:function(i){return"."},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","fi",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"M",billion:"G",trillion:"T"},ordinal:function(i){return"."},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","fr-ca",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"M",billion:"G",trillion:"T"},ordinal:function(i){return 1===i?"er":"e"},currency:{symbol:"$"}})}(),function(){i.register("locale","fr-ch",{delimiters:{thousands:"'",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){return 1===i?"er":"e"},currency:{symbol:"CHF"}})}(),function(){i.register("locale","fr",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){return 1===i?"er":"e"},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","hu",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"E",million:"M",billion:"Mrd",trillion:"T"},ordinal:function(i){return"."},currency:{symbol:" Ft"}})}(),function(){i.register("locale","it",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"mila",million:"mil",billion:"b",trillion:"t"},ordinal:function(i){return"\xba"},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","ja",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"\u5343",million:"\u767e\u4e07",billion:"\u5341\u5104",trillion:"\u5146"},ordinal:function(i){return"."},currency:{symbol:"\xa5"}})}(),function(){i.register("locale","lv",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:" t\u016bkst.",million:" milj.",billion:" mljrd.",trillion:" trilj."},ordinal:function(i){return"."},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","nl-be",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:" mln",billion:" mld",trillion:" bln"},ordinal:function(i){var n=i%100;return 0!==i&&n<=1||8===n||n>=20?"ste":"de"},currency:{symbol:"\u20ac "}})}(),function(){i.register("locale","nl-nl",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mln",billion:"mrd",trillion:"bln"},ordinal:function(i){var n=i%100;return 0!==i&&n<=1||8===n||n>=20?"ste":"de"},currency:{symbol:"\u20ac "}})}(),function(){i.register("locale","no",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){return"."},currency:{symbol:"kr"}})}(),function(){i.register("locale","pl",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"tys.",million:"mln",billion:"mld",trillion:"bln"},ordinal:function(i){return"."},currency:{symbol:"PLN"}})}(),function(){i.register("locale","pt-br",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"mil",million:"milh\xf5es",billion:"b",trillion:"t"},ordinal:function(i){return"\xba"},currency:{symbol:"R$"}})}(),function(){i.register("locale","pt-pt",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(i){return"\xba"},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","ru-ua",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"\u0442\u044b\u0441.",million:"\u043c\u043b\u043d",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"\u20b4"}})}(),function(){i.register("locale","ru",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"\u0442\u044b\u0441.",million:"\u043c\u043b\u043d.",billion:"\u043c\u043b\u0440\u0434.",trillion:"\u0442\u0440\u043b\u043d."},ordinal:function(){return"."},currency:{symbol:"\u0440\u0443\u0431."}})}(),function(){i.register("locale","sk",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"tis.",million:"mil.",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","sl",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mio",billion:"mrd",trillion:"trilijon"},ordinal:function(){return"."},currency:{symbol:"\u20ac"}})}(),function(){i.register("locale","th",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"\u0e1e\u0e31\u0e19",million:"\u0e25\u0e49\u0e32\u0e19",billion:"\u0e1e\u0e31\u0e19\u0e25\u0e49\u0e32\u0e19",trillion:"\u0e25\u0e49\u0e32\u0e19\u0e25\u0e49\u0e32\u0e19"},ordinal:function(i){return"."},currency:{symbol:"\u0e3f"}})}(),function(){var n={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'\xfcnc\xfc",4:"'\xfcnc\xfc",100:"'\xfcnc\xfc",6:"'nc\u0131",9:"'uncu",10:"'uncu",30:"'uncu",60:"'\u0131nc\u0131",90:"'\u0131nc\u0131"};i.register("locale","tr",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"bin",million:"milyon",billion:"milyar",trillion:"trilyon"},ordinal:function(i){if(0===i)return"'\u0131nc\u0131";var l=i%10,o=i%100-l,r=i>=100?100:null;return n[l]||n[o]||n[r]},currency:{symbol:"\u20ba"}})}(),function(){i.register("locale","uk-ua",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"\u0442\u0438\u0441.",million:"\u043c\u043b\u043d",billion:"\u043c\u043b\u0440\u0434",trillion:"\u0431\u043b\u043d"},ordinal:function(){return""},currency:{symbol:"\u20b4"}})}(),function(){i.register("locale","vi",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:" ngh\xecn",million:" tri\u1ec7u",billion:" t\u1ef7",trillion:" ngh\xecn t\u1ef7"},ordinal:function(){return"."},currency:{symbol:"\u20ab"}})}()});