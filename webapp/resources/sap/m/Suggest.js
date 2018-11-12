/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./Button','./SuggestionsList','./SuggestionItem','sap/ui/Device','sap/m/library'],function(q,B,a,S,b,D,l){"use strict";var P=l.PlacementType;function c(i){var p=i,d,e,f,u=D.system.phone,s=this;q.sap.require(u?"sap.m.Dialog":"sap.m.Popover");function o(E){var m=E.srcControl;var v;if(m instanceof b){v=m.getSuggestionText();d.close();window.setTimeout(function(){i.setValue(v);i.fireSearch({query:v,suggestionItem:m,refreshButtonPressed:false,clearButtonPressed:false});},0);}}function g(){var m,n,r,t,v;r=new(sap.ui.require('sap/m/SearchField'))({liveChange:function(E){var w=E.getParameter("newValue");i.setValue(w);i.fireLiveChange({newValue:w});i.fireSuggest({suggestValue:w});s.update();},search:function(E){if(!E.getParameter("clearButtonPressed")){m.close();}}});t=new B({contentLeft:r});v=new a({text:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("MSGBOX_CANCEL"),press:function(){m._oCloseTrigger=true;m.close();}});m=new(sap.ui.require('sap/m/Dialog'))({stretch:true,customHeader:t,content:j(),beginButton:v,beforeOpen:function(){n=i.getValue();r.setValue(n);},beforeClose:function(E){if(E.getParameter("origin")){i.setValue(n);}else{i.setValue(r.getValue());}},afterClose:function(E){if(!E.getParameter("origin")){i.fireSearch({query:i.getValue(),refreshButtonPressed:false,clearButtonPressed:false});}}});m.addEventDelegate({ontap:o},i);return m;}function h(){var m=s._oPopover=new(sap.ui.require('sap/m/Popover'))({showArrow:false,showHeader:false,horizontalScrolling:false,placement:P.Vertical,offsetX:0,offsetY:0,initialFocus:p,bounce:false,afterOpen:function(){i.$("I").attr("aria-autocomplete","list").attr("aria-haspopup","true");},beforeClose:function(){i.$("I").attr("aria-haspopup","false").removeAttr("aria-activedecendant");},content:j()}).addStyleClass("sapMSltPicker").addStyleClass("sapMSltPicker-CTX");m.open=function(){return this.openBy(p);};m.addEventDelegate({onAfterRendering:s.setPopoverMinWidth.bind(s),ontap:o},i);return m;}function j(){if(!e){e=new S({parentInput:p});}return e;}function k(){if(d===undefined){d=u?g():h();}return d;}this.setPopoverMinWidth=function(){if(s._oPopover.isOpen()){var w=(i.$().outerWidth()/parseFloat(l.BaseFontSize))+"rem";s._oPopover.getDomRef().style.minWidth=w;}};this.destroy=function(){if(d){d.close();d.destroy();d=null;}if(e){e.destroy();e=null;}};this.close=function(){if(!u&&this.isOpen()){d.close();}};this.open=function(){if(!this.isOpen()){this.setSelected(-1);k().open();}};this.update=function(){var e=j();window.clearTimeout(f);if(this.isOpen()){f=window.setTimeout(e.update.bind(e),50);}};this.isOpen=function(){return!!d&&d.isOpen();};this.getSelected=function(){return j().getSelectedItemIndex();};this.setSelected=function(m,r){return j().selectByIndex(m,r);};}return c;},true);
