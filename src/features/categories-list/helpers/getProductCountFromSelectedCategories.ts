import { typeCategoryWithCheckBox } from 'features/categories-list/types/types';

export const getProductCountFromSelectedCategories=(list: typeCategoryWithCheckBox[])=>{

    return list.reduce((prev, curr)=>{
        return curr.checked ? prev + curr.productsCount : prev
    }, 0)

}
