'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Entity$ReasonReactExamples = require("../src/Model/Entity.bs.js");

Jest.describe("Entity", (function (param) {
        return Jest.test("get short security", (function (param) {
                      var shortSecurity = Entity$ReasonReactExamples.getShortSecurity("AAPL US EQUITY");
                      return Jest.Expect.toEqual("AAPL US", Jest.Expect.expect(shortSecurity));
                    }));
      }));

/*  Not a pure module */
