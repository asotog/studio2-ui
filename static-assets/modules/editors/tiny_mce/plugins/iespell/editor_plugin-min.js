(function(){tinymce.create("tinymce.plugins.IESpell",{init:function(f,e){var h=this,g;
if(!tinymce.isIE){return
}h.editor=f;
f.addCommand("mceIESpell",function(){try{g=new ActiveXObject("ieSpell.ieSpellExtension");
g.CheckDocumentNode(f.getDoc().documentElement)
}catch(a){if(a.number==-2146827859){f.windowManager.confirm(f.getLang("iespell.download"),function(b){if(b){window.open("http://www.iespell.com/download.php","ieSpellDownload","")
}})
}else{f.windowManager.alert("Error Loading ieSpell: Exception "+a.number)
}}});
f.addButton("iespell",{title:"iespell.iespell_desc",cmd:"mceIESpell"})
},getInfo:function(){return{longname:"IESpell (IE Only)",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/iespell",version:tinymce.majorVersion+"."+tinymce.minorVersion}
}});
tinymce.PluginManager.add("iespell",tinymce.plugins.IESpell)
})();