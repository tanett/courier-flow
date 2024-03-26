import { t } from '@lingui/macro';
import { PRODUCT_UNIT_VALUE } from '../model/state-slice';

export const productUnitValueListForSelector = [
    {label: t`${PRODUCT_UNIT_VALUE.KILOGRAM}` , value: PRODUCT_UNIT_VALUE.KILOGRAM},
    {label:t`${ PRODUCT_UNIT_VALUE.GRAM}`, value: PRODUCT_UNIT_VALUE.GRAM},
    {label:t`${ PRODUCT_UNIT_VALUE.PIECE}`, value: PRODUCT_UNIT_VALUE.PIECE},
    {label:t`${ PRODUCT_UNIT_VALUE.LITRE}`, value: PRODUCT_UNIT_VALUE.LITRE},
    {label:t`${ PRODUCT_UNIT_VALUE.MILLILITRE}`, value: PRODUCT_UNIT_VALUE.MILLILITRE},
]
