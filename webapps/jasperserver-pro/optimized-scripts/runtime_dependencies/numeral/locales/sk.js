!function(e,i){"function"==typeof define&&define.amd?define(["../numeral"],i):i("object"==typeof module&&module.exports?require("../numeral"):e.numeral)}(this,function(e){e.register("locale","sk",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"tis.",million:"mil.",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"\u20ac"}})});