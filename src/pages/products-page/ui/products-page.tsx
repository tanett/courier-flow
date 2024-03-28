import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { ProductsList } from 'features/products-list';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { addProductsPermissions } from 'app/config/permissions-config';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { CreateButtonFilled } from 'shared/ui/create-button-filled/create-button-filled';

const ProductsPage: React.FC = () => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const isAllowAddProduct = useIsAllowedPermissions(addProductsPermissions)

    const onCreateNewProduct = () => {

        navigate(routerPaths.products_create);

    };

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Products`) }
                ]}/>}
                rightSide={
                    isAllowAddProduct && <CreateButtonFilled
                        id={'create-new-product'}
                        handler={onCreateNewProduct}
                       />}
            />

           <ProductsList/>

        </DashboardContent>
    );

};

export default ProductsPage;
