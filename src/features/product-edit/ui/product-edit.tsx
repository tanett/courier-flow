import React from 'react';
import { useSelectorT } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { ProductFormEdit } from 'features/product-edit/ui/product-form-edit';
import { useParams } from 'react-router-dom';


export const ProductEdit: React.FC = () => {

    const additionalFields = useSelectorT(state => state.products.additionalFieldInfo);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    return (
        (additionalFields && currentUser) ?
            <ProductFormEdit additionalFields={additionalFields} currentUser={currentUser}/>
            : <LoaderOverlay/>
    );

};
