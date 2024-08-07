import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeEncashment, typeSearchEncashmentSortingNames, typeSearchFilterEncashment } from "../model/types";


export const encashmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search Encashment
        searchEncashment: builder.query<typeSearchResponse<typeEncashment>, typeSearchRequest<typeSearchFilterEncashment, typeSearchEncashmentSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.ENCASHMENT_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),
    }),
});

export const { useSearchEncashmentQuery } = encashmentApi;
