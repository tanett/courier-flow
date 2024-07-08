import { Flex, Modal as MantineModal, useMantineTheme } from '@mantine/core';
import React from 'react';
import { typeModalExtensions, typeModalProps } from '../../types/types';
import { useStyles } from './styles';
import { Body } from '../modal-body/modal-body';
import { Header } from '../modal-header/modal-header';
import ErrorBoundary from 'shared/error-boundary/ErrorBoundary';

// eslint-disable-next-line react/prop-types
const Modal: typeModalExtensions & React.FC<typeModalProps> = ({ modalWidth = 'auto', opened, onCloseByOverlay, centered, fixedButton,children, }) => {

    const theme = useMantineTheme();

    const { classes } = useStyles();

    let widthClass = '';
    if (modalWidth) widthClass = classes[modalWidth];


    return (
        <MantineModal.Root
            className={ classes.popup }
            opened={ opened }
            size="auto"
            padding={ 0 }
            transitionProps={ {
                transition: 'fade',
                duration: 300,
                timingFunction: 'linear'
            } }
            closeOnClickOutside={ !!onCloseByOverlay }
            onClose={ onCloseByOverlay ?? console.log }
            centered={ centered }
        >
            {fixedButton}
            <MantineModal.Overlay opacity={ 0.4 } color={ theme.colors.gray[3] }/>
            <MantineModal.Content className={ widthClass } sx={ {
                '&.mantine-Modal-content': {
                    marginTop: centered ? undefined : `calc(140px - 5dvh)`,
                    position: 'relative'
                }
            } }>

                    <MantineModal.Body>
                        <ErrorBoundary>
                            <Flex className={ classes.content }>
                                { children }
                            </Flex>
                        </ErrorBoundary>
                    </MantineModal.Body>

            </MantineModal.Content>
        </MantineModal.Root>
    );


};

Modal.Body = Body;
Modal.Header = Header;

export { Modal };
