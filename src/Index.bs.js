'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var EntityCard$ReasonReactExamples = require("./EntityCard/EntityCard.bs.js");

ReactDOMRe.renderToElementWithId(React.createElement(EntityCard$ReasonReactExamples.make, {
          id: "hdfc-bank-limited"
        }), "root");

/*  Not a pure module */
