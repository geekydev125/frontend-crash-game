import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { store } from "./app/store";
import getLibrary from "./utils/getLibrary";
// TODO import * as serviceWorker from './serviceWorker';
import Web3ReactManager from "./components/Web3ReactManager";

ReactDOM.render(
    (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                <Web3ReactManager>
                    <App />
                </Web3ReactManager>
            </Provider>
        </Web3ReactProvider>
    ),
    document.getElementById('root'),
);

//TODO serviceWorker.register();
