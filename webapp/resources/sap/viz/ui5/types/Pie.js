/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['sap/viz/library','sap/viz/ui5/core/BaseStructuredType'],function(l,B){"use strict";var P=B.extend("sap.viz.ui5.types.Pie",{metadata:{library:"sap.viz",properties:{colorPalette:{type:"string[]",defaultValue:['#748CB2','#9CC677','#EACF5E','#F9AD79','#D16A7C','#8873A2','#3A95B3','#B6D949','#FDD36C','#F47958','#A65084','#0063B1','#0DA841','#FCB71D','#F05620','#B22D6E','#3C368E','#8FB2CF','#95D4AB','#EAE98F','#F9BE92','#EC9A99','#BC98BD','#1EB7B2','#73C03C','#F48323','#EB271B','#D9B5CA','#AED1DA','#DFECB2','#FCDAB0','#F5BCB4']},isDonut:{type:"boolean",defaultValue:false},isGeoPie:{type:"boolean",defaultValue:false,deprecated:true},valign:{type:"sap.viz.ui5.types.Pie_valign",defaultValue:sap.viz.ui5.types.Pie_valign.top,deprecated:true},drawingEffect:{type:"sap.viz.ui5.types.Pie_drawingEffect",defaultValue:sap.viz.ui5.types.Pie_drawingEffect.normal},formatRules:{type:"object[]"},plotScale:{type:"float",defaultValue:1,deprecated:true}},aggregations:{animation:{type:"sap.viz.ui5.types.Pie_animation",multiple:false},toolTip:{type:"sap.viz.ui5.types.Pie_tooltip",multiple:false,deprecated:true}}}});return P;});
