/*
 * Ample SDK - JavaScript GUI Framework
 *
 * Copyright (c) 2009 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 * See: http://www.amplesdk.com/about/licensing/
 *
 */

var cSVGElement_polygon	= function(){};
cSVGElement_polygon.prototype	= new cSVGElement;

if (cSVGElement.useVML) {
	// Implementation for IE

	// handlers
	cSVGElement_polygon.handlers	= {
		'DOMAttrModified':	function(oEvent) {
			if (oEvent.target == this) {
				var oElement	= this.$getContainer();
				switch (oEvent.attrName) {
					case "points":
						oElement.path	= cSVGElement_polygon.toPath(this);
						break;
					//
					case "transform":
						cSVGElement.setTransform(this, oEvent.newValue);
						break;
					//
					default:
						cSVGElement.setStyle(this, oEvent.attrName, oEvent.newValue);
				}
			}
		},
		'DOMNodeInsertedIntoDocument':	function(oEvent) {
			var sValue;

			// Apply gradients
			if ((sValue = cSVGElement.getStyle(this, "fill")) && sValue.substr(0, 3) == "url")
				cSVGElement.setStyle(this, "fill", sValue);

			// Apply transformations
			if (sValue = this.getAttribute("transform"))
				cSVGElement.setTransform(this, sValue);

			// Apply CSS
			cSVGElement.applyCSS(this);
		}
	};

	cSVGElement_polygon.toPath	= function(oElement) {
		var aPoints = this.getAttribute("points").split(/[ ,]/);
		return "m " + aPoints.slice(0, 2).map(Math.round)+ " l " + aPoints.slice(2).map(Math.round) + " x";
	};

	// presentation
	cSVGElement_polygon.prototype.$getTagOpen	= function() {
		return '<svg2vml:shape class="svg-polygon' + (this.hasAttribute("class") ? ' ' + this.getAttribute("class") : '')+ '"\
						style="position:absolute;top:0;left:0;height:100%;width:100%;"\
						path="' + cSVGElement_polygon.toPath(this) + '"\
				>' + cSVGElement.getTagStyle(this);
	};

	cSVGElement_polygon.prototype.$getTagClose	= function() {
		return '</svg2vml:shape>';
	};
};

// Register Element with language
oSVGNamespace.setElement("polygon", cSVGElement_polygon);
