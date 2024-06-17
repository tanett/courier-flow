import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeAvailableModulesTerminalConfigurations, typeCreateTerminalConfigurations, typeEditTerminalConfigurations, typeTerminalConfigurations } from '../model/state-slice';
import { tagTypesTerminalConfigurationsList, typeSearchFilterTerminalConfigurations, typeSearchTerminalConfigurationsSortingNames } from './types';

export const terminalConfigurationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search product
        searchTerminalConfigurations: builder.query<typeSearchResponse<typeTerminalConfigurations>, typeSearchRequest<typeSearchFilterTerminalConfigurations, typeSearchTerminalConfigurationsSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.TERMINAL_CONFIGURATIONS_LIST_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeTerminalConfigurations) => ({
                        type: tagTypesTerminalConfigurationsList.terminalConfigurationsList.type,
                        id: item.id.toString()
                    })),
                    tagTypesTerminalConfigurationsList.terminalConfigurationsList
                ]
                : [ tagTypesTerminalConfigurationsList.terminalConfigurationsList ],
        }),

        // get by id
        getTerminalConfigurationById: builder.query<typeTerminalConfigurations, string>({
            query: (id) => (
                {
                    url: API_URLS.TERMINAL_CONFIGURATIONS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),
        // delete
        deleteTerminalConfigurationById: builder.mutation<typeTerminalConfigurations, string>({
            query: (id) => (
                {
                    url: API_URLS.TERMINAL_CONFIGURATIONS_DELETE.replace('{id}', id),
                    method: 'DELETE',
                    headers: protectedRoutsAPIHeaderCreator(),
                }

            ),
            invalidatesTags: [ tagTypesTerminalConfigurationsList.terminalConfigurationsList ],
        }),
        // create configuration
        createTerminalConfiguration: builder.mutation<typeTerminalConfigurations, typeCreateTerminalConfigurations>({
            query: (data) => (
                {
                    url: API_URLS.TERMINAL_CONFIGURATIONS_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesTerminalConfigurationsList.terminalConfigurationsList ],
        }),

        // patch Product
        patchTerminalConfiguration: builder.mutation<typeTerminalConfigurations, typeEditTerminalConfigurations>({
            query: (data) => (
                {
                    url: API_URLS.TERMINAL_CONFIGURATIONS_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesTerminalConfigurationsList.terminalConfigurationsList ],
        }),

        // get available modules
        getAvailableModules: builder.query<typeAvailableModulesTerminalConfigurations[], undefined>({
            query: () => (
                {
                    url: API_URLS.TERMINAL_CONFIGURATIONS_GET_AVAILABLE_MODULES,
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

    }),
});

export const {
    useSearchTerminalConfigurationsQuery,
    useLazySearchTerminalConfigurationsQuery,
    useLazyGetTerminalConfigurationByIdQuery,
    useCreateTerminalConfigurationMutation,
    useGetAvailableModulesQuery,
    useDeleteTerminalConfigurationByIdMutation,
    usePatchTerminalConfigurationMutation
} = terminalConfigurationsApi;
