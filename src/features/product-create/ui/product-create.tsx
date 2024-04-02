import React from 'react';
import { useSelectorT } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { ProductFormCreate } from 'features/product-create/ui/product-form-create';


export const ProductCreate: React.FC = () => {

    const additionalFields = useSelectorT(state => state.products.additionalFieldInfo);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);


    return (
        (additionalFields && currentUser) ?
            <ProductFormCreate additionalFields={additionalFields} currentUser={currentUser}/>
            : <LoaderOverlay/>
    );

};
