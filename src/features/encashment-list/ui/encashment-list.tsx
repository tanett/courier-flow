import React from 'react';
import { useLingui } from '@lingui/react';
import {EncashmentTable} from "./encashment-table";
import {useEncashmentList} from "../../../entities/encashment/hooks/use-encashment-list";

export const EncashmentList: React.FC = () => {

    const { i18n } = useLingui();

    const {
        encashmentList,
        pagination,
        isLoading,
    } = useEncashmentList();

    return (<>
        <EncashmentTable
            encashmentList={encashmentList}
            pagination={pagination}
            isLoading={isLoading}
        />

    </>);

};
