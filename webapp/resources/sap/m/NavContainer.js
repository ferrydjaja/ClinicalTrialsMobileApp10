/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/RenderManager','sap/ui/Device','./NavContainerRenderer','jquery.sap.events'],function(q,a,C,R,D,N){"use strict";var b=C.extend("sap.m.NavContainer",{metadata:{library:"sap.m",properties:{autoFocus:{type:"boolean",group:"Behavior",defaultValue:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},visible:{type:"boolean",group:"Appearance",defaultValue:true},defaultTransitionName:{type:"string",group:"Appearance",defaultValue:"slide"}},defaultAggregation:"pages",aggregations:{pages:{type:"sap.ui.core.Control",multiple:true,singularName:"page"}},associations:{initialPage:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}}}}});var u=sap.ui.getCore().getConfiguration().getAnimation(),g=function(d){return u?d:0;},h=function(c){return!!(c&&c.getParent());};b.prototype.init=function(){this._pageStack=[];this._aQueue=[];this._mVisitedPages={};this._mFocusObject={};this._iTransitionsCompleted=0;this._bNeverRendered=true;this._bNavigating=false;this._bRenderingInProgress=false;};b.prototype.exit=function(){this._mFocusObject=null;};b.prototype.onBeforeRendering=function(){var p=this.getCurrentPage();if(this._bNeverRendered&&p){var c=p.getId();if(!this._mVisitedPages[c]){this._mVisitedPages[c]=true;var n={from:null,fromId:null,to:p,toId:c,firstTime:true,isTo:false,isBack:false,isBackToPage:false,isBackToTop:false,direction:"initial"};var e=q.Event("BeforeFirstShow",n);e.srcControl=this;e.data=this._oToDataBeforeRendering||{};e.backData={};p._handleEvent(e);e=q.Event("BeforeShow",n);e.srcControl=this;e.data=this._oToDataBeforeRendering||{};e.backData={};p._handleEvent(e);}}};b.prototype.onAfterRendering=function(){var p=this.getCurrentPage(),f,n,c,e;if(this._bNeverRendered&&p){this._bNeverRendered=false;delete this._bNeverRendered;c=p.getId();if(!this._isInsideAPopup()&&this.getAutoFocus()){f=b._applyAutoFocusTo(c);if(f){this._mFocusObject[c]=f;}}n={from:null,fromId:null,to:p,toId:c,firstTime:true,isTo:false,isBack:false,isBackToTop:false,isBackToPage:false,direction:"initial"};e=q.Event("AfterShow",n);e.srcControl=this;e.data=this._oToDataBeforeRendering||{};e.backData={};p._handleEvent(e);}};b.prototype._getActualInitialPage=function(){var p=this.getInitialPage();if(p){var c=sap.ui.getCore().byId(p);if(c){return c;}else{q.sap.log.error("NavContainer: control with ID '"+p+"' was set as 'initialPage' but was not found as a DIRECT child of this NavContainer (number of current children: "+this.getPages().length+").");}}var d=this.getPages();return(d.length>0?d[0]:null);};b.prototype.getPage=function(p){var P=this.getPages();for(var i=0;i<P.length;i++){if(P[i]&&(P[i].getId()==p)){return P[i];}}return null;};b.prototype._ensurePageStackInitialized=function(d){if(this._pageStack.length===0){var p=this._getActualInitialPage();if(p){this._pageStack.push({id:p.getId(),isInitial:true,data:d||{}});}}return this._pageStack;};b.prototype.getCurrentPage=function(){var s=this._ensurePageStackInitialized();if(s.length>=1){return this.getPage(s[s.length-1].id);}else{q.sap.log.warning(this+": page stack is empty but should have been initialized - application failed to provide a page to display");return undefined;}};b.prototype.getPreviousPage=function(){var s=this._ensurePageStackInitialized();if(s.length>1){return this.getPage(s[s.length-2].id);}else if(s.length==1){return undefined;}else{q.sap.log.warning(this+": page stack is empty but should have been initialized - application failed to provide a page to display");}};b.prototype.currentPageIsTopPage=function(){var s=this._ensurePageStackInitialized();return(s.length===1);};b.prototype.insertPreviousPage=function(p,t,d){var s=this._ensurePageStackInitialized();if(this._pageStack.length>0){var i=s.length-1;var c={id:p,transition:t,data:d};if(i===0){c.isInitial=true;delete s[s.length-1].isInitial;}s.splice(i,0,c);}else{q.sap.log.warning(this+": insertPreviousPage called with empty page stack; ignoring");}return this;};b._applyAutoFocusTo=function(i){var f=q.sap.byId(i).firstFocusableDomRef();if(f){q.sap.focus(f);}return f;};b.prototype._applyAutoFocus=function(n){var p=n.toId,d,A=this.getAutoFocus(),c=n.isBack||n.isBackToPage||n.isBackToTop;if(!n.bFocusInsideFromPage){return;}if(c){d=this._mFocusObject!=null?this._mFocusObject[p]:null;if(d){q.sap.focus(d);}else if(A){b._applyAutoFocusTo(p);}}else if(n.isTo&&A){b._applyAutoFocusTo(p);}};b.prototype._afterTransitionCallback=function(n,d,B){var e=q.Event("AfterShow",n);e.data=d||{};e.backData=B||{};e.srcControl=this;n.to._handleEvent(e);e=q.Event("AfterHide",n);e.srcControl=this;n.from._handleEvent(e);this._iTransitionsCompleted++;this._bNavigating=false;this._applyAutoFocus(n);this.fireAfterNavigate(n);q.sap.log.info(this+": _afterTransitionCallback called, to: "+n.toId);if(n.to.hasStyleClass("sapMNavItemHidden")){q.sap.log.warning(this.toString()+": target page '"+n.toId+"' still has CSS class 'sapMNavItemHidden' after transition. This should not be the case, please check the preceding log statements.");n.to.removeStyleClass("sapMNavItemHidden");}this._dequeueNavigation();};b.prototype._dequeueNavigation=function(){var n=this._aQueue.shift();if(typeof n==="function"){n();}};b.prototype._isInPageStack=function(p){return this._pageStack.some(function(P){return P.id===p;});};b.prototype._safeBackToPage=function(p,t,d,T){var c;if(!this.getPage(p)){return this;}c=this.getCurrentPage();if(c&&c.getId()===p){return this;}if(this._isInPageStack(p)){return this.backToPage(p,d,T);}else{d=d||{};d.safeBackToPage=true;return this.to(p,t,d,T);}};b.prototype._isFocusInControl=function(c){return q(document.activeElement).closest(c.$()).length>0;};b.prototype.to=function(p,t,d,T,f){if(p instanceof C){p=p.getId();}if(typeof(t)!=="string"){T=d;d=t;}t=t||this.getDefaultTransitionName();T=T||{};d=d||{};var F={id:p,transition:t,data:d};this._ensurePageStackInitialized(d);if(this._bNavigating){q.sap.log.info(this.toString()+": Cannot navigate to page "+p+" because another navigation is already in progress. - navigation will be executed after the previous one");this._aQueue.push(q.proxy(function(){this.to(p,t,d,T,true);},this));return this;}if(this._bNeverRendered){this._oToDataBeforeRendering=d;}var o=this.getCurrentPage();if(o&&(o.getId()===p)){q.sap.log.warning(this.toString()+": Cannot navigate to page "+p+" because this is the current page.");if(f){this._dequeueNavigation();}if(this._pageStack.length===1){this._pageStack[0].transition=F.transition;}return this;}var c=this.getPage(p);if(c){if(!o){q.sap.log.warning("Navigation triggered to page with ID '"+p+"', but the current page is not known/aggregated by "+this);return this;}var n={from:o,fromId:o.getId(),to:c,toId:p,firstTime:!this._mVisitedPages[p],isTo:true,isBack:false,isBackToTop:false,isBackToPage:false,direction:"to",bFocusInsideFromPage:this._isFocusInControl(o)};if(n.bFocusInsideFromPage){this._mFocusObject[o.getId()]=document.activeElement;}var e=this.fireNavigate(n);if(e){a.closeKeyboard();var E=q.Event("BeforeHide",n);E.srcControl=this;o._handleEvent(E);if(!this._mVisitedPages[p]){E=q.Event("BeforeFirstShow",n);E.srcControl=this;E.data=d||{};E.backData={};c._handleEvent(E);}E=q.Event("BeforeShow",n);E.srcControl=this;E.data=d||{};E.backData={};c._handleEvent(E);this._pageStack.push(F);q.sap.log.info(this.toString()+": navigating to page '"+p+"': "+c.toString());this._mVisitedPages[p]=true;if(!this.getDomRef()){q.sap.log.info("'Hidden' 'to' navigation in not-rendered NavContainer "+this.toString());if(this._bRenderingInProgress){q.sap.delayedCall(0,this,this.invalidate);}return this;}var i;if(!(i=c.getDomRef())||i.parentNode!=this.getDomRef()||R.isPreservedContent(i)){c.addStyleClass("sapMNavItemRendering");q.sap.log.debug("Rendering 'to' page '"+c.toString()+"' for 'to' navigation");var r=sap.ui.getCore().createRenderManager();r.render(c,this.getDomRef());r.destroy();c.addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemRendering");}var j=b.transitions[t]||b.transitions["slide"];var k=this._iTransitionsCompleted;var l=this;window.setTimeout(function(){if(l&&(l._iTransitionsCompleted<k+1)){q.sap.log.warning("Transition '"+t+"' 'to' was triggered five seconds ago, but has not yet invoked the end-of-transition callback.");}},g(5000));this._bNavigating=true;var s=(d.safeBackToPage||T.safeBackToPage)?"back":"to";j[s].call(this,o,c,q.proxy(function(){this._afterTransitionCallback(n,d);},this),T);}else{q.sap.log.info("Navigation to page with ID '"+p+"' has been aborted by the application");}}else{q.sap.log.warning("Navigation triggered to page with ID '"+p+"', but this page is not known/aggregated by "+this);}return this;};b.prototype.back=function(c,t){this._backTo("back",c,t);return this;};b.prototype.backToPage=function(p,c,t){this._backTo("backToPage",c,t,p);return this;};b.prototype.backToTop=function(c,t){this._backTo("backToTop",c,t);return this;};b.prototype._backTo=function(t,c,T,r){if(this._bNavigating){q.sap.log.warning(this.toString()+": Cannot navigate back because another navigation is already in progress. - navigation will be executed after the previous one");this._aQueue.push(q.proxy(function(){this._backTo(t,c,T,r);},this));return this;}if(this._pageStack.length<=1){if(this._pageStack.length===1&&!this._pageStack[0].isInitial){throw new Error("Initial page not found on the stack. How did this happen?");}return this;}else{if(r instanceof C){r=r.getId();}var f=this._pageStack[this._pageStack.length-1];var d=f.transition;var F=this.getPage(f.id);var o;var e;if(t==="backToTop"){o=this._getActualInitialPage();e=null;}else if(t==="backToPage"){var i=this._findClosestPreviousPageInfo(r);if(!i){q.sap.log.error(this.toString()+": Cannot navigate backToPage('"+r+"') because target page was not found among the previous pages.");return this;}o=sap.ui.getCore().byId(i.id);if(!o){q.sap.log.error(this.toString()+": Cannot navigate backToPage('"+r+"') because target page does not exist anymore.");return this;}e=i.data;}else{o=this.getPreviousPage();e=this._pageStack[this._pageStack.length-2].data;}if(!o){q.sap.log.error("NavContainer back navigation: target page is not defined or not aggregated by this NavContainer. Aborting navigation.");return;}var j=o.getId();c=c||{};T=T||{};var n={from:F,fromId:F.getId(),to:o,toId:j,firstTime:!this._mVisitedPages[j],isTo:false,isBack:(t==="back"),isBackToPage:(t==="backToPage"),isBackToTop:(t==="backToTop"),direction:t,bFocusInsideFromPage:this._isFocusInControl(F)};var k=this.fireNavigate(n);if(k){a.closeKeyboard();var E=q.Event("BeforeHide",n);E.srcControl=this;F._handleEvent(E);if(!this._mVisitedPages[j]){E=q.Event("BeforeFirstShow",n);E.srcControl=this;E.backData=c||{};E.data={};o._handleEvent(E);}E=q.Event("BeforeShow",n);E.srcControl=this;E.backData=c||{};E.data=e||{};o._handleEvent(E);this._pageStack.pop();q.sap.log.info(this.toString()+": navigating back to page "+o.toString());this._mVisitedPages[j]=true;if(t==="backToTop"){this._pageStack=[];q.sap.log.info(this.toString()+": navigating back to top");this.getCurrentPage();}else if(t==="backToPage"){var p=[],l;while(this._pageStack[this._pageStack.length-1].id!==r){l=this._pageStack.pop();p.push(l.id);}q.sap.log.info(this.toString()+": navigating back to specific page "+o.toString()+" across the pages: "+p.join(", "));}if(!this.getDomRef()){q.sap.log.info("'Hidden' back navigation in not-rendered NavContainer "+this.toString());return this;}var m=b.transitions[d]||b.transitions["slide"];var s=this._iTransitionsCompleted;var v=this;window.setTimeout(function(){if(v&&(v._iTransitionsCompleted<s+1)){q.sap.log.warning("Transition '"+d+"' 'back' was triggered five seconds ago, but has not yet invoked the end-of-transition callback.");}},g(5000));this._bNavigating=true;var w;if(!(w=o.getDomRef())||w.parentNode!=this.getDomRef()||R.isPreservedContent(w)){o.addStyleClass("sapMNavItemRendering");q.sap.log.debug("Rendering 'to' page '"+o.toString()+"' for back navigation");var x=sap.ui.getCore().createRenderManager();var y=this.$().children().index(F.getDomRef());x.renderControl(o);x.flush(this.getDomRef(),false,y);x.destroy();o.addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemRendering");}if(F.getId()===o.getId()){q.sap.log.info("Transition is skipped when navigating back to the same page instance"+o.toString());this._afterTransitionCallback(n,e,c);return this;}m.back.call(this,F,o,q.proxy(function(){this._afterTransitionCallback(n,e,c);},this),T);}}return this;};b.prototype._findClosestPreviousPageInfo=function(r){for(var i=this._pageStack.length-2;i>=0;i--){var c=this._pageStack[i];if(c.id===r){return c;}}return null;};b.transitions=b.transitions||{};b.transitions["show"]={to:function(f,t,c){t.removeStyleClass("sapMNavItemHidden");f&&f.addStyleClass("sapMNavItemHidden");c();},back:function(f,t,c){t.removeStyleClass("sapMNavItemHidden");f&&f.addStyleClass("sapMNavItemHidden");c();}};b.transitions["slide"]={to:function(f,t,c){f.addStyleClass("sapMNavItemCenter");window.setTimeout(function(){t.addStyleClass("sapMNavItemRight");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitTransitionEnd transitionend");if(!o){o=true;}else{T=false;if(h(t)){t.removeStyleClass("sapMNavItemSliding").removeStyleClass("sapMNavItemCenter");}if(h(f)){f.removeStyleClass("sapMNavItemSliding").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemLeft");}c();}};f.$().bind("webkitTransitionEnd transitionend",A);t.$().bind("webkitTransitionEnd transitionend",A);t.addStyleClass("sapMNavItemSliding").addStyleClass("sapMNavItemCenter").removeStyleClass("sapMNavItemRight");f.addStyleClass("sapMNavItemSliding").removeStyleClass("sapMNavItemCenter").addStyleClass("sapMNavItemLeft");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()));}},g(400));},g(60));},0);},back:function(f,t,c){t.addStyleClass("sapMNavItemLeft");t.removeStyleClass("sapMNavItemHidden");f.addStyleClass("sapMNavItemCenter");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitTransitionEnd transitionend");if(!o){o=true;}else{T=false;if(h(t)){t.removeStyleClass("sapMNavItemSliding").removeStyleClass("sapMNavItemCenter");}if(h(f)){f.removeStyleClass("sapMNavItemSliding").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemRight");}c();}};f.$().bind("webkitTransitionEnd transitionend",A);t.$().bind("webkitTransitionEnd transitionend",A);if(D.browser.webkit){window.setTimeout(function(){t.$().css("box-shadow","0em 1px 0em rgba(128, 128, 1280, 0.1)");window.setTimeout(function(){t.$().css("box-shadow","");},g(50));},0);}t.addStyleClass("sapMNavItemSliding").addStyleClass("sapMNavItemCenter").removeStyleClass("sapMNavItemLeft");f.addStyleClass("sapMNavItemSliding").removeStyleClass("sapMNavItemCenter").addStyleClass("sapMNavItemRight");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()));}},g(400));},g(100));}};b.transitions["fade"]={to:function(f,t,c){t.addStyleClass("sapMNavItemTransparent");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var A=null;var T=true;A=function(){q(this).unbind("webkitTransitionEnd transitionend");T=false;if(h(f)){f.addStyleClass("sapMNavItemHidden");}if(h(t)){t.removeStyleClass("sapMNavItemFading").removeStyleClass("sapMNavItemOpaque");}c();};t.$().bind("webkitTransitionEnd transitionend",A);t.addStyleClass("sapMNavItemFading").removeStyleClass("sapMNavItemTransparent").addStyleClass("sapMNavItemOpaque");window.setTimeout(function(){if(T){A.apply(t.$());}},g(600));},g(10));},back:function(f,t,c){f.addStyleClass("sapMNavItemOpaque");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var A=null;var T=true;A=function(){q(this).unbind("webkitTransitionEnd transitionend");T=false;if(h(f)){f.removeStyleClass("sapMNavItemFading").addStyleClass("sapMNavItemHidden");f.removeStyleClass("sapMNavItemTransparent");}c();};f.$().bind("webkitTransitionEnd transitionend",A);f.addStyleClass("sapMNavItemFading").removeStyleClass("sapMNavItemOpaque");f.addStyleClass("sapMNavItemTransparent");window.setTimeout(function(){if(T){A.apply(t.$());}},g(600));},g(10));}};b.transitions["flip"]={to:function(f,t,c){var d=this;window.setTimeout(function(){d.$().addClass("sapMNavFlip");t.addStyleClass("sapMNavItemFlipNext");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitTransitionEnd transitionend");if(!o){o=true;}else{T=false;if(h(t)){t.removeStyleClass("sapMNavItemFlipping");}if(h(f)){f.removeStyleClass("sapMNavItemFlipping").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemFlipPrevious");}d.$().removeClass("sapMNavFlip");c();}};f.$().bind("webkitTransitionEnd transitionend",A);t.$().bind("webkitTransitionEnd transitionend",A);t.addStyleClass("sapMNavItemFlipping").removeStyleClass("sapMNavItemFlipNext");f.addStyleClass("sapMNavItemFlipping").addStyleClass("sapMNavItemFlipPrevious");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()));}},g(600));},g(60));},0);},back:function(f,t,c){var d=this;d.$().addClass("sapMNavFlip");t.addStyleClass("sapMNavItemFlipPrevious");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitTransitionEnd transitionend");if(!o){o=true;}else{T=false;if(h(t)){t.removeStyleClass("sapMNavItemFlipping");}if(h(f)){f.removeStyleClass("sapMNavItemFlipping").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemFlipNext");}d.$().removeClass("sapMNavFlip");c();}};f.$().bind("webkitTransitionEnd transitionend",A);t.$().bind("webkitTransitionEnd transitionend",A);t.addStyleClass("sapMNavItemFlipping").removeStyleClass("sapMNavItemFlipPrevious");f.addStyleClass("sapMNavItemFlipping").addStyleClass("sapMNavItemFlipNext");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()));}},g(600));},g(60));}};b.transitions["door"]={to:function(f,t,c){var d=this;window.setTimeout(function(){d.$().addClass("sapMNavDoor");t.addStyleClass("sapMNavItemDoorInNext");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitAnimationEnd animationend");if(!o){o=true;}else{T=false;if(h(t)){t.removeStyleClass("sapMNavItemDooring").removeStyleClass("sapMNavItemDoorInNext");}if(h(f)){f.removeStyleClass("sapMNavItemDooring").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemDoorInPrevious");}d.$().removeClass("sapMNavDoor");c();}};f.$().bind("webkitAnimationEnd animationend",A);t.$().bind("webkitAnimationEnd animationend",A);t.addStyleClass("sapMNavItemDooring");f.addStyleClass("sapMNavItemDooring").addStyleClass("sapMNavItemDoorInPrevious");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()));}},g(1000));},g(60));},0);},back:function(f,t,c){var d=this;d.$().addClass("sapMNavDoor");t.addStyleClass("sapMNavItemDoorOutNext");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitAnimationEnd animationend");if(!o){o=true;}else{T=false;if(h(t)){t.removeStyleClass("sapMNavItemDooring").removeStyleClass("sapMNavItemDoorOutNext");}if(h(f)){f.removeStyleClass("sapMNavItemDooring").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemDoorOutPrevious");}d.$().removeClass("sapMNavDoor");c();}};f.$().bind("webkitAnimationEnd animationend",A);t.$().bind("webkitAnimationEnd animationend",A);t.addStyleClass("sapMNavItemDooring");f.addStyleClass("sapMNavItemDooring").addStyleClass("sapMNavItemDoorOutPrevious");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()));}},g(1000));},g(60));}};b.prototype.addCustomTransition=function(n,t,B){if(b.transitions[n]){q.sap.log.warning("Transition with name "+n+" already exists in "+this+". It is now being replaced by custom transition.");}b.transitions[n]={to:t,back:B};return this;};b.addCustomTransition=b.prototype.addCustomTransition;b.prototype.forceInvalidation=b.prototype.invalidate;b.prototype.invalidate=function(s){if(s==this){}else if(!s){this.forceInvalidation();}else if(s instanceof C){var I=false,p=this.getPages(),l=p.length;for(var i=0;i<l;i++){if(p[i]===s){I=true;break;}}if((!I||s===this.getCurrentPage())&&!this._isInsideAPopup()){this.forceInvalidation();}}else{this.forceInvalidation();}};b.prototype._isInsideAPopup=function(){var s;s=function(c){if(!c){return false;}if(c.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){return true;}return s(c.getParent());};return s(this);};b.prototype.removePage=function(p){p=this.removeAggregation("pages",p,p!==this.getCurrentPage());this._onPageRemoved(p);return p;};b.prototype._onPageRemoved=function(p){if(!p){return;}p.$().remove();p.removeStyleClass("sapMNavItemHidden");p.removeStyleClass("sapMNavItem");var s=this._ensurePageStackInitialized();this._pageStack=s.filter(function(P){return p.getId()!==P.id;});};b.prototype.removeAllPages=function(){var p=this.getPages();if(!p){return[];}for(var i=0;i<p.length;i++){this._onPageRemoved(p[i]);}return this.removeAllAggregation("pages");};b.prototype.addPage=function(p){var P=this.getPages();if(q.inArray(p,P)>-1){return this;}this.addAggregation("pages",p,true);p.addStyleClass("sapMNavItem");var i=P.length;if(i===0&&this.getPages().length===1&&this.getDomRef()){this._ensurePageStackInitialized();this.rerender();this._fireAdaptableContentChange(p);}return this;};b.prototype.insertPage=function(p,i){var P=this.getPages().length;this.insertAggregation("pages",p,i,true);p.addStyleClass("sapMNavItem");if(P===0&&this.getPages().length===1&&this.getDomRef()){this._ensurePageStackInitialized();this.rerender();this._fireAdaptableContentChange(p);}return this;};b.prototype._getAdaptableContent=function(){return this.getCurrentPage();};b.prototype._fireAdaptableContentChange=function(p){if(p&&this.mEventRegistry["_adaptableContentChange"]){this.fireEvent("_adaptableContentChange",{"parent":this,"adaptableContent":p});}};return b;});
