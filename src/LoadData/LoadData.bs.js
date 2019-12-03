'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var RemoteData = require("remotedata-re/src/RemoteData.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function MakeLoadData(DataType) {
  var fetchData = function ($$fetch, dispatch) {
    Curry._1(dispatch, /* Loading */0);
    Curry._1($$fetch, /* () */0).then((function (data) {
              Curry._1(dispatch, /* DataLoaded */Block.__(0, [data]));
              return Promise.resolve(/* () */0);
            })).catch((function (e) {
            console.log(e);
            Curry._1(dispatch, /* DataError */Block.__(1, ["Error fetching the data"]));
            return Promise.resolve(/* () */0);
          }));
    return /* () */0;
  };
  var initialState = /* record */[/* data : NotAsked */0];
  var reducer = function (state, action) {
    if (typeof action === "number") {
      return /* record */[/* data : Loading */Block.__(0, [undefined])];
    } else if (action.tag) {
      return /* record */[/* data : Failure */Block.__(1, [action[0]])];
    } else {
      return /* record */[/* data : Success */Block.__(2, [Caml_option.some(action[0])])];
    }
  };
  var LoadData$MakeLoadData = function (Props) {
    var $$fetch = Props.fetch;
    var children = Props.children;
    var match = React.useReducer(reducer, initialState);
    var dispatch = match[1];
    var state = match[0];
    React.useEffect((function () {
            var match = state[/* data */0];
            if (typeof match === "number") {
              fetchData($$fetch, dispatch);
            }
            return ;
          }));
    var match$1 = state[/* data */0];
    var tmp;
    var exit = 0;
    if (typeof match$1 === "number") {
      tmp = null;
    } else {
      switch (match$1.tag | 0) {
        case /* Failure */1 :
            tmp = React.createElement(React.Fragment, undefined, match$1[0]);
            break;
        case /* Loading */0 :
        case /* Success */2 :
            exit = 1;
            break;
        
      }
    }
    if (exit === 1) {
      var data = match$1[0];
      var isLoading = RemoteData.isLoading(state[/* data */0]);
      tmp = React.createElement(React.Fragment, undefined, isLoading ? React.createElement(React.Fragment, undefined, "Loading...") : (
              data !== undefined ? Curry._1(children, Caml_option.valFromOption(data)) : null
            ));
    }
    return React.createElement(React.Fragment, undefined, tmp);
  };
  return {
          fetchData: fetchData,
          initialState: initialState,
          reducer: reducer,
          make: LoadData$MakeLoadData
        };
}

var EntityDataType = { };

function fetchData($$fetch, dispatch) {
  Curry._1(dispatch, /* Loading */0);
  Curry._1($$fetch, /* () */0).then((function (data) {
            Curry._1(dispatch, /* DataLoaded */Block.__(0, [data]));
            return Promise.resolve(/* () */0);
          })).catch((function (e) {
          console.log(e);
          Curry._1(dispatch, /* DataError */Block.__(1, ["Error fetching the data"]));
          return Promise.resolve(/* () */0);
        }));
  return /* () */0;
}

var initialState = /* record */[/* data : NotAsked */0];

function reducer(state, action) {
  if (typeof action === "number") {
    return /* record */[/* data : Loading */Block.__(0, [undefined])];
  } else if (action.tag) {
    return /* record */[/* data : Failure */Block.__(1, [action[0]])];
  } else {
    return /* record */[/* data : Success */Block.__(2, [Caml_option.some(action[0])])];
  }
}

function LoadData$MakeLoadData(Props) {
  var $$fetch = Props.fetch;
  var children = Props.children;
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          var match = state[/* data */0];
          if (typeof match === "number") {
            fetchData($$fetch, dispatch);
          }
          return ;
        }));
  var match$1 = state[/* data */0];
  var tmp;
  var exit = 0;
  if (typeof match$1 === "number") {
    tmp = null;
  } else {
    switch (match$1.tag | 0) {
      case /* Failure */1 :
          tmp = React.createElement(React.Fragment, undefined, match$1[0]);
          break;
      case /* Loading */0 :
      case /* Success */2 :
          exit = 1;
          break;
      
    }
  }
  if (exit === 1) {
    var data = match$1[0];
    var isLoading = RemoteData.isLoading(state[/* data */0]);
    tmp = React.createElement(React.Fragment, undefined, isLoading ? React.createElement(React.Fragment, undefined, "Loading...") : (
            data !== undefined ? Curry._1(children, Caml_option.valFromOption(data)) : null
          ));
  }
  return React.createElement(React.Fragment, undefined, tmp);
}

var Entity = {
  fetchData: fetchData,
  initialState: initialState,
  reducer: reducer,
  make: LoadData$MakeLoadData
};

var PriceDataType = { };

function fetchData$1($$fetch, dispatch) {
  Curry._1(dispatch, /* Loading */0);
  Curry._1($$fetch, /* () */0).then((function (data) {
            Curry._1(dispatch, /* DataLoaded */Block.__(0, [data]));
            return Promise.resolve(/* () */0);
          })).catch((function (e) {
          console.log(e);
          Curry._1(dispatch, /* DataError */Block.__(1, ["Error fetching the data"]));
          return Promise.resolve(/* () */0);
        }));
  return /* () */0;
}

var initialState$1 = /* record */[/* data : NotAsked */0];

function reducer$1(state, action) {
  if (typeof action === "number") {
    return /* record */[/* data : Loading */Block.__(0, [undefined])];
  } else if (action.tag) {
    return /* record */[/* data : Failure */Block.__(1, [action[0]])];
  } else {
    return /* record */[/* data : Success */Block.__(2, [Caml_option.some(action[0])])];
  }
}

function LoadData$MakeLoadData$1(Props) {
  var $$fetch = Props.fetch;
  var children = Props.children;
  var match = React.useReducer(reducer$1, initialState$1);
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          var match = state[/* data */0];
          if (typeof match === "number") {
            fetchData$1($$fetch, dispatch);
          }
          return ;
        }));
  var match$1 = state[/* data */0];
  var tmp;
  var exit = 0;
  if (typeof match$1 === "number") {
    tmp = null;
  } else {
    switch (match$1.tag | 0) {
      case /* Failure */1 :
          tmp = React.createElement(React.Fragment, undefined, match$1[0]);
          break;
      case /* Loading */0 :
      case /* Success */2 :
          exit = 1;
          break;
      
    }
  }
  if (exit === 1) {
    var data = match$1[0];
    var isLoading = RemoteData.isLoading(state[/* data */0]);
    tmp = React.createElement(React.Fragment, undefined, isLoading ? React.createElement(React.Fragment, undefined, "Loading...") : (
            data !== undefined ? Curry._1(children, Caml_option.valFromOption(data)) : null
          ));
  }
  return React.createElement(React.Fragment, undefined, tmp);
}

var Price = {
  fetchData: fetchData$1,
  initialState: initialState$1,
  reducer: reducer$1,
  make: LoadData$MakeLoadData$1
};

exports.MakeLoadData = MakeLoadData;
exports.EntityDataType = EntityDataType;
exports.Entity = Entity;
exports.PriceDataType = PriceDataType;
exports.Price = Price;
/* react Not a pure module */
