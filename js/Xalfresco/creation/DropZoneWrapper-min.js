define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/DropZoneWrapper.html","alfresco/core/Core","dojo/on","dijit/registry","dojo/_base/lang","dojo/_base/array"],function(g,e,m,n,d,j,a,c,i){return g([e,m,d],{cssRequirements:[{cssFile:"./css/DropZoneWrapper.css"}],i18nRequirements:[{i18nFile:"./i18n/DropZoneWrapper.properties"}],templateString:n,moduleName:"<not set>",postCreate:function o(){if(this.widgets!=null){this.processWidgets(this.widgets,this.controlNode)}j(this.controlNode,"onWidgetUpdate",c.hitch(this,"updateWidgetUpdateEvent"))},updateWidgetUpdateEvent:function k(p){this.alfLog("log","Updating event with wrapper ndoe",p);p.widgetWrapperNode=this.domNode;p.widgetWrapperItems=this.getCurrentItems()},onWidgetDelete:function b(p){j.emit(this.domNode,"onWidgetDelete",{bubbles:true,cancelable:true,widgetToDelete:this})},getCurrentItems:function h(){var q=a.findWidgets(this.controlNode);var p=[];i.forEach(q,function(s,r){if(typeof s.getCurrentItems==="function"){i.forEach(s.getCurrentItems(),function(u,t){p.push(u.data)},this)}},this);return p},getWidgetDefinitions:function l(){var q=a.findWidgets(this.controlNode);var p=[];i.forEach(q,c.hitch(this,"getSubWidgetDefinitions",p));return p},getSubWidgetDefinitions:function f(r,s,q){if(typeof s.getWidgetDefinitions==="function"){var p=s.getWidgetDefinitions();if(p!=null&&p.length>0){i.forEach(p,function(u,t){r.push(u)})}}}})});