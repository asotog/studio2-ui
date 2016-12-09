(function ($, window, amplify, CStudioAuthoring) {
    'use strict';

    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }

    var cstopic = crafter.studio.preview.cstopic;
    var Topics = crafter.studio.preview.Topics;
    var origin = window.location.origin; // 'http://127.0.0.1:8080';
    var communicator = new crafter.studio.Communicator(origin);
    // CStudioAuthoring.Utils.Cookies.readCookie('crafterSite')

    communicator.subscribe(Topics.GUEST_CHECKIN, function (url) {
        var site = CStudioAuthoring.Utils.Cookies.readCookie('crafterSite');
        var params = {
            page: url,
            site: site
        };
        setHash(params);
        amplify.publish(cstopic('GUEST_CHECKIN'), params);
    });

    communicator.subscribe(Topics.GUEST_CHECKOUT, function () {
        // console.log('Guest checked out');
    });

    communicator.subscribe(Topics.ICE_ZONE_ON, function (message, scope) {

        var isWrite = false;
        var par = [];
        var isLockOwner = function (lockOwner){
            if (lockOwner != '' && lockOwner != null && CStudioAuthoringContext.user != lockOwner) {
                par = [];
                isWrite = false;
                par.push({name: "readonly"});
            }
        }
        var editCb = {
            success:function(contentTO, editorId, name, value, draft) {
                if(CStudioAuthoringContext.isPreview){
                    try{
                        CStudioAuthoring.Operations.refreshPreview();
                    }catch(err) {
                        if(!draft) {
                            this.callingWindow.location.reload(true);
                        }
                    }
                }
                if(CStudioAuthoringContext.isPreview || (!CStudioAuthoringContext.isPreview && !draft)) {
                    eventNS.data = CStudioAuthoring.SelectedContent.getSelectedContent();
                    eventNS.typeAction = "";
                    document.dispatchEvent(eventNS);
                }
            },
            failure: function() {
            }
        };
        var currentPath = (message.itemId) ? message.itemId : CStudioAuthoring.SelectedContent.getSelectedContent()[0].uri;
        var editPermsCallback = {
            success: function (response) {
                isWrite = CStudioAuthoring.Service.isWrite(response.permissions);
                if (!isWrite) {
                    par.push({name: "readonly"});
                }

                if (!message.itemId) {
                    // base page edit
                            isLockOwner(CStudioAuthoring.SelectedContent.getSelectedContent()[0].lockOwner);
                            CStudioAuthoring.Operations.performSimpleIceEdit(
                                CStudioAuthoring.SelectedContent.getSelectedContent()[0],
                                message.iceId, //field
                                isWrite,
                                editCb,
                                par);

                } else {
                    var getContentItemsCb = {
                        success: function (contentTO) {
                            isLockOwner(contentTO.item.lockOwner);
                            CStudioAuthoring.Operations.performSimpleIceEdit(
                                        contentTO.item,
                                        this.iceId, //field
                                        isWrite,
                                        this.editCb,
                                        par);
                        },
                        failure: function () {
                            callback.failure();
                        },
                        iceId: message.iceId,
                        editCb: editCb
                    };

                    CStudioAuthoring.Service.lookupContentItem(
                        CStudioAuthoringContext.site,
                        message.itemId,
                        getContentItemsCb,
                        false, false);

                }
            }, failure: function () {}
        }

        CStudioAuthoring.Service.getUserPermissions(
            CStudioAuthoringContext.site,
            currentPath,
            editPermsCallback);

    });

    communicator.subscribe(Topics.ICE_ZONES, function (message) {
        var iceItems = message;
        /* var params = {
            iceRef: message.iceRef,
            position: message.position
        }; */
        var iceItemsPaths = iceItems.map(function(item) {
            return (item.path) ? item.path : CStudioAuthoring.SelectedContent.getSelectedContent()[0].uri;
        });
        
        //var currentPath = (message.path) ? message.path : CStudioAuthoring.SelectedContent.getSelectedContent()[0].uri;
        var isLockOwner = function (lockOwner, item){
            if (lockOwner != '' && lockOwner != null && CStudioAuthoringContext.user != lockOwner) {
                return 'lock';
            }
            return item.class;
        }

        var permsCallback = {
            success: function (response) {
                iceItems.map(function(item, index) { // attach permissions data
                    item.permissions = response[index].permissions;
                    item.isWrite = CStudioAuthoring.Service.isWrite(item.permissions);
                    return item;
                });

                iceItems.filter(function(item) { // do for items that have not provided the path
                    return (!item.path);
                }).forEach(function(item) {
                    if (item.isWrite) {
                        item.class = isLockOwner(CStudioAuthoring.SelectedContent.getSelectedContent()[0].lockOwner, item);
                    }else {
                        item.class = 'read';
                    }
                    communicator.publish(Topics.ICE_TOOLS_INDICATOR, item);
                });

                var validIceItems = iceItems.filter(function(item) { // return valid items
                    return (item.path && item.isWrite);
                });

                var validIceItemsPaths = validIceItems.map(function(item) { return item.path}); // retrieve just the paths so we can call the service with just paths array

                var itemCallback = {
                    success: function (responseItems) {
                        validIceItems.forEach(function(item, index) { // start showing the pencils once response is ready
                            item.class = isLockOwner(responseItems[index].item.lockOwner, item);
                            communicator.publish(Topics.ICE_TOOLS_INDICATOR, item);
                        });
                    },failure: function () {}
                }

                CStudioAuthoring.Service.batchLookupContentItem(
                        CStudioAuthoringContext.site,
                        validIceItemsPaths,
                        itemCallback,
                        false, false);

            },failure: function () {}
        }

        CStudioAuthoring.Service.getBatchUserPermissions(
            CStudioAuthoringContext.site,
            iceItemsPaths,
            permsCallback);

    });

    // Listen to the guest site load
    communicator.subscribe(Topics.GUEST_SITE_LOAD, function (message, scope) {

        if (message.url) {
            var params = {
                page:message.url,
                site: CStudioAuthoring.Utils.Cookies.readCookie('crafterSite')
            };
            setHash(params);
            amplify.publish(cstopic('GUEST_SITE_LOAD'), params);
        }

        // Once the guest window notifies that the page as successfully loaded,
        // add the guest window as a target of messages sent by this window
        communicator.addTargetWindow({
            origin: origin,
            window: getEngineWindow().contentWindow
        });

    });

    communicator.subscribe(Topics.STOP_DRAG_AND_DROP, function () {
        CStudioAuthoring.PreviewTools.panel.show();
        YDom.replaceClass('component-panel-elem', 'expanded', 'contracted');
    });

    communicator.subscribe(Topics.COMPONENT_DROPPED, function (message) {
        amplify.publish(cstopic('COMPONENT_DROPPED'),
            message.type,
            message.path,
            message.isNew,
            message.trackingNumber,
            message.zones,
            message.compPath,
            message.conComp
        );
    });

    communicator.subscribe(Topics.START_DIALOG, function (message) {
        var newdiv = document.createElement("div");

        newdiv.setAttribute("id", "cstudio-wcm-popup-div");
        newdiv.className = "yui-pe-content";
        newdiv.innerHTML = '<div class="contentTypePopupInner" id="warning">' +
            '<div class="contentTypePopupContent" id="contentTypePopupContent"> ' +
            '<div class="contentTypePopupHeader">Warning</div> ' +
            '<div class="contentTypeOuter">'+
            '<div>'+message.message+'</div> ' +
            '<div>' +
            '</div>' +
            '</div>' +
            '<div class="contentTypePopupBtn"> ' +
            '<input type="button" class="btn btn-primary cstudio-xform-button ok" id="cancelButton" value="Cancel" />' +
            '</div>' +
            '</div>';

        document.body.appendChild(newdiv);

        var dialog = new YAHOO.widget.Dialog("cstudio-wcm-popup-div", {
            width: "400px",
            height: "199px",
            fixedcenter: true,
            visible: false,
            modal: true,
            close: false,
            constraintoviewport: true,
            underlay: "none",
            autofillheight: null,
            buttons: [{ text:"Cancel", handler: function() { $(this).destroy(); }, isDefault:true }]
        });

        dialog.render();
        dialog.show();
        dialog.cfg.setProperty("zIndex", 100001); // Update the z-index value to make it go over the site content nav

        YAHOO.util.Event.addListener("cancelButton", "click", function() {
            dialog.destroy();
            var masks = YAHOO.util.Dom.getElementsByClassName("mask");
            for (var i =0; i < masks.length; i++){
                YAHOO.util.Dom.getElementsByClassName("mask")[0].parentElement.removeChild(YAHOO.util.Dom.getElementsByClassName("mask")[0]);
            }
        });

        return dialog;
    });

    communicator.subscribe(Topics.OPEN_BROWSE, function (message) {
        CStudioAuthoring.Operations.openBrowse("", message.path, 1, "select", true, {
            success: function (searchId, selectedTOs) {

                for (var i = 0; i < selectedTOs.length; i++) {
                    var item = selectedTOs[i];
                    communicator.publish(Topics.DND_CREATE_BROWSE_COMP, {
                        component: selectedTOs[i]
                    });
                }
            },
            failure: function () {
            }
        });
    });

    communicator.subscribe(Topics.SAVE_DRAG_AND_DROP, function (message) {
        amplify.publish(cstopic('SAVE_DRAG_AND_DROP'),
            message.isNew,
            message.zones,
            message.compPath,
            message.conComp
        );
    });

    communicator.subscribe(Topics.INIT_DRAG_AND_DROP, function (message) {
        amplify.publish(cstopic('INIT_DRAG_AND_DROP'),
            message.zones);
    });

    communicator.subscribe(Topics.DND_ZONES_MODEL_REQUEST, function (message) {
        amplify.publish(cstopic('DND_ZONES_MODEL_REQUEST'),
                message.aNotFound
            );

    });

    amplify.subscribe(cstopic('REFRESH_PREVIEW'), function () {
        communicator.publish(Topics.REFRESH_PREVIEW);
    });

    var initialContentModel;
    amplify.subscribe(cstopic('START_DRAG_AND_DROP'), function (config) {
        CStudioAuthoring.PreviewTools.panel.hide();

        var data, dataBrowse;
        if (config.components.category){
            data = config.components.category;
        }else{
            data = config.components;
        }

        if (config.components.browse){
            dataBrowse = config.components.browse;
        }

        var categories = [], browse = [];

        if(data) {
            if ($.isArray(data)) {
                $.each(data, function (i, c) {
                    if (c.component) {
                        categories.push({ label: c.label, components: c.component });
                    } else {
                        categories.push({ label: c.label, components: c.components });
                    }

                });
            } else {
                if (data.component) {
                    categories.push({ label: data.label, components: data.component });
                } else {
                    categories.push({ label: data.label, components: data.components });
                }
            }
        }

        if(dataBrowse) {
            if ($.isArray(dataBrowse)) {
                $.each(dataBrowse, function (i, c) {
                    browse.push({ label: c.label, path: c.path });
                });
            } else {
                browse.push({ label: dataBrowse.label, path: dataBrowse.path });
            }
        }

        var text = {};
        text.done = CMgs.format(previewLangBundle, "done");
        text.components = CMgs.format(previewLangBundle, "components");
        text.addComponent = CMgs.format(previewLangBundle, "addComponent");

        communicator.publish(Topics.START_DRAG_AND_DROP, {
            components: categories,
            contentModel: initialContentModel,
            translation: text,
            browse: browse
        });

    });

    amplify.subscribe(cstopic('CHANGE_GUEST_REQUEST'), function (url) {
       // console.log(arguments);
    });

    amplify.subscribe(cstopic('DND_COMPONENT_MODEL_LOAD'), function (data) {
        communicator.publish(Topics.DND_COMPONENT_MODEL_LOAD, data);
    });

    amplify.subscribe(cstopic('DND_COMPONENTS_MODEL_LOAD'), function (data) {
        initialContentModel = data;
        communicator.publish(Topics.DND_COMPONENTS_MODEL_LOAD, data);
    });

    amplify.subscribe(cstopic('ICE_TOOLS_OFF'), function (){
        communicator.publish(Topics.ICE_TOOLS_OFF);
    });

    amplify.subscribe(cstopic('ICE_TOOLS_ON'), function (){
        communicator.publish(Topics.ICE_TOOLS_ON);
    });

    amplify.subscribe(cstopic('ICE_TOOLS_REGIONS'), function (data){
        communicator.publish(Topics.ICE_TOOLS_REGIONS, data);
    });

    function setHashPage(url) {
        window.location.hash = '#/?page=' + url;
    }

    function setHash(params) {
        var hash = [];
        for (var key in params) {
            hash.push(key + '=' + params[key]);
        }
        CStudioAuthoringContext && (CStudioAuthoringContext.previewCurrentPath = params.page);
        window.location.hash = '#/?' + hash.join('&');
    }

    function getEngineWindow() {
        return document.getElementById('engineWindow');
    }

    function goToHashPage() {

        var win = getEngineWindow();
        var hash = parseHash(window.location.hash);
        var site = CStudioAuthoring.Utils.Cookies.readCookie('crafterSite');
        var siteChanged = false;

        if (hash.site) {
            CStudioAuthoring.Utils.Cookies.createCookie('crafterSite', hash.site);
            siteChanged = (site !== hash.site);
        }

        setTimeout(function () {
            // TODO this thing doesn't work well if document domain is not set on both windows. Problem?
            try{
                if (siteChanged ||
                    win.contentWindow.location.href.replace(origin, '') !== hash.page) {
                    win.src = hash.page;
                }
            }catch (err){
                if (siteChanged ||
                    win.src.replace(origin, '') !== hash.page) {
                    win.src = hash.page;
                }
            }

        });

        var path = hash.page,
            hashPage = hash.page;

        if(path && path.indexOf(".") != -1) {
            if(path.indexOf(".html") != -1 || path.indexOf(".xml") != -1 ) {
                path = ('/site/website/'+ hashPage).replace('//','/');
                path = path.replace('.html', '.xml')
            }
        }
        else {
            if (hash.page && hash.page.indexOf('?') != -1) {
                hashPage = hash.page.substring(0, hash.page.indexOf('?'));
            }
            if (hash.page && hash.page.indexOf('#') != -1) {
                hashPage = hash.page.substring(0, hash.page.indexOf('#'));
            }

            path = ('/site/website/'+ hashPage+'/index.xml').replace('//','/');
        }

        path =  path.replace('//','/');

        CStudioAuthoring.Service.lookupContentItem(CStudioAuthoringContext.site, path, {
            success: function(content) {
                CStudioAuthoring.SelectedContent.setContent(content.item);
            }
        });

    }

    // TODO better URL support. Find existing lib, use angular or use backbone router?
    function parseHash(hash) {

        var str = hash.replace('#/', ''),
            params = {},
            param;

        str = str.substr(str.indexOf('?') + 1);
        if(str.indexOf('?') != -1){
            var strPage = str.split('?');
            var strPageParam = strPage[1].split('&');
            str = strPage[0] + '?';
            for (var i=0; i < strPageParam.length; i++){
                if((strPageParam[i].indexOf('site') != -1) && (i == strPageParam.length-1)){
                    str = str + '&' + strPageParam[i];
                }else{
                    str = str + strPageParam[i];
                    if(i != strPageParam.length-1){
                        str = str + '&';
                    }
                }
            }
            str = str.split('&&');
        }else{
            str = str.split('&');
        }

        for (var i = 0; i < str.length; ++i) {
            param = splitOnce(str[i], '=');
            params[param[0]] = param[1];
        }

        return params;

    }

    function splitOnce(input, splitBy) {
        var fullSplit = input.split(splitBy);
        var retVal = [];
        retVal.push( fullSplit.shift() );
        retVal.push( fullSplit.join( splitBy ) );
        return retVal;
    }

    window.addEventListener("hashchange", function (e) {
        e.preventDefault();
        goToHashPage();
    }, false);

    window.addEventListener('load', function () {

        if (window.location.hash.indexOf('page') === -1) {
            setHash({
                page: '/',
                site: CStudioAuthoring.Utils.Cookies.readCookie('crafterSite')
            });
        } else {
            goToHashPage();
        }

    }, false);

}) (jQuery, window, amplify, CStudioAuthoring);