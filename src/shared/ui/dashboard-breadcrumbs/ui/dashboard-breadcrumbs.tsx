import React from 'react';
import { typeDashboardBreadcrumbsProps } from '../types/types';
import { Flex } from '@mantine/core';
import { useStyles } from './styles';
import { BreadcrumbItem } from './breadcrumb-item';
import { BreadcrumbSeparator } from './breadcrumb-separator';

export const DashboardBreadcrumbs: React.FC<typeDashboardBreadcrumbsProps> = ({ dataList }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.breadCrumbsWrapper}>
            {dataList
                .map((item, index, arr) => {

                    return (
                        index + 1 === arr.length
                            ? <BreadcrumbItem key={item.name + index} name={item.name} path={item.path} isActive={true}/>
                            : <React.Fragment key={item.name + index } >
                                <BreadcrumbItem name={item.name} path={item.path}/>
                                <BreadcrumbSeparator/>
                            </React.Fragment>
                    );

                })
            }
        </Flex>
    );

};
