import { typeUserSettings } from 'app/api/types';
import { getSystemLanguage } from 'app/providers/with-locales/with-locales';

export const getLocaleForProfile = (userSettings: typeUserSettings | undefined) => {

    if (userSettings && userSettings.locale){

        return userSettings.locale;

    } else {

        return getSystemLanguage();

    }

};
