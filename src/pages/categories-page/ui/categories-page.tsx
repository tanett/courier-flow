import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t, Trans } from '@lingui/macro';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { addProductsPermissions } from 'app/config/permissions-config';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { CategoriesList } from 'features/categories-list';

const CategoriesPage: React.FC = () => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const isAllowAdd = useIsAllowedPermissions(addProductsPermissions)

    const onCreate = () => {

        navigate(routerPaths.products_categories_create);

    };

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Categories`) }
                ]}/>}
                rightSide={
                    isAllowAdd && <Button
                        key={'create-new-category'}
                        className={classes.button}
                        onClick={onCreate}
                        leftIcon={<IconPlus size={20}/>}><Trans>Add</Trans>
                    </Button>}
            />

           <CategoriesList/>

        </DashboardContent>
    );

};

export default CategoriesPage;
