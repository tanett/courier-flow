export type typeItemListWithCounter = {
    numberVisibleItem: number,
    list: typeItem[]
}

type typeItem = {id: string | number, name: string} & Partial<Record<string, any>>
