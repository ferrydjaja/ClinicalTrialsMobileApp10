define('tinymce/inlite/alien/Bookmark',[],function(){var c=function(d,a){var b={};function s(e){var o,f,g;f=a[e?'startContainer':'endContainer'];g=a[e?'startOffset':'endOffset'];if(f.nodeType==1){o=d.create('span',{'data-mce-type':'bookmark'});if(f.hasChildNodes()){g=Math.min(g,f.childNodes.length-1);if(e){f.insertBefore(o,f.childNodes[g]);}else{d.insertAfter(o,f.childNodes[g]);}}else{f.appendChild(o);}f=o;g=0;}b[e?'startContainer':'endContainer']=f;b[e?'startOffset':'endOffset']=g;}s(true);if(!a.collapsed){s();}return b;};var r=function(d,b){function a(s){var f,o,n;function g(f){var n=f.parentNode.firstChild,i=0;while(n){if(n==f){return i;}if(n.nodeType!=1||n.getAttribute('data-mce-type')!='bookmark'){i++;}n=n.nextSibling;}return-1;}f=n=b[s?'startContainer':'endContainer'];o=b[s?'startOffset':'endOffset'];if(!f){return;}if(f.nodeType==1){o=g(f);f=f.parentNode;d.remove(n);}b[s?'startContainer':'endContainer']=f;b[s?'startOffset':'endOffset']=o;}a(true);a();var e=d.createRng();e.setStart(b.startContainer,b.startOffset);if(b.endContainer){e.setEnd(b.endContainer,b.endOffset);}return e;};return{create:c,resolve:r};});
