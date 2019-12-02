'use strict';

var React = require("react");
var Entity$ReasonReactExamples = require("../Model/Entity.bs.js");
var JsonApi$ReasonReactExamples = require("../Decode/JsonApi.bs.js");
var LoadData$ReasonReactExamples = require("../LoadData/LoadData.bs.js");
var PriceChart$ReasonReactExamples = require("../PriceChart/PriceChart.bs.js");

function fetchEntity(id, param) {
  return JsonApi$ReasonReactExamples.query("entity", id, Entity$ReasonReactExamples.decodeRecord);
}

function EntityCard(Props) {
  var id = Props.id;
  return React.createElement(React.Fragment, undefined, React.createElement(LoadData$ReasonReactExamples.Entity.make, {
                  fetch: (function (param) {
                      return JsonApi$ReasonReactExamples.query("entity", id, Entity$ReasonReactExamples.decodeRecord);
                    }),
                  children: (function (entity) {
                      return React.createElement(PriceChart$ReasonReactExamples.make, {
                                  entity: entity
                                });
                    })
                }));
}

var make = EntityCard;

exports.fetchEntity = fetchEntity;
exports.make = make;
/* react Not a pure module */
