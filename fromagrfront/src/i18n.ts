import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {

            "name": "nom",
            "lait": {
                "vache": "cow milk",
                "brebis": "sheep milk",
                "chevre": "goat milk"
            },
            "couleur": {
                "rouge": "red wine",
                "rosé": "pink wine",
                "blanc": "white wine"
            }

        }
    },
    fr: {
        translation: {
            "name": "nom",
            "lait": {
                "vache": "lait de vache",
                "brebis": "lait de brebis",
                "chevre": "lait de chèvre"
            },
            "couleur": {
                "rouge": "vin rouge",
                "rosé": "vin rosé",
                "blanc": "vin blanc"
            }
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
