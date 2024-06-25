import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeCredit } from '../model/types';
import { tagTypesCreditsList, typeSearchCreditsSortingNames, typeSearchFilterCredits, } from './types';


export const creditsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search credit
        searchCredits: builder.query<typeSearchResponse<typeCredit>, typeSearchRequest<typeSearchFilterCredits, typeSearchCreditsSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.CREDITS_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeCredit) => ({
                        type: tagTypesCreditsList.creditsList.type,
                        id: item.id.toString()
                    })),
                    tagTypesCreditsList.creditsList
                ]
                : [ tagTypesCreditsList.creditsList ],
        }),

        //get by id full
        getCreditById: builder.query<typeCredit, string>({
            query: (id) => (
                {
                    url: API_URLS.CREDITS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

    }),
});

export const {
  useSearchCreditsQuery,
    useLazySearchCreditsQuery,
    useGetCreditByIdQuery,
    useLazyGetCreditByIdQuery,

} = creditsApi;
