import { baseApi } from '../../../app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from '../../../app/api/types';
import { API_URLS } from '../../../app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeTerminal, typeTerminalExtended } from '../model/types';
import { typeCreateTerminalRequest, typeEditTerminalRequest, typeSearchTerminalsExtendedFilter, typeSearchTerminalsFilter, typeSearchTerminalSortingNames } from './types';


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
        }),

        // archive terminals
        archiveTerminals: builder.mutation<unknown, string[]>({
            query: (data) => (
                {
                    url: API_URLS.TERMINAL_ARCHIVE,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // create terminal
        createTerminal: builder.mutation<typeTerminal, typeCreateTerminalRequest>({
            query: (data) => (
                {
                    url: API_URLS.TERMINAL_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // patch terminal
        patchTerminal: builder.mutation<typeTerminal, typeEditTerminalRequest>({
            query: (data) => (
                {
                    url: API_URLS.TERMINAL_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
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
    useArchiveTerminalsMutation,
    useCreateTerminalMutation,
    usePatchTerminalMutation,
    useGetTerminalByIdQuery,
    useSearchTerminalsExtendedQuery,
    useLazySearchTerminalsExtendedQuery,
} = terminalsApi;
