export interface typeDashboardBreadcrumbsItem {
    name: string
    path?: string
}

export type typeBreadcrumbsItemProps = typeDashboardBreadcrumbsItem & {isActive?: boolean}

export interface typeDashboardBreadcrumbsProps {
    dataList: typeDashboardBreadcrumbsItem[]
}
