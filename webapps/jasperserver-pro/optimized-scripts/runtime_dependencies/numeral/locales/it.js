!function(e,i){"function"==typeof define&&define.amd?define(["../numeral"],i):i("object"==typeof module&&module.exports?require("../numeral"):e.numeral)}(this,function(e){e.register("locale","it",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"mila",million:"mil",billion:"b",trillion:"t"},ordinal:function(e){return"\xba"},currency:{symbol:"\u20ac"}})});