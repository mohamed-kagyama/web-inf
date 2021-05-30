<%--
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
--%>

<html lang="en">
<head>
    <title>Welcome to Jaspersoft Business Intelligence</title>
    <link href="favicon.ico" rel="icon" type="image/x-icon" />
    <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <link href="theme/reset.css" rel="stylesheet" type="text/css">
    <link href="theme/theme.css" rel="stylesheet" type="text/css">
</head>

<body>

<div class="wrapper">
    <div class="content">
        <h1>Getting started with Jaspersoft BI</h1>
        <p class="subheader">In a few minutes you can be building reports, dashboards, and visualizations with your data.</p>

        <% if (getEc2IamRole().isEmpty()) {%>
            <p class="note"><b>**Important Note:</b>
    It appears that you did not use our CloudFormation template to launch this instance. This instance will work, but you will not benefit from our <a href="http://community.jaspersoft.com/wiki/jaspersoft-bi-aws-frequently-asked-questions#auto-connect" target="_blank">auto-connect feature</a> for Amazon RDS and Redshift. If you would like this feature you can re-deploy your instance by following this <a href="http://community.jaspersoft.com/jaspersoft-aws/launch" target="_blank">step-by-step guide</a>.</p>
        <%} %>

        <img class="logo aws" src="theme/logo_partner_aws.png" />

        <div class="actionSteps">
            <h3>Get started video</h3>
            <p>Watch this short video that shows you how to quickly connect to your AWS data sources and start building reports and doing analysis.</p>
            <button class="step video" onclick="window.open('http://www.youtube.com/watch?v=Y6rquvd1aq4&feature=youtu.be', '_blank')"><span class="resource-icon"></span>Watch Video</button>

            <h3>Explore Jaspersoft community resources</h3>
            <p>Check out our Jaspersoft for AWS community site that includes community forums, documentation, and wiki pages.</p>
            <button class="step community" onclick="window.open('http://community.jaspersoft.com/jaspersoft-aws', '_blank')"><span class="resource-icon"></span>Community</button>
        </div>

        <div class="panelDecorated">

            <div class="panelDecorated-note"></div>

            <div class="launcher">
                <div class="launcher-header">
                    <img class="logo jasper" src="theme/logo_jasper_color.svg">
                </div>

                <div class="launcher-body">
                    <div class="credentials">
                        <p><span class="label">Username: </span> superuser</p>
                        <p><span class="label">Old password: </span> [Refer to the Outputs tab of the CloudFormation Stack. For instances launched directly from AMI use Instance ID as password]</p>
                    </div>
                    <p class="hint">Enter new password on Login page to get started.</p>
                </div>

                <div class="launcher-footer">
                    <button class="login" onclick="window.open('../jasperserver-pro', 'newWindow')"><span class="resource-icon"></span>Login</button>
                </div>
            </div>
        </div>
    </div>
</div>

<p class="footer">Copyright &copy;${year} TIBCO Software Inc. <a href="http://www.jaspersoft.com/privacy-policy" target="_blank">Privacy Statement</a> | <a href="http://www.jaspersoft.com/legal-notices" target="_blank">Legal Notices</a></p>
</body>
</html>
