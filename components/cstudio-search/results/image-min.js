CStudioSearch.ResultRenderer.Banner={render:function(g){var f="";
var e=g.item.uri;
f="<img src='"+CStudioAuthoringContext.baseUri+"/proxy/alfresco/cstudio/wcm/content/get-content?site="+CStudioAuthoringContext.site+"&path="+e+"&edit=false&createFolders=false' alt='"+g.item.internalName+"' class='cstudio-search-banner-image' onload='CStudioSearch.ResultRenderer.Banner.hideMagnifyIcon(this);'/> <img src='"+CStudioAuthoringContext.baseUri+"/themes/cstudioTheme/images/magnify.jpg' style='margin-left:-20px;'onclick ='CStudioSearch.magnifyBannerImage(\""+CStudioAuthoringContext.baseUri+"/proxy/alfresco/cstudio/wcm/content/get-content?site="+CStudioAuthoringContext.site+"&path="+e+"&edit=false&createFolders=false\");' />";
var b=g.item.uri;
var a=true;
var d="";
if(b!="null"){var c=(a=="null"||a=="false")?"_self":"_blank";
d="<div class='cstudio-search-description'><a href='"+CStudioAuthoringContext.previewAppBaseUri+b+"' target='"+c+"'>"+b+"</a></div>"
}return CStudioSearch.renderCommonResultWrapper(g,"<span class='cstudio-search-component-title-nopreview'>"+g.item.internalName+(g.item.newFile?"*":"")+"</span><span class='cstudio-search-download-additional' style='margin-left:0px;'> | Image</span><div class='cstudio-search-description'>"+d+"<div><span class='cstudio-search-download-additional'>Created: "+CStudioAuthoring.Utils.formatDateFromStringNullToEmpty(g.item.eventDate,"simpleformat")+"</span><br /><span class='cstudio-search-download-additional'>Edited "+CStudioAuthoring.Utils.formatDateFromString(g.item.eventDate,"simpleformat")+" by "+CStudioAuthoring.Utils.getAuthorFullNameFromContentTOItem(g.item)+"</span></div><div class='cstudio-search-description'>"+f+"</div>")
},_self:this,hideMagnifyIcon:function(b,c){if(b.height<=150){b.nextElementSibling.style.display="none";
if(c){b.previousSibling.previousSibling.style.display="none";
b.previousSibling.previousSibling.previousSibling.firstChild.height=b.height;
b.previousSibling.previousSibling.previousSibling.firstChild.width=b.width
}}else{var d=b.height;
var a=b.width;
b.height=150;
if(c){b.nextSibling.nextSibling.value=d+"|"+a;
b.previousSibling.previousSibling.previousSibling.firstChild.height=150;
b.previousSibling.previousSibling.previousSibling.firstChild.width=b.width
}}}};
CStudioSearch.resultRenderers.jpg=CStudioSearch.ResultRenderer.Banner;
CStudioSearch.resultRenderers.gif=CStudioSearch.ResultRenderer.Banner;
CStudioSearch.resultRenderers.png=CStudioSearch.ResultRenderer.Banner;
CStudioSearch.resultRenderers.ico=CStudioSearch.ResultRenderer.Banner;
CStudioSearch.resultRenderers.jpeg=CStudioSearch.ResultRenderer.Banner;