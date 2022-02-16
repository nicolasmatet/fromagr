import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "name": "nom",
            "lait": "milk",
            "couleur": "color"

        }
    },
    fr: {
        translation: {
            "name": "nom",
            "lait": "lait",
            "couleur": "couleur"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "fr",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
