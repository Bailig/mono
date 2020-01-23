// import React from "react";
// import ReactDOM from "react-dom";
// import { App } from "./app";

// ReactDOM.render(<div />, document.querySelector("#root"));

import * as R from "ramda";

console.log(R.add(1, 2));

function logA(a): void {
  a = "aaaa";
  console.log(a);
}

logA("bbbb");
