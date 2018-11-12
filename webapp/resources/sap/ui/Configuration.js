/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/bootstrap/Info","sap/base/util/extend","sap/base/Log"],function(_,a,L){"use strict";function n(o){for(var i in o){var v=o[i];var d=i.toLowerCase();if(!o.hasOwnProperty(d)){o[d]=v;delete o[i];}}return o;}function l(u){var d="sap-ui-config.json",f;L.warning("Loading external bootstrap configuration from \""+u+"\". This is a design time feature and not for productive usage!");if(u!==d){L.warning("The external bootstrap configuration file should be named \""+d+"\"!");}var x=new XMLHttpRequest();x.addEventListener('load',function(e){if(x.status===200&&x.responseText){try{f=JSON.parse(x.responseText);}catch(g){L.error("Parsing externalized bootstrap configuration from \""+u+"\" failed! Reason: "+g+"!");}}else{L.error("Loading externalized bootstrap configuration from \""+u+"\" failed! Response: "+x.status+"!");}});x.open('GET',u,false);try{x.send();}catch(g){L.error("Loading externalized bootstrap configuration from \""+u+"\" failed! Reason: "+g+"!");}f=f||{};f.__loaded=true;return f;}var s=_.tag,c=window["sap-ui-config"];if(typeof c==="string"){c=l(c);}c=n(c||{});c.resourceroots=c.resourceroots||{};c.themeroots=c.themeroots||{};c.resourceroots['']=c.resourceroots['']||_.resourceRoot;if(/(^|\/)(sap-?ui5|[^\/]+-all).js([?#]|$)/.test(_.url)){L.error("The all-in-one file 'sap-ui-core-all.js' has been abandoned in favour of standard preloads."+" Please migrate to sap-ui-core.js and consider to use async preloads.");c.preload='sync';}if(s){var C=s.getAttribute("data-sap-ui-config");if(C){try{var p;try{p=JSON.parse("{"+C+"}");}catch(e){L.error("JSON.parse on the data-sap-ui-config attribute failed. Please check the config for JSON syntax violations.");p=(new Function("return {"+C+"};"))();}a(c,n(p));}catch(e){L.error("failed to parse data-sap-ui-config attribute: "+(e.message||e));}}for(var i=0;i<s.attributes.length;i++){var b=s.attributes[i];var m=b.name.match(/^data-sap-ui-(.*)$/);if(m){m=m[1].toLowerCase();if(m==='resourceroots'){a(c[m],JSON.parse(b.value));}else if(m==='theme-roots'){a(c.themeroots,JSON.parse(b.value));}else if(m!=='config'){c[m]=b.value;}}}}return c;});