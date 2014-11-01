define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/DragWidgetPalette.html","dojo/text!./templates/WidgetTemplate.html","alfresco/core/Core","dojo/dnd/Source","dojo/_base/lang","dojo/string","dojo/dom-construct"],function(i,d,k,l,a,c,h,b,j,g){return i([d,k,c],{cssRequirements:[{cssFile:"./css/DragWidgetPalette.css"}],i18nRequirements:[{i18nFile:"./i18n/DragWidgetPalette.properties"}],templateString:l,dragWithHandles:false,postCreate:function f(){var m=new h(this.paletteNode,{copyOnly:true,selfCopy:false,creator:b.hitch(this,"creator"),withHandles:this.dragWithHandles});m.insertNodes(false,this.widgetsForPalette)},creator:function e(n,o){this.alfLog("log","Creating",n,o);var m=g.toDom(j.substitute(a,{title:(n.name!=null)?n.name:"",iconClass:(n.iconClass!=null)?n.iconClass:""}));return{node:m,data:n,type:["widget"]}},widgetsForPalette:[{type:["widget"],name:"Page Title",module:"alfresco/header/SetTitle",defaultConfig:{title:""},widgetsForConfig:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"defaultConfig.title",label:"Page Title",value:"",}}],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:true}}]},{type:["widget"],name:"Logo",module:"alfresco/logo/Logo",defaultConfig:{logoClasses:""},widgetsForConfig:[{name:"alfresco/forms/controls/DojoSelect",config:{name:"defaultConfig.logoClasses",label:"Logo Classes",value:"",optionsConfig:{fixed:[{label:"Standard Alfresco",value:""},{label:"Large Alfresco",value:"alfresco-logo-large"},{label:"Alfresco Logo Only",value:"alfresco-logo-only"},{label:"3D Alfresco",value:"alfresco-logo-3d"},{label:"Surf Large",value:"surf-logo-large"},{label:"Surf Small",value:"surf-logo-small"}]}}}],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:true}}]},{type:["widget"],name:"Menu Bar",module:"alfresco/menus/AlfMenuBar",defaultConfig:{},widgetsForConfig:[],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:true}}]},{type:["widget"],name:"Menu Bar Item",module:"alfresco/menus/AlfMenuBarItem",defaultConfig:{label:"default",iconClass:"",altText:""},widgetsForConfig:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"defaultConfig.label",label:"Label",value:"default",}},{name:"alfresco/forms/controls/DojoSelect",config:{name:"defaultConfig.iconClass",label:"Icon",value:"",optionsConfig:{fixed:[{label:"None",value:""},{label:"Configure",value:"alf-configure-icon"},{label:"Invite User",value:"alf-user-icon"},{label:"Upload",value:"alf-upload-icon"},{label:"Create",value:"alf-create-icon"},{label:"All Selected",value:"alf-allselected-icon"},{label:"Some Selected",value:"alf-someselected-icon"},{label:"None Selected",value:"alf-noneselected-icon"},{label:"Back",value:"alf-back-icon"},{label:"Forward",value:"alf-forward-icon"}]}}},{name:"alfresco/forms/controls/DojoTextarea",config:{name:"defaultConfig.altText",label:"Alt Text",value:"",}}],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:true}}]},{type:["widget"],name:"Drop-down menu",module:"alfresco/menus/AlfMenuBarPopup",defaultConfig:{label:"default",iconClass:"",altText:""},widgetsForConfig:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"defaultConfig.label",label:"Label",value:"default",}},{name:"alfresco/forms/controls/DojoSelect",config:{name:"defaultConfig.iconClass",label:"Icon",value:"",optionsConfig:{fixed:[{label:"None",value:""},{label:"Configure",value:"alf-configure-icon"},{label:"Invite User",value:"alf-user-icon"},{label:"Upload",value:"alf-upload-icon"},{label:"Create",value:"alf-create-icon"},{label:"All Selected",value:"alf-allselected-icon"},{label:"Some Selected",value:"alf-someselected-icon"},{label:"None Selected",value:"alf-noneselected-icon"},{label:"Back",value:"alf-back-icon"},{label:"Forward",value:"alf-forward-icon"}]}}},{name:"alfresco/forms/controls/DojoTextarea",config:{name:"defaultConfig.altText",label:"Alt Text",value:"",}}],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:false}}]},{type:["widget"],name:"Menu Group",module:"alfresco/menus/AlfMenuGroup",defaultConfig:{label:"default"},widgetsForConfig:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"defaultConfig.label",label:"Label",value:"default",}}],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:false}}]},{type:["widget"],name:"Menu Item",module:"alfresco/menus/AlfMenuItem",defaultConfig:{label:"default",iconClass:"",altText:"",publishTopic:"",publishPayload:""},widgetsForConfig:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"defaultConfig.label",label:"Label",value:"default",}},{name:"alfresco/forms/controls/DojoSelect",config:{name:"defaultConfig.iconClass",label:"Icon",value:"",optionsConfig:{fixed:[{label:"None",value:""},{label:"Edit",value:"alf-edit-icon"},{label:"Configure",value:"alf-cog-icon"},{label:"Leave",value:"alf-leave-icon"},{label:"User",value:"alf-profile-icon"},{label:"Password",value:"alf-password-icon"},{label:"Help",value:"alf-help-icon"},{label:"Logout",value:"alf-logout-icon"},{label:"Simple List",value:"alf-simplelist-icon"},{label:"Detailed List",value:"alf-detailedlist-icon"},{label:"Gallery",value:"alf-gallery-icon"},{label:"Show Folders",value:"alf-showfolders-icon"},{label:"Show Path",value:"alf-showpath-icon"},{label:"Show Sidebar",value:"alf-showsidebar-icon"},{label:"Text",value:"alf-textdoc-icon"},{label:"HTML Selected",value:"alf-htmldoc-icon"},{label:"XML",value:"alf-xmldoc-icon"}]}}},{name:"alfresco/forms/controls/DojoTextarea",config:{name:"defaultConfig.altText",label:"Alt Text",value:"",}},{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"defaultConfig.publishTopic",label:"Publish Topic",value:"",}},{name:"alfresco/forms/controls/MultipleKeyValuePairFormControl",config:{name:"defaultConfig.publishPayload",label:"Publish Payload",value:""}}],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:true}}]},{type:["widget"],name:"Cascading Menu",module:"alfresco/menus/AlfCascadingMenu",defaultConfig:{label:"default"},widgetsForConfig:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"defaultConfig.label",label:"Label",value:"default",}}],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:false}}]},{type:["widget"],name:"Title, Description And Content",module:"alfresco/layout/TitleDescriptionAndContent",defaultConfig:{title:"title",description:"description"},widgetsForConfig:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"defaultConfig.title",label:"Title",value:"title",}},{name:"alfresco/forms/controls/DojoTextarea",config:{name:"defaultConfig.description",label:"Description",value:"description",}}],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:false}}]},{type:["widget"],name:"Sliding Tabs",module:"alfresco/layout/SlidingTabs",defaultConfig:{},widgetsForConfig:[],previewWidget:false,widgetsForDisplay:[{name:"alfresco/creation/DropZone",config:{horizontal:false,widgetsForNestedConfig:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"additionalConfig.title",label:"Tab Title",value:"title",}}]}}]}]})});