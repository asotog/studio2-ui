define(["dojo/_base/declare","alfresco/renderers/Toggle","alfresco/services/_RatingsServiceTopicMixin","alfresco/renderers/_JsNodeMixin","dojo/text!./templates/Like.html","dojo/_base/lang","dojo/html","dojo/dom-class"],function(g,i,c,j,m,d,h,k){return g([i,c,j],{i18nRequirements:[{i18nFile:"./i18n/Like.properties"}],cssRequirements:[{cssFile:"./css/Like.css"}],templateString:m,onLabel:"",offLabel:"like.add.label",onTooltip:"like.remove.tooltip",offTooltip:"like.add.tooltip",toggleClass:"like",postMixInProperties:function a(){this.toggleOnTopic=(this.toggleOnTopic!=null)?this.toggleOnTopic:this.addRatingTopic;this.toggleOnSuccessTopic=(this.toggleOnSuccessTopic!=null)?this.toggleOnSuccessTopic:this.addRatingSuccessTopic;this.toggleOnFailureTopic=(this.toggleOnFailureTopic!=null)?this.toggleOnFailureTopic:this.addRatingFailureTopic;this.toggleOffTopic=(this.toggleOffTopic!=null)?this.toggleOffTopic:this.removeRatingTopic;this.toggleOffSuccessTopic=(this.toggleOffSuccessTopic!=null)?this.toggleOffSuccessTopic:this.removeRatingSuccessTopic;this.toggleOffFailureTopic=(this.toggleOffFailureTopic!=null)?this.toggleOffFailureTopic:this.removeRatingFailureTopic;this.inherited(arguments);if(this.currentItem!=null&&this.currentItem.likes!=null&&this.currentItem.likes.totalLikes!=null){this.likeCount=this.currentItem.likes.totalLikes}},getInitialState:function l(){return this.currentItem.likes.isLiked},relatesToMe:function b(o){var p=false;try{p=(o.requestConfig.data.nodeRefUri==this.currentItem.jsNode.nodeRef.uri)}catch(n){this.alfLog("error","Unexpected data structures",n,o,this)}return p},onToggleOnSuccess:function f(n){this.inherited(arguments);h.set(this.countNode,n.response.data.ratingsCount.toString())},onToggleOffSuccess:function e(n){this.inherited(arguments);h.set(this.countNode,n.response.data.ratingsCount.toString())}})});