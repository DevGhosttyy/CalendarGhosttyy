import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: { translation: { newEvent: 'Nuevo evento', save: 'Guardar', cancel: 'Cancelar' } },
  en: { translation: { newEvent: 'New event', save: 'Save', cancel: 'Cancel' } }
};

i18n.use(initReactI18next).init({
  resources, lng: 'es', fallbackLng: 'en', interpolation: { escapeValue: false }
});
export default i18n;
