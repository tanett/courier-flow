import { baseApi } from '../../../app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from '../../../app/api/types';
import { API_URLS } from '../../../app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeTerminal, typeTerminalExtended } from '../model/types';
import { tagTypesTerminalsExtendedList, typeSearchTerminalsExtendedFilter, typeSearchTerminalsFilter, typeSearchTerminalSortingNames } from './types';



export const terminalsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search terminals
        searchTerminalList: builder.query<typeSearchResponse<typeTerminal>, typeSearchRequest<typeSearchTerminalsFilter, typeSearchTerminalSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.TERMINAL_LIST_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // Search terminals extended
        searchTerminalsExtended: builder.query<typeSearchResponse<typeTerminalExtended>, typeSearchRequest<typeSearchTerminalsExtendedFilter, typeSearchTerminalSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.TERMINAL_LIST_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeTerminalExtended) => ({ type: tagTypesTerminalsExtendedList.terminalExtendedList.type, id: item.id.toString() })),
                    tagTypesTerminalsExtendedList.terminalExtendedList
                ]
                : [ tagTypesTerminalsExtendedList.terminalExtendedList ],
        }),

        // get terminal by id
        getTerminalById: builder.query<typeTerminal, string>({
            query: (id) => (
                {
                    url: API_URLS.TERMINAL_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),
    }),
});

export const {
    useSearchTerminalListQuery,
    useLazySearchTerminalListQuery,
    useGetTerminalByIdQuery,
    useSearchTerminalsExtendedQuery,
    useLazySearchTerminalsExtendedQuery,
} = terminalsApi;
