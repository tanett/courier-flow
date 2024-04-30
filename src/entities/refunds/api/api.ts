import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { tagTypesRefundsList, typeSearchFilterRefunds, typeSearchRefundsSortingNames } from './types';
import { typeRefund } from '../model/types';


export const refundsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search refunds
        searchRefunds: builder.query<typeSearchResponse<typeRefund>, typeSearchRequest<typeSearchFilterRefunds, typeSearchRefundsSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.REFUNDS_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeRefund) => ({
                        type: tagTypesRefundsList.refundsList.type,
                        id: item.id.toString()
                    })),
                    tagTypesRefundsList.refundsList
                ]
                : [ tagTypesRefundsList.refundsList ],
        }),

        //get refund by id
        getRefundById: builder.query<typeRefund, string>({
            query: (id) => (
                {
                    url: API_URLS.REFUNDS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),


    }),
});

export const {
    useSearchRefundsQuery,
    useLazySearchRefundsQuery,
    useGetRefundByIdQuery,
    useLazyGetRefundByIdQuery
} = refundsApi;
