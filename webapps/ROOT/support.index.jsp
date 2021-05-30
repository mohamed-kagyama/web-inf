<html lang="en"><head>
    <title>Welcome to Jaspersoft Business Intelligence</title>
    <link href="http://www.jaspersoft.com/favicon.ico" rel="icon" type="image/x-icon">
    <link href="theme/reset.css" rel="stylesheet" type="text/css">
    <link href="theme/theme.css" rel="stylesheet" type="text/css">
    <style>
        html, body, iframe { border: none; min-width: 100%; }
        html, body { min-height: 100%; }
        h1,h2,h3 { margin-bottom: 2rem; }
    </style>
    <script type="text/javascript">
        function doConfirm() {
            document.forms["hidden_form"].submit();
        }
    </script>

</head>
<body>
<div class="banner">
    <img class="logo" src="theme/jaspersoft_logo.png">
    <h2 class="title" style="display:inline-block;">Jaspersoft Business Intelligence</h2>
</div>
<div class="iframeWrapper">
    <iframe style="height: 720px; " scrolling="yes"  src="http://www.jaspersoft.com/aws_support/index.php?instance=${awsInstanceId}&account=${awsAccountId}&url=${confirmUrl}" id="supportFrame"></iframe>

    <div style="text-align:center;">
        <a style="font-size:10px;display:inline-block;margin: 1em 0;" href="?${skipRequestParameterName}">No Thanks</a>
    </div>
</div>
<p class="footer">Copyright &copy;${year} TIBCO Software Inc. <a href="http://www.jaspersoft.com/privacy-policy" target="_blank">Privacy Statement</a> | <a href="http://www.jaspersoft.com/legal-notices" target="_blank">Legal Notices</a></p>
<div style="display: none;" id="hidden_div">
    <form action="index.jsp" method="post" id="hidden_form">
        <input type="hidden" name="confirm_registration" value="confirm">
    </form>

</div>

</body></html>

