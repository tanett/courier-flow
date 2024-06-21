import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeAdvance, typeAdvanceExtended, typeAdvanceShort } from '../model/state-slice/types';
import { tagTypesShortAdvancesList, typeSearchAdvancesSortingNames, typeSearchFilterAdvances, } from './types';


export const advancesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search advances short extended
        searchAdvancesShortExtended: builder.query<typeSearchResponse<typeAdvanceExtended>, typeSearchRequest<typeSearchFilterAdvances, typeSearchAdvancesSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.ADVANCES_SHORT_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeAdvanceExtended) => ({
                        type: tagTypesShortAdvancesList.shortAdvancesList.type,
                        id: item.advanceDto.id.toString()
                    })),
                    tagTypesShortAdvancesList.shortAdvancesList
                ]
                : [ tagTypesShortAdvancesList.shortAdvancesList ],
        }),

// Search advances
        searchAdvancesShort: builder.query<typeSearchResponse<typeAdvanceShort>, typeSearchRequest<typeSearchFilterAdvances, typeSearchAdvancesSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.ADVANCES_SHORT_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),
        //get advance by id full
        getAdvanceById: builder.query<typeAdvance, string>({
            query: (id) => (
                {
                    url: API_URLS.ADVANCES_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

    }),
});

export const {
    useSearchAdvancesShortQuery,
    useLazySearchAdvancesShortQuery,
    useSearchAdvancesShortExtendedQuery,
    useLazySearchAdvancesShortExtendedQuery,
    useGetAdvanceByIdQuery,
    useLazyGetAdvanceByIdQuery
} = advancesApi;
