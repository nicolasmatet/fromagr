import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import '../public/manifest.json';
import ToggleColorMode from './App';
import "../public/favicon/apple-icon-60x60.png"
import "../public/favicon/apple-icon-57x57.png"
import "../public/favicon/apple-icon-72x72.png"
import "../public/favicon/apple-icon-76x76.png"
import "../public/favicon/apple-icon-114x114.png"
import "../public/favicon/apple-icon-120x120.png"
import "../public/favicon/apple-icon-144x144.png"
import "../public/favicon/apple-icon-152x152.png"
import "../public/favicon/apple-icon-180x180.png"
import "../public/favicon/android-icon-36x36.png"
import "../public/favicon/android-icon-48x48.png"
import "../public/favicon/android-icon-72x72.png"
import "../public/favicon/android-icon-96x96.png"
import "../public/favicon/android-icon-144x144.png"
import "../public/favicon/android-icon-192x192.png"
import "../public/favicon/favicon-32x32.png"
import "../public/favicon/favicon-96x96.png"
import "../public/favicon/favicon-16x16.png"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3jlAsFChq-fj2vpVxYdr5j6rO4v-aSy0",
  authDomain: "fromagr-67c78.firebaseapp.com",
  projectId: "fromagr-67c78",
  storageBucket: "fromagr-67c78.appspot.com",
  messagingSenderId: "927232993623",
  appId: "1:927232993623:web:c45976051c4ec8e6fcf612",
  measurementId: "G-HBXQBXWKPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <BrowserRouter>
    <ToggleColorMode/>
  </BrowserRouter>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
