
import { API_URLS } from 'app/config/api-urls';
import { baseApi } from 'app/api/base-api';
import { typeBundle } from 'entities-project/bundle/model/state-slice';


export const bundleApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // getBundle
        getBundle: builder.query<typeBundle, string>({
            query: (terminalToken) => ({
                url: API_URLS.BUNDLE_GET,
                method: 'GET',
              headers: { 'Authorization': `Bearer ${terminalToken}` }
            }),

        }),


    }),
});

export const { useGetBundleQuery, useLazyGetBundleQuery } = bundleApiSlice;
