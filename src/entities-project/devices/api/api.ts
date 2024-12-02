import { baseApi } from '../../../app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from '../../../app/api/types';
import { API_URLS } from '../../../app/config/api-urls';
import { typeDevice, typeDeviceExtended } from '../model/types';
import {
    tagTypesDevicesList,
    typeCreateDeviceRequest,
    typeEditDeviceRequest,
    typeSearchDevicesFilter,
    typeSearchDevicesSortingNames,
} from './types';
import { localeHeaderCreator } from 'app/utils/locale-header-creator';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { createAuthBaseUrl, createBaseUrl } from 'app/utils/create-base-url';


export const devicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search Devices extended
        searchDevices: builder.query<typeSearchResponse<typeDevice>, typeSearchRequest<typeSearchDevicesFilter, typeSearchDevicesSortingNames>>({
            query: (data) => (
                {
                    url: createBaseUrl() +API_URLS.DEVICE_LIST_SEARCH,
                    method: 'POST',
                    headers: { ...protectedRoutsAPIHeaderCreator(), ...localeHeaderCreator() },
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),

        // Search Devices extended
        searchDevicesExtended: builder.query<typeSearchResponse<typeDeviceExtended>, typeSearchRequest<typeSearchDevicesFilter, typeSearchDevicesSortingNames>>({
            query: (data) => (
                {
                    url: createBaseUrl() +API_URLS.DEVICE_LIST_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: { ...protectedRoutsAPIHeaderCreator(), ...localeHeaderCreator() },
                    body: data,
                    cache: 'no-cache',
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeDevice) => ({ type: tagTypesDevicesList.devicesList.type, id: item.id.toString() })),
                    tagTypesDevicesList.devicesList
                ]
                : [ tagTypesDevicesList.devicesList ],
        }),

        // archive Devices
        archiveDevices: builder.mutation<unknown, string[]>({
            query: (data) => (
                {
                    url: createBaseUrl() +API_URLS.DEVICE_ARCHIVE,
                    method: 'PATCH',
                    headers: { ...protectedRoutsAPIHeaderCreator(), ...localeHeaderCreator() },
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesDevicesList.devicesList ],
        }),

        // create Device
        createDevice: builder.mutation<typeDevice, typeCreateDeviceRequest>({
            query: (data) => (
                {
                    url: createBaseUrl() +API_URLS.DEVICE_CREATE,
                    method: 'POST',
                    headers: { ...protectedRoutsAPIHeaderCreator(), ...localeHeaderCreator() },
                    body: data,
                }
            ),
        }),

        // patch Device
        patchDevice: builder.mutation<typeDevice, typeEditDeviceRequest>({
            query: (data) => (
                {
                    url: createBaseUrl() +API_URLS.DEVICE_PATCH,
                    method: 'PATCH',
                    headers: { ...protectedRoutsAPIHeaderCreator(), ...localeHeaderCreator() },
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesDevicesList.devicesList ],
        }),

        // get Device by id
        getDeviceById: builder.query<typeDevice, string>({
            query: (id) => (
                {
                    url: createBaseUrl() +API_URLS.DEVICE_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

    }),
});

export const {
    useArchiveDevicesMutation,
    useCreateDeviceMutation,
    usePatchDeviceMutation,
    useGetDeviceByIdQuery,
    useLazyGetDeviceByIdQuery,
    useLazySearchDevicesQuery,
    useSearchDevicesExtendedQuery,
    useLazySearchDevicesExtendedQuery,
} = devicesApi;
