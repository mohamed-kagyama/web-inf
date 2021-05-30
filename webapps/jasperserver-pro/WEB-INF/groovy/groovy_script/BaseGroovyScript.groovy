/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

package groovy_script

import org.springframework.security.core.context.SecurityContextHolder

import java.util.regex.Pattern

import static java.lang.Math.*

/**
 * This class serves as the base class for any Groovy scripts that get run.
 * It provides a convenient way to expand the capabilities of scripts by adding methods.
 * If you are sandboxing and need to provide functionality to domain security Groovy calls,
 * you can implement the specific functionality here and call it from your principalExpression.
 *
 */
abstract class BaseGroovyScript extends Script {

	private static final Pattern DATE_PATTERN = Pattern.compile("\\d{4}-\\d{2}-\\d{2}")
	private static final Pattern TIME_PATTERN = Pattern.compile("\\d{2}:\\d{2}:\\d{2}")
	
	// return true if the current user holds a role that matches any one of the role names passed as arguments.
	// For example, this code would return true if the current user is either ROLE_ADMIN or ROLE_SUPERUSER:
	//     checkCurrentUserRoles('ROLE_ADMIN', 'ROLE_SUPERUSER')
	boolean checkCurrentUserRoles(String... roles) {
		SecurityContextHolder.context.authentication?.principal.roles.any{ it.roleName in roles }
	}
	
	def currentUser() {
		SecurityContextHolder.context.authentication?.principal
	}

	String toPostgresDatePartArgument(String arg) {
		if (DATE_PATTERN.matcher(arg).find()) {
			return "TIMESTAMP " + arg
		} else if (TIME_PATTERN.matcher(arg).find()) {
			return "INTERVAL " + arg
		} else {
			return arg
		}
	}
}