import ReactDOM from "react-dom";
import App from "./app";
import { React } from "react";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import Reducer from "./reducer";
import reduxPromise from "redux-promise";

const store = createStore(
    Reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elem, document.querySelector("main"));
