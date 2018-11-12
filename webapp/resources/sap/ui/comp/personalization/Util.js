/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/comp/library','sap/m/library'],function(C,M){"use strict";var U={getColumnKeysOfType:function(t,c){var a=[];for(var s in c){if(this.getColumnType(c[s])===t){a.push(s);}}return a;},getColumnKeys:function(c){if(!c||!c.length){return[];}return c.map(function(o){return this.getColumnKey(o);},this);},sortItemsByText:function(i,k){var l;try{var l=sap.ui.getCore().getConfiguration().getLocale().toString();if(typeof window.Intl!=='undefined'){var c=window.Intl.Collator(l,{numeric:true});i.sort(function(a,b){return c.compare(a[k],b[k]);});}else{i.sort(function(a,b){return a[k].localeCompare(b[k],l,{numeric:true});});}}catch(e){}},recoverPersonalisationDateData:function(p,c){if(c.length&&p&&p.filter){p.filter.filterItems.forEach(function(f){if(c.indexOf(f.columnKey)>-1){if(f.value1&&typeof(f.value1)==="string"){f.value1=new Date(f.value1);}if(f.value2&&typeof(f.value2)==="string"){f.value2=new Date(f.value2);}}});}},recoverPersonalisationTimeData:function(p,c){if(c.length&&p&&p.filter){p.filter.filterItems.forEach(function(f){if(c.indexOf(f.columnKey)>-1){if(f.value1&&typeof(f.value1)==="string"){f.value1=new Date(f.value1);}if(f.value2&&typeof(f.value2)==="string"){f.value2=new Date(f.value2);}}});}},recoverPersonalisationBooleanData:function(p,c){if(c.length&&p&&p.filter){p.filter.filterItems.forEach(function(f){if(c.indexOf(f.columnKey)>-1){if(f.value1&&typeof(f.value1)==="string"){f.value1=f.value1==="true";}if(f.value2&&typeof(f.value2)==="string"){f.value2=f.value2==="true";}}});}},getUnionOfAttribute:function(s,a){var u=[];var A=function(c){if(u.indexOf(c)<0){u.push(c);}};for(var n in s){var N=s[n];if(!N[a]){continue;}N[a].forEach(A);}return u;},getUnionOfColumnKeys:function(j){var u=[];var c=function(I){u=u.concat(I.map(function(o){return o.columnKey;}));u=u.filter(function(s,a){return u.indexOf(s)===a;});};for(var t in j){for(var i in j[t]){if(!jQuery.isArray(j[t][i])){continue;}c(j[t][i]);}}return u;},copy:function(o){if(o instanceof Array){return jQuery.extend(true,[],o);}return jQuery.extend(true,{},o);},sort:function(k,A){var r=this.copy(A);r.sort(function(a,b){var t=a[k].toLocaleLowerCase();var T=b[k].toLocaleLowerCase();if(t<T){return-1;}if(t>T){return 1;}return 0;});return r;},removeEmptyProperty:function(j){for(var t in j){if(j[t]===null||j[t]===undefined){delete j[t];}}return j;},enrichEmptyProperty:function(o,O){o=o||{};for(var t in O){if(o[t]===null||o[t]===undefined){o[t]=O[t];}}return o;},semanticEqual:function(i,I){if(!i||!I){return false;}for(var p in i){if(i[p]!==I[p]){return false;}}return true;},hasChangedType:function(c){for(var t in c){if(c[t]===sap.ui.comp.personalization.ChangeType.ModelChanged||c[t]===sap.ui.comp.personalization.ChangeType.TableChanged){return true;}}return false;},isNamespaceChanged:function(c,n){if(c[n]){return c[n]===sap.ui.comp.personalization.ChangeType.ModelChanged||c[n]===sap.ui.comp.personalization.ChangeType.TableChanged;}return false;},createArrayFromString:function(e){if(!e){return[];}var E=[];var r=e.split(",");r.forEach(function(f){if(f!==""){E.push(f.trim());}});return E;},getIndexByKey:function(k,K,a){if(!a||!a.length){return-1;}var I=-1;a.some(function(e,i){if(e[k]!==undefined&&e[k]===K){I=i;return true;}});return I;},getColumnKey:function(c){return this._getCustomProperty(c,"columnKey")||c.getId();},getColumnType:function(c){return this._getCustomProperty(c,"type");},hasSortableColumns:function(c){for(var s in c){if(U.isSortable(c[s])){return true;}}return false;},hasGroupableColumns:function(c){for(var s in c){if(U.isGroupable(c[s])){return true;}}return false;},hasFilterableColumns:function(c){for(var s in c){if(U.isFilterable(c[s])){return true;}}return false;},hasAggregatableColumns:function(c){for(var s in c){if(U.isAggregatable(c[s])){return true;}}return false;},isGroupable:function(c){if(sap.ui.table&&sap.ui.table.AnalyticalColumn&&c instanceof sap.ui.table.AnalyticalColumn){return c.isGroupable()||this._getCustomProperty(c,"isGroupable");}if(c instanceof sap.m.Column){return this.isSortable(c);}return false;},isSortable:function(c){if(c.getSortProperty){return!!c.getSortProperty();}return!!this._getCustomProperty(c,"sortProperty");},isFilterable:function(c){if(c.getFilterProperty){return!!c.getFilterProperty();}return!!this._getCustomProperty(c,"filterProperty");},isAggregatable:function(c){if(c.getAggregationRole){return c.getAggregationRole()===sap.ui.comp.personalization.AggregationRole.Dimension||c.getAggregationRole()===sap.ui.comp.personalization.AggregationRole.Measure;}return false;},getArrayElementByKey:function(k,K,a){if(!a||!a.length){return null;}var e=null;a.some(function(E){if(E[k]!==undefined&&E[k]===K){e=E;return true;}});return e;},isColumnIgnored:function(c,i){if(!i){return false;}return i.indexOf(this.getColumnKey(c))>-1;},createSort2Json:function(t,d,i){if(this.getTableBaseType(t)!==sap.ui.comp.personalization.TableType.Table&&this.getTableType(t)!==sap.ui.comp.personalization.TableType.ChartWrapper){return;}this.addSortPersistentData(this._mapTable2P13nSortJson(t),{sort:{sortItems:d}},i);},addSortPersistentData:function(s,d,i){s.sort.sortItems.forEach(function(S){if(!S.isSorted||i.indexOf(S.columnKey)>-1){return;}d.sort.sortItems.push({columnKey:S.columnKey,operation:S.operation});});},_mapTable2P13nSortJson:function(t){return{sort:{sortItems:t.getColumns().map(function(c){return{columnKey:U.getColumnKey(c),isSorted:c.getSorted(),operation:c.getSortOrder()};})}};},getTableType:function(t){switch(t&&t.getMetadata().getName()){case"sap.ui.comp.personalization.ChartWrapper":return sap.ui.comp.personalization.TableType.ChartWrapper;case"sap.ui.comp.personalization.SelectionWrapper":return sap.ui.comp.personalization.TableType.SelectionWrapper;case"sap.m.Table":return sap.ui.comp.personalization.TableType.ResponsiveTable;case"sap.ui.table.AnalyticalTable":return sap.ui.comp.personalization.TableType.AnalyticalTable;case"sap.ui.table.TreeTable":return sap.ui.comp.personalization.TableType.TreeTable;case"sap.ui.table.Table":return sap.ui.comp.personalization.TableType.Table;}return null;},getTableBaseType:function(t){switch(this.getTableType(t)){case sap.ui.comp.personalization.TableType.ChartWrapper:return sap.ui.comp.personalization.TableType.ChartWrapper;case sap.ui.comp.personalization.TableType.SelectionWrapper:return sap.ui.comp.personalization.TableType.SelectionWrapper;case sap.ui.comp.personalization.TableType.ResponsiveTable:return sap.ui.comp.personalization.TableType.ResponsiveTable;case sap.ui.comp.personalization.TableType.AnalyticalTable:case sap.ui.comp.personalization.TableType.Table:case sap.ui.comp.personalization.TableType.TreeTable:return sap.ui.comp.personalization.TableType.Table;}return null;},getColumnBaseType:function(c){switch(c&&c.getMetadata().getName()){case"sap.ui.comp.personalization.ColumnWrapper":return sap.ui.comp.personalization.ColumnType.ColumnWrapper;case"sap.m.Column":return sap.ui.comp.personalization.ColumnType.ResponsiveColumn;case"sap.ui.table.AnalyticalColumn":case"sap.ui.table.Column":return sap.ui.comp.personalization.ColumnType.TableColumn;}return null;},_getCustomProperty:function(c,p){var o=this._getCustomData(c);if(!o||!p){return null;}return o[p];},_getCustomData:function(c){if(!c){return null;}var o=c.data("p13nData");if(typeof o==="string"){try{o=JSON.parse(o);c.data("p13nData",o);}catch(e){}}return o;}};return U;},true);
