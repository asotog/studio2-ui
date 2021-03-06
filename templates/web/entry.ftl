<!doctype html>
<html class="no-js" lang="" ng-app="studio">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title>Crafter Studio</title>
    <#-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <#if userEmail??>
    <script type="application/json" id="user">{"name":"${userFirstName}","surname":"${userLastName}","email":"${userEmail}","username":"${username}" }</script>
    </#if>

    <script>var CStudioAuthoring = { cookieDomain: "${cookieDomain}" };</script>

    <link rel="stylesheet" href="/studio/static-assets/styles/main.css?version=${UIBuildId!''}">

    <script src="/studio/static-assets/js/modernizr.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/jquery/dist/jquery.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/angular/angular.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/angular-translate/angular-translate.min.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/angular-translate-handler-log/angular-translate-handler-log.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/angular-ui-router/release/angular-ui-router.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/angular-cookies/angular-cookies.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/angular-ui-utils/ui-utils.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/Smart-Table/dist/smart-table.min.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/ng-file-upload/dist/ng-file-upload-shim.min.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/libs/ng-file-upload/dist/ng-file-upload.min.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/scripts/main.js?version=${UIBuildId!''}"></script>
    <script src="/studio/static-assets/scripts/admin.js?version=${UIBuildId!''}"></script>
    <link rel="shortcut icon" href="/studio/static-assets/img/favicon.png?version=${UIBuildId!''}">

</head>
<body class="{{$state.current.cssClass}}">

<ui-view></ui-view>

</body>
</html>
