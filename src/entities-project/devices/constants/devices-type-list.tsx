import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { deviceType } from '../model/types';
import {type typeItemSelect } from 'features/devices-list-filter/types/types';

export const getTranslatedValueForDevicesType = (type: deviceType) => {

    switch (type) {

    case deviceType.MOBILE_PHONE :return i18n._(t`Mobile phone`);
    case deviceType.POS_TERMINAL :return i18n._(t`POS terminal`);
    case deviceType.COMPUTER :return i18n._(t`Desktop`);
    case deviceType.TABLET :return i18n._(t`Tablet`);
    default :return type;

    }

};

export const devicesTypeList: typeItemSelect[] = [
    { label: getTranslatedValueForDevicesType(deviceType.POS_TERMINAL), value: deviceType.POS_TERMINAL },
    { label: getTranslatedValueForDevicesType(deviceType.MOBILE_PHONE), value: deviceType.MOBILE_PHONE },
    { label: getTranslatedValueForDevicesType(deviceType.COMPUTER), value: deviceType.COMPUTER },
    { label: getTranslatedValueForDevicesType(deviceType.TABLET), value: deviceType.TABLET }
];
