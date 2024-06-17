import { typeReturnForm, typeTerminalConfigurationsCreateForm } from 'features/terminal-configurations-create/types/types';
import { typeAvailableModulesTerminalConfigurations } from '../../../../entities/terminals-configurations/model/state-slice';

export type typeSelectModule = {
    form: typeReturnForm<typeTerminalConfigurationsCreateForm>

}

export type typeModuleChecked = typeAvailableModulesTerminalConfigurations & {checked: boolean}
