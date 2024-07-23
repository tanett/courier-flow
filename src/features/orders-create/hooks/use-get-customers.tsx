import { typeOrdersCustomer } from '../../../entities/orders-customer/model/types';
import { useEffect, useState } from 'react';
import { useLazySearchOrdersCustomerQuery } from '../../../entities/orders-customer/api/api';
import { AsYouType, getExampleNumber, isValidPhoneNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import { useSelectorT } from 'app/state';

export const useGetCustomers = (phone: string) => {

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const [ customers, setCustomers ] = useState<typeOrdersCustomer[] | null>(null);

    const [ getCustomers, { isFetching } ] = useLazySearchOrdersCustomerQuery();

    const getData = async (phoneNumber: string) => {
        if(currentUser?.actor) {
            try {
                const resp = await getCustomers({
                    filter: {
                        searchText: phoneNumber,
                        merchantIds: [currentUser.actor.merchantId],
                        archived: false
                    },
                    pagination: {
                        pageNumber: 0,
                        pageSize: 10
                    }
                }).unwrap();

                setCustomers(resp.content);

            } catch (err) {
                console.log('customers',err);
            }
        }
    }

    useEffect(() => {
        if (phone.length > 6) {
            console.log('phone.length > 6',phone.length > 6);
            const asYouType = new AsYouType();
            asYouType.input(phone);
            let parsedCountry = asYouType.getCountry();

            if (!parsedCountry) {

                if (asYouType.getCallingCode() === '1') parsedCountry = 'US';
                if (asYouType.getCallingCode() === '7') parsedCountry = 'RU';

            }

            const phoneNumber = getExampleNumber(parsedCountry!, examples);
            if (phone.length >= phoneNumber!.number?.length -2){
                console.log('phone.length - 2 >= phoneNumber!.number?.length',phone.length - 2 >= phoneNumber!.number?.length);
                getData(phone).then()
            }
        }

    }, [ phone ]);


    return {
        customers,
        isFetchingCustomers: isFetching,
    };
};
