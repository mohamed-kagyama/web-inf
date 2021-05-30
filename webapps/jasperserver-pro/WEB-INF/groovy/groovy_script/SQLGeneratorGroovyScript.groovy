/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

package groovy_script

import com.jaspersoft.commons.dataset.expr.Expression

import static com.jaspersoft.commons.dataset.expr.Expression.ExpressionType.FUNCTION
import static com.jaspersoft.commons.dataset.expr.Expression.ExpressionType.LITERAL
import static com.jaspersoft.commons.dataset.expr.ObjectType.STRING

/**
 * <p>
 * Base class for any Groovy scripts that will run in SQLGenerator.
 * Contains additional helper methods that are used in "functionTemplates" (applicationContext-semanticLayer.xml)
 * </p>
 *
 * @autshor Vlad Zavadskyi
 */
abstract class SQLGeneratorGroovyScript extends BaseGroovyScript {

    /**
     * Makes an SQL cast expression for a database field.
     * SQL example: <i>cast("databaseField" as type(precision, scale))</i>.
     * <p>
     * This method is used in SQLGenerator's <i>Integer</i> and <i>Decimal</i>
     * functions. Example of usages:
     * <ul>
     * <li>Integer(2) - 2 as a BigDecimal Literal
     * <li>Integer(attribute('intName')) - with <i>attribute</i> Function
     * <li>Integer('2') - '2' as a String Literal
     * <li>Integer("Postal Code") - "Postal Code" as a ResourceVariable which value is db field name
     * </ul>
     * Same examples apply to <i>Decimal</i> function
     *
     * @param expression an Expression that is used in groovy. Usually obtained from "args" binding
     * @param processedValue value that went trough SQL generation process. Usually obtained from "sqlArgs" binding
     * @param type a database type to which field should be adopted
     * @param precision precision of the specified type
     * @param scale scale of the specified type
     * @return sql expression
     */
    def static cast(Expression expression, String processedValue, String type, Integer precision, Integer scale) {

        // If expression has String type
        if (expression.getObjectType().equals(STRING)) {
            // For functions and literals the original value "args[0].value" should be returned.
            // Without processing (walking the expression) as "sqlArgs".
            // E.g. String Literal '2': "args[0].value" will return 2, but "sqlArgs[0]" - '2'
            if (expression.getExpressionType().equals(FUNCTION)
                    || expression.getExpressionType().equals(LITERAL)) {
                return (String) expression.getValue()

                // In the case of ResourceVariable - value is null. This var represents the db field name.
                // So we should return a valid cast expression for the field:
                // cast("fieldName" as castType(precision, scale))
            } else {
                StringBuilder sql = new StringBuilder()

                sql.append("cast(").append(processedValue).append(" as ").append(type);
                if (precision != null) {
                    sql.append("(").append(precision)
                    if (scale != null) sql.append(", ").append(scale)
                    sql.append(")")
                }
                sql.append(")")

                return sql.toString()
            }
            // For other types just return processed value
        } else {
            return processedValue
        }
    }

    /**
     * Makes an SQL cast expression for a database field.
     * E.g cast("databaseField" as type)
     *
     * @param expression an Expression that is used in groovy. Usually obtained from "args" binding
     * @param processedValue value that went trough SQL generation process. Usually obtained from "sqlArgs" binding
     * @param type a database type to which field should be adopted
     * @return sql expression
     */
    def static cast(Expression expression, String processedValue, String type) {
        return cast(expression, processedValue, type, null, null)
    }
}