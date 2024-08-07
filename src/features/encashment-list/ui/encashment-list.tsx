import React from 'react';
import {EncashmentTable} from "./encashment-table";
import {useEncashmentList} from "../../../entities/encashment/hooks/use-encashment-list";

export const EncashmentList: React.FC = () => {

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
