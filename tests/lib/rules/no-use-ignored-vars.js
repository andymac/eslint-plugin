/**
 * @fileoverview Tests for no-use-ignored-vars rule.
 * @author Toru Nagashima
 */

"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-use-ignored-vars")
var RuleTester = require("eslint").RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()

ruleTester.run("no-use-ignored-vars", rule, {
    valid: [
        "var foo; doSomething(foo)",
        "var _1; doSomething(_1)",
        "var _foo;",
        "function a(foo) { doSomething(foo) }",
        "function a(_1) { doSomething(_1) }",
        "function a(_foo) { }",
        "function a(obj) { for (_key in obj) return true; return false; }",
    ],
    invalid: [
        {code: "var _foo; doSomething(_foo)", errors: ["Unexpected a use of '_foo'. This name is matched to ignored pattern."]},
        {code: "var _bar; doSomething(_bar)", errors: ["Unexpected a use of '_bar'. This name is matched to ignored pattern."]},
        {code: "function a(_foo) { doSomething(_foo) }", errors: ["Unexpected a use of '_foo'. This name is matched to ignored pattern."]},
    ],
})
