import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeWorkingShifts } from '../model/types';
import { tagTypesWorkingShiftsList, typeSearchFilterWorkingShifts, typeSearchWorkingShiftsSortingNames } from './types';

export const workingShiftsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        // Search workingShifts
        searchWorkingShifts: builder.query<typeSearchResponse<typeWorkingShifts>, typeSearchRequest<typeSearchFilterWorkingShifts, typeSearchWorkingShiftsSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.WORKING_SHIFTS_SEARCH,
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
                    ...result.content.map((item: typeWorkingShifts) => ({
                        type: tagTypesWorkingShiftsList.workingShiftsList.type,
                        id: item.id.toString()
                    })),
                    tagTypesWorkingShiftsList.workingShiftsList
                ]
                : [ tagTypesWorkingShiftsList.workingShiftsList ],
        }),


        // get  by id
        getWorkingShiftsById: builder.query<typeWorkingShifts, string>({
            query: (id) => (
                {
                    url: API_URLS.WORKING_SHIFTS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),


    }),
});

export const {
    useGetWorkingShiftsByIdQuery,
    useLazyGetWorkingShiftsByIdQuery,
    useLazySearchWorkingShiftsQuery,
    useSearchWorkingShiftsQuery,
} = workingShiftsApi;
