(function(){tinymce.create("tinymce.plugins.AdvancedImagePlugin",{init:function(d,c){d.addCommand("mceAdvImage",function(){if(d.dom.getAttrib(d.selection.getNode(),"class","").indexOf("mceItem")!=-1){return
}d.windowManager.open({file:c+"/image.htm",width:480+parseInt(d.getLang("advimage.delta_width",0)),height:385+parseInt(d.getLang("advimage.delta_height",0)),inline:1},{plugin_url:c})
});
d.addButton("image",{title:"advimage.image_desc",cmd:"mceAdvImage"})
},getInfo:function(){return{longname:"Advanced image",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advimage",version:tinymce.majorVersion+"."+tinymce.minorVersion}
}});
tinymce.PluginManager.add("advimage",tinymce.plugins.AdvancedImagePlugin)
})();