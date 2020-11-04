import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import {App} from './App';
import {reportWebVitals} from './reportWebVitals';
import i18next from "i18next";
import {I18nextProvider, initReactI18next} from "react-i18next";
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import resources_de from './locales/resources_de.json';
import resources_en from './locales/resources_en.json';
import {store} from "./store";


// noinspection JSIgnoredPromiseFromCall
i18next
    .use(initReactI18next)
    .init({
        resources: {
            de: resources_de,
            en: resources_en,
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });


ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
