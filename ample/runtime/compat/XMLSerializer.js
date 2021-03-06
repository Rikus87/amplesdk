/*
 * Ample SDK - JavaScript GUI Framework
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 * See: http://www.amplesdk.com/about/licensing/
 *
 */

if (!cXMLSerializer) {
	cXMLSerializer	= function(){
		if (!(this instanceof cXMLSerializer))
			throw new cAmpleException(cAmpleException.OBJECT_CONSTRUCTOR_ERR
//->Debug
					, cXMLSerializer.caller
					, ["XMLSerializer"]
//<-Debug
			);
	};
	cXMLSerializer.prototype.serializeToString	= function(oNode) {
//->Guard
		fGuard(arguments, [
			["node",	cXMLNode]
		]);
//<-Guard

		return oNode.xml;
	};

	// Export
	fExporter_export(cXMLSerializer,	"XMLSerializer",	window);
}
