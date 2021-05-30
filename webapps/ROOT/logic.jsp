<%@ page import="java.net.URL" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.util.regex.Matcher"%>
<%@ page import="java.util.regex.Pattern"%>
<%@ page import="java.util.prefs.Preferences" %>
<%@ page import="java.net.URLEncoder" %>

<%!
    private String propertyNode="com.jaspersoft.aws.registration";
    private String propertyRegistrationStatus ="registered";
    private String propertySeenStatus ="seen";
    private String skipRequestParameterName="skip_support";
    private String forceShowSupportPageRequestParameterName="show_support";
    private String confirmRegistrationRequestParameterName="confirm_registration";
%>
<%
    java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy");
    request.setAttribute("year", sdf.format(new java.util.Date()));
    request.setAttribute("awsInstanceId",getEc2InstanceId());
    request.setAttribute("awsInstanceType",getEc2InstanceType());
    request.setAttribute("awsAccountId",getEc2AccountId());
    request.setAttribute("registrationStatus",getRegistrationStatus());
    request.setAttribute("skipRequestParameterName",skipRequestParameterName);
    request.setAttribute("confirmUrl",URLEncoder.encode(request.getRequestURL().toString()+"?"+confirmRegistrationRequestParameterName+"=confirm","UTF-8"));


    if (request.getParameter("resetSupport")!=null) {
        Preferences userPrefs = Preferences.userRoot().node(propertyNode);
        userPrefs.putBoolean(propertySeenStatus,false);
        userPrefs.putBoolean(propertyRegistrationStatus, false);
    }

    boolean showSupportPage=true;
    if (getSeenStatus()||getRegistrationStatus()) {
        showSupportPage=false;
    }

    if (request.getParameter(confirmRegistrationRequestParameterName)!=null) {
        if (request.getParameter(confirmRegistrationRequestParameterName).equals("confirm")) {
            setRegistrationStatus();
            showSupportPage=false;
        }
    }
    boolean skipRequestStatus = request.getParameter(skipRequestParameterName)!=null;
    if (skipRequestStatus) {
        setSeenStatus();
        showSupportPage=false;
    }
    boolean forceShowSupportPage = request.getParameter(forceShowSupportPageRequestParameterName)!=null;
    if (forceShowSupportPage) {
        showSupportPage=true;
    }


%>

<%!
    public boolean getSeenStatus() {
        Preferences userPrefs = Preferences.userRoot().node(propertyNode);
        return userPrefs.getBoolean(propertySeenStatus,false);
    }
    public boolean getRegistrationStatus() {
        Preferences userPrefs = Preferences.userRoot().node(propertyNode);
        return userPrefs.getBoolean(propertyRegistrationStatus,false);
    }
    public void setSeenStatus() {
        Preferences userPrefs = Preferences.userRoot().node(propertyNode);
        userPrefs.putBoolean(propertySeenStatus, true);
    }
    public void setRegistrationStatus() {
        Preferences userPrefs = Preferences.userRoot().node(propertyNode);
        userPrefs.putBoolean(propertyRegistrationStatus, true);
    }

    public String getEc2InstanceId() {
        String instanceId =  readResource("/latest/meta-data/instance-id");
        return instanceId != null? instanceId : "NoInstanceId";
    }
    public String getEc2InstanceType() {
        String instanceId =  readResource("/latest/meta-data/instance-type");
        return instanceId != null? instanceId : "NoInstanceType";
    }

    public String getEc2IamRole() {
        String iamRole =  readResource("/latest/meta-data/iam/security-credentials/");
        return iamRole != null? iamRole : "";
    }
    public String checkEc2HAMode() {
        String userData =  readResource("/latest/user-data");
        if (userData != null && userData.contains("dbPassword")) {
            return "true";
        }
        return "";
    }
    public String getEc2AccountId() {
        String accountId = parsePropertyValueFromJson(readResource("/latest/dynamic/instance-identity/document"), "accountId");
        return accountId != null? accountId : "NoAccountId";
    }


    public String parsePropertyValueFromJson(String jsonText, String property) {
        if (jsonText == null) return null;
        Matcher matcher = Pattern.compile("(\"" + property + "\")\\s*:\\s*\"([^\"]+)").matcher(jsonText);
        if (matcher.find()) {
            return matcher.group(2);
        }   else {
            return null;
        }
    }

    private  String readResource(String resourcePath)  {
        HttpURLConnection connection = null;
        URL url;
        try {
            url = new URL("http://169.254.169.254" + resourcePath);
            connection = (HttpURLConnection)url.openConnection();
            connection.setConnectTimeout(1000 * 2);
            connection.setRequestMethod("GET");
            connection.setDoOutput(true);
            connection.connect();

            return readResponse(connection);
        } catch (Exception e) {
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    private String readResponse(HttpURLConnection connection) throws IOException {
        InputStream inputStream = connection.getInputStream();

        try {
            StringBuilder buffer = new StringBuilder();
            while (true) {
                int c = inputStream.read();
                if (c == -1) break;
                buffer.append((char)c);
            }

            return buffer.toString();
        } finally {
            inputStream.close();
        }
    }


%>
