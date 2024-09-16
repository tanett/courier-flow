import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeMerchantCurrency } from 'entities-project/merchant-currency/model/state-slice/types';
import { typeSearchFilterMerchantCurrency, typeSearchMerchantCurrencySortingNames } from './types';

export const merchantCurrencyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // get base currency
        getBaseCurrency: builder.query<string, undefined>({
            query: () => (
                {
                    url: API_URLS.MERCHANT_BASE_CURRENCY,
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        // Search merchant currency
        searchMerchantCurrency: builder.query<typeSearchResponse<typeMerchantCurrency>, typeSearchRequest<typeSearchFilterMerchantCurrency, typeSearchMerchantCurrencySortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.MERCHANT_CURRENCY_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),


        // get  merchant currency by id
        getMerchantCurrencyById: builder.query<typeMerchantCurrency, string>({
            query: (id) => (
                {
                    url: API_URLS.MERCHANT_CURRENCY_BY_ID.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),


    }),
});

export const {
    useSearchMerchantCurrencyQuery,
    useGetMerchantCurrencyByIdQuery,
    useGetBaseCurrencyQuery,
    useLazyGetBaseCurrencyQuery,
} = merchantCurrencyApi;
