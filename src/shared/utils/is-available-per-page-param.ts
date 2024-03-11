import { perPageVariants } from '../../app/config/api-constants';

export const isAvailablePerPageParam = (count: number) => {

    return Object.values(perPageVariants).includes(count);

};
