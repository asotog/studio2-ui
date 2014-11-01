define(["dojo/_base/declare","alfresco/core/WrappedShareWidget","dijit/_TemplatedMixin","dojo/text!./templates/DocumentList.html","alfresco/wrapped/DocumentListToolbar","dojo/_base/lang","dojo/dom","dojo/dom-construct","dojo/dom-style"],function(s,g,o,w,k,x,p,j,n){return s([g,o],{cssRequirements:[{cssFile:"/components/documentlibrary/actions.css"},{cssFile:"/components/documentlibrary/documentlist.css"},{cssFile:"/mediamanagement/components/documentlibrary/documentlist-spreadsheet.css"},{cssFile:"/mediamanagement/components/documentlibrary/documentlist-focus.css"},{cssFile:"/components/preview/web-preview.css"},{cssFile:"/components/preview/WebPreviewerHTML.css"},{cssFile:"/components/preview/Audio.css"},{cssFile:"/components/preview/Image.css"},{cssFile:"./css/DocumentList.css"}],i18nScope:"Alfresco.DocumentList",i18nRequirements:[{i18nFile:"/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/documentlibrary/documentlist.get.properties"}],templateString:w,nonAmdDependencies:["/components/form/form.js","/components/form/date.js","/components/form/date-picker.js","/components/form/period.js","/components/object-finder/object-finder.js","/yui/calendar/calendar.js","/modules/editors/tiny_mce/tiny_mce.js","/modules/editors/tiny_mce.js","/components/form/rich-text.js","/components/form/content.js","/components/form/workflow/transitions.js","/components/form/workflow/activiti-transitions.js","/components/form/jmx/operations.js","/modules/documentlibrary/doclib-actions.js","/modules/simple-dialog.js","/mediamanagement/components/documentlibrary/yui/carousel/carousel-min.js","/components/preview/web-preview.js","/components/preview/WebPreviewer.js","/js/flash/extMouseWheel.js","/components/preview/StrobeMediaPlayback.js","/components/preview/Video.js","/components/preview/Audio.js","/components/preview/Flash.js","/components/preview/Image.js","/components/documentlibrary/actions.js","/components/documentlibrary/documentlist-view-detailed.js","/components/documentlibrary/documentlist-view-gallery.js","/components/documentlibrary/documentlist-view-simple.js","/mediamanagement/components/documentlibrary/documentlist-spreadsheet.js","/mediamanagement/components/documentlibrary/documentlist-focus.js","/components/documentlibrary/documentlist.js","/yui/slider/slider.js"],templateMessages:null,_isIntialised:false,rootNode:"alfresco://company/home",userCanUpload:false,containerId:null,highlightFile:"",siteId:null,replicationUrlMapping:"{}",repositoryBrowsing:false,syncMode:null,usePagination:false,useTitle:true,userIsSiteManager:false,viewRendererName:"simple",viewRendererNames:null,constructor:function q(y){s.safeMixin(this,y);this.templateMessages={no_items_title:this.message("no.items.title"),dnd_drop_title:this.message("dnd.drop.title"),dnd_drop_doclist_description:this.message("dnd.drop.doclist.description"),dnd_drop_folder_description:this.message("dnd.drop.folder.description"),standard_upload_title:this.message("standard.upload.title"),panel_header_spreadsheetConfig:this.message("panel.header.spreadsheetConfig"),button_spreadsheet_config:this.message("button.spreadsheet.config")}},_documentList:null,_currentFilter:null,postCreate:function m(){this._toolbar=new k({siteId:this.siteId,rootNode:this.rootNode,hideNavBar:this.hideNavBar,googleDocsEnabled:this.googleDocsEnabled,repositoryBrowsing:this.repositoryBrowsing,useTitle:this.useTitle,syncMode:this.syncMode,createContentByTemplateEnabled:this.createContentByTemplateEnabled,createContentActions:this.createContentActions});this._toolbar.toolbar.onReady();YAHOO.Bubbling.on("doclistMetadata",this.onMetadataChange,this);YAHOO.Bubbling.on("selectedFilesChanged",this.onSelectedFilesChanged,this);YAHOO.Bubbling.on("filterChanged",this.onFilterChanged,this);YAHOO.Bubbling.on("userAccess",this.onUserAccess,this);this.alfSubscribe("ALF_DOCLIST_FILE_SELECTION",x.hitch(this,"onFileSelection"));this.alfSubscribe("ALF_DOCLIST_SHOW_FOLDERS",x.hitch(this,"onShowFolders"));this.alfSubscribe("ALF_DOCLIST_SELECT_VIEW",x.hitch(this,"onViewSelect"));this.alfSubscribe("ALF_DOCLIST_SORT",x.hitch(this,"onSortRequest"));this.alfSubscribe("ALF_DOCLIST_SORT_FIELD_SELECTION",x.hitch(this,"onSortFieldSelection"));this.alfSubscribe("ALF_DOCLIST_FILTER_CHANGED",x.hitch(this,"onWrappedFilterChanged"));this.alfSubscribe("ALF_NODE_CREATED",x.hitch(this,"onNodeCreated"));this.alfSubscribe("ALF_NODE_RESIZED",x.hitch(this,"onResizeEvent"));this._documentlist=new Alfresco.DocumentList(this.id).setOptions({_userCanUpload:this.userCanUpload,containerId:this.containerId,highlightFile:this.hightlightFile,replicationUrlMapping:this.replicationUrlMapping,repositoryBrowsing:this.repositoryBrowsing,rootNode:this.rootNode,simpleView:"null",showFolders:this.showFolders,siteId:this.siteId,sortAscending:this.sortAscending,sortField:this.sortField,syncMode:this.syncMode,usePagination:this.usePagination,userIsSiteManager:this.userIsSiteManager,useTitle:this.useTitle,viewRendererName:this.viewRendererName,viewRendererNames:this.viewRendererNames});Dom.setStyle(this.id+"-body","visibility","visible");this.loadCustomActionHandlers()},loadCustomActionHandlers:function r(y){var z=this;if(this.customAggregatedJsResource){require([Alfresco.constants.URL_RESCONTEXT+this.customAggregatedJsResource],function(){z.customActionHandlersLoaded()})}},customActionHandlersLoaded:function(){this.alfLog("log","Custom action handlers loaded")},onFileSelection:function a(y){this.alfLog("log","File selected: ",y);if(y&&y.value!=null){this._documentlist.selectFiles(y.value)}},onShowFolders:function b(y){this.alfLog("log","Show Folders Request: ",y);if(y&&y.selected!=null){this._documentlist.onShowFoldersEvent(y.selected)}},onViewSelect:function i(y){this.alfLog("log","View Selected: ",y);if(y&&y.value){this._documentlist.onViewRendererSelectEvent(y.value)}},onSortRequest:function h(y){this.alfLog("log","Sort requested: ",y);if(y&&y.direction){this._documentlist.onSortEvent(y.direction)}},onSortFieldSelection:function u(y){this.alfLog("log","Sort field selected: ",y);if(y&&y.value){this._documentlist.onSortFieldEvent(y.value,y.direction)}},onWrappedFilterChanged:function d(y){this.alfLog("log","Filter change detected",y);if(this._currentFilter==null||(y&&this._currentFilter!=y)){this.alfLog("info","Updating DocumentList with new filter:",y);this._documentlist.onChangeFilter(null,[null,y])}else{this.alfLog("warn","The current filter matches the published change:",this._currentFilter,y)}},onNodeCreated:function f(y){this.alfLog("log","Node creation detected",y);if(y&&this.currentNode&&y.parentNodeRef==this.currentNode.parent.nodeRef){this.alfLog("log","Refreshing DocumentList");this._documentlist.onDocListRefresh(null,[y])}},currentNode:null,onMetadataChange:function c(A,z){this.alfLog("info","Detected Metadata change");var B=z[1];this.alfLog("info","Detected Metadata change: ",B);if(B&&B.metadata){var y=Alfresco.util.deepCopy(B.metadata);this.currentNode=Alfresco.util.deepCopy(B.metadata);this.alfPublish("ALF_CURRENT_NODEREF_CHANGED",{node:y})}},onSelectedFilesChanged:function t(z,y){this.alfLog("log","Selected files changed: ",z,y);var A=null;if(this._documentlist&&this._documentlist.widgets&&this._documentlist.widgets.dataTable&&typeof this._documentlist.widgets.dataTable.getRecordSet==="function"&&typeof this._documentlist.widgets.dataTable.getRecordSet().getLength==="function"){A=this._documentlist.widgets.dataTable.getRecordSet().getLength()}this.alfPublish("ALF_SELECTED_FILES_CHANGED",{selectedFiles:this._documentlist.getSelectedFiles(),availableItemCount:A,selectedItemCount:this._documentlist.getSelectedFiles().length});if(!this._isIntialised){this._isIntialised=true;this.alfPublish("ALF_DOCLIST_READY",{})}},onFilterChanged:function v(z,y){var A=y[1];if(A&&(typeof A.filterId!=="undefined")){A.filterOwner=A.filterOwner||Alfresco.util.FilterManager.getOwner(A.filterId)}this.alfLog("info","Setting current filter",A);this._currentFilter=A;this.alfPublish("ALF_DOCLIST_FILTER_CHANGED",A)},onUserAccess:function l(z,y){this.alfLog("log","User access change: ",z,y);var A=y[1];if(A){this.alfPublish("ALF_DOCLIST_USER_ACCESS_CHANGED",A)}},onResizeEvent:function e(z){if(z&&z.node&&this._documentlist){if(p.isDescendant(this.domNode,z.node)){var y=n.get(z.node,"width");this._documentlist._resizeRowContainers(y)}}}})});