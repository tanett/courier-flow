
import { API_URLS } from 'app/config/api-urls';
import { baseApi } from 'app/api/base-api';
import { typeBundle } from 'entities-project/bundle/model/state-slice';
import { createBaseUrl } from 'app/utils/create-base-url';


export const bundleApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // getBundle
        getBundle: builder.query<typeBundle, string>({
            query: (terminalToken) => ({
                url: createBaseUrl() + API_URLS.BUNDLE_GET,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${terminalToken}` },
            }),

        }),


    }),
});

export const { useGetBundleQuery, useLazyGetBundleQuery } = bundleApiSlice;
