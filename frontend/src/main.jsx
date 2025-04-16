import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducer/mainReducer";
import "./index.scss";
import "semantic-ui-css/semantic.min.css";
//para usar estillos de toatify
import "react-toastify/dist/ReactToastify.css";

const persistedState = loadFromStorage();

//it already contains the middleware
const store = configureStore({
  reducer: mainReducer,
  preloadedState: persistedState,
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function saveToSessionStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    // console.log(serializedState);k
    // sessionStorage.setItem("state", serializedState);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
    console.log("error al guardar");
  }
}
function loadFromStorage() {
  try {
    // const serializedState = sessionStorage.getItem("state");
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    console.log("load from storage");
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    console.log("error al cargar ");
  }
}

store.subscribe(() => saveToSessionStorage(store.getState()));
