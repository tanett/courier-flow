export interface typeFilterButtonPanelProps {
    label?: string
    value: null | boolean | number | string
    onChange: (newValue: null | boolean | number | string) => void
    data: {value: null | boolean | number | string, label: string}[]
}
