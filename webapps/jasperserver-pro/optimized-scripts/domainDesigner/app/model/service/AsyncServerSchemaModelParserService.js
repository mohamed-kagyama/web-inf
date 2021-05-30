/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","../enum/serverSchemaModelParserErrorEnum"],function(e,r,o){var s=e("jquery"),n=e("underscore"),a=e("../enum/serverSchemaModelParserErrorEnum"),t=function(e){this.serverSchemaModelParser=e.serverSchemaModelParser};n.extend(t.prototype,{parse:function(e){var r,o=new s.Deferred;try{r=this.serverSchemaModelParser.parse(e),o.resolve(r)}catch(e){o.reject({responseJSON:{errorCode:a.PARSER_ERROR,parameters:[e.toString()]}})}return o}}),o.exports=t});