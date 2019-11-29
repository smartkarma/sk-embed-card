'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

var add = (
  function() {
    console.log(am4core);
  }
);

console.log(Curry._1(add, /* () */0));

function PriceChart(Props) {
  return React.createElement("div", undefined, "Test");
}

var make = PriceChart;

exports.add = add;
exports.make = make;
/* add Not a pure module */
