var AdvHRDialog={init:function(e){var d=e.dom,f=document.forms[0],n=e.selection.getNode(),w;w=d.getAttrib(n,'width');f.width.value=w?parseInt(w):(d.getStyle('width')||'');f.size.value=d.getAttrib(n,'size')||parseInt(d.getStyle('height'))||'';f.noshade.checked=!!d.getAttrib(n,'noshade')||!!d.getStyle('border-width');selectByValue(f,'width2',w.indexOf('%')!=-1?'%':'px');},update:function(){var e=tinyMCEPopup.editor,h,f=document.forms[0],s='';h='<hr';if(f.size.value){h+=' size="'+f.size.value+'"';s+=' height:'+f.size.value+'px;';}if(f.width.value){h+=' width="'+f.width.value+(f.width2.value=='%'?'%':'')+'"';s+=' width:'+f.width.value+(f.width2.value=='%'?'%':'px')+';';}if(f.noshade.checked){h+=' noshade="noshade"';s+=' border-width: 1px; border-style: solid; border-color: #CCCCCC; color: #ffffff;';}if(e.settings.inline_styles)h+=' style="'+tinymce.trim(s)+'"';h+=' />';e.execCommand("mceInsertContent",false,h);tinyMCEPopup.close();}};tinyMCEPopup.requireLangPack();tinyMCEPopup.onInit.add(AdvHRDialog.init,AdvHRDialog);
