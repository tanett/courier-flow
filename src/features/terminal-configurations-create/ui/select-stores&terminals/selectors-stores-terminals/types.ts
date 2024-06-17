import React from 'react';
import { typeStoreWithLinkedConfiguration } from '../../../../../entities/stores/model/types';
import { TransProps } from '@lingui/react';
import { typeTerminalWithLinkedConfiguration } from '../../../../../entities/terminals/model/types';
import { typeReturnForm, typeTerminalConfigurationsCreateForm } from 'features/terminal-configurations-create/types/types';

export type typeSelectorForItems = {
    form: typeReturnForm<typeTerminalConfigurationsCreateForm>
    label: React.ReactElement<TransProps>
}


export type typeStoreListChecked = typeStoreWithLinkedConfiguration & { checked: boolean }

export type typeTerminalsListChecked = typeTerminalWithLinkedConfiguration & { checked: boolean }

