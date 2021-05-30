/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,s){s.exports='<securityDefinition xmlns="http://www.jaspersoft.com/2007/SL/XMLSchema" version="1.0" itemGroupDefaultAccess="granted">\n\n    <resourceAccessGrants>\n        \n    \x3c!-- Add row-level security rules in this section. --\x3e\n\n        <resourceAccessGrantList id="aRuleListId" label="aLabel" resourceId="aJoinIdentifier">\n        \x3c!--\n            resourceAccessGrantList contains all the rules (or "grants")  for a specified join in the Domain.\n            aRuleListId - A unique identifier\n            aLabel - A label for the grant list\n            aJoinIdentifier - The join where the specified rules are applied\n        --\x3e\n\n            <resourceAccessGrants>\n            \x3c!-- resourceAccessGrants is a container for the resourceAccessGrant instances. --\x3e\n                \x3c!--\n                    Each resourceAccessGrant specifies a filter and the conditions under which it is applied.\n                    aRuleId - A unique identifier\n                    aPrincipalExpression - A conditional expression that specifies when the filter is applied to a row\n                    aFilterExpression - A expression that specifies how the row data is filtered\n                --\x3e\n                <resourceAccessGrant id="aRuleId">\n                    <principalExpression>aPrincipalExpression</principalExpression>\n                    <filterExpression>aFilterExpression</filterExpression>\n                </resourceAccessGrant>\n    \n            </resourceAccessGrants>\n    \n    \n        </resourceAccessGrantList>\n    </resourceAccessGrants>\n    \n    \x3c!-- _________________________________________ --\x3e\n    \n    <itemGroupAccessGrants>\n    \x3c!-- Add column-level security rules in this section. Column rules control access to item groups and their items. --\x3e\n    \n        <itemGroupAccessGrantList id="aRuleListId" label="aLabel" itemGroupId="aGroupItemIdentifier" defaultAccess="denied">\n        \x3c!--\n            itemGroupAccessGrantList\n            aRuleListId - A unique identifier\n            aLabel - A label for your grant list\n            aGroupItemIdentifier - The join where the specified rules are applied\n        --\x3e\n            \n            <itemGroupAccessGrants>\n        \n                \x3c!--\n                    aRuleId - A unique identifier\n                    aPrincipalExpression - A conditional expression that specifies when the filter is applied to a column\n                --\x3e\n                <itemGroupAccessGrant id="aRuleId" access="granted">\n                    <principalExpression>aPrincipalExpression</principalExpression>\n                </itemGroupAccessGrant>\n        \n            </itemGroupAccessGrants>\n        </itemGroupAccessGrantList>\n    </itemGroupAccessGrants>\n    \n</securityDefinition>'});