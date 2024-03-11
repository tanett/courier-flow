import { Button, Flex, Modal, SimpleGrid, useMantineTheme } from '@mantine/core';
import React from 'react';
import { typeDialog } from './types';
import { useStyles } from './styles';
import cn from 'classnames';

export const Dialog: React.FC<typeDialog> = ({ icon = 'attention', opened, withCloseButton, cancelButton, confirmButton, onClose, children }) => {

    const theme = useMantineTheme();

    const { classes } = useStyles();

    return (
        <Modal
            className={classes.popup}
            opened={opened}
            size="auto"
            withCloseButton={withCloseButton}
            overlayProps={{
                opacity: 0.4,
                color: theme.colors.gray[ 3 ],
            }}
            padding={0}
            transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
            onClose={onClose ?? console.log}
        >
            <Flex className={classes.popupContentWrapper}>
                {icon && <Flex className={classes.iconWrapper}>
                    {icon === 'attention' && <svg className={classes.iconAttention} viewBox="0 0 112 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" opacity="0.12"
                            d="M48.1713 7.51049L4.21232 83.4651C3.41827 84.8367 3.00015 86.3927 3 87.9767C2.99985 89.5606 3.41768 91.1167 4.21148 92.4885C5.00528 93.8602 6.14708 94.9994 7.52208 95.7913C8.89709 96.5833 10.4568 97.0001 12.0445 97H99.9555C101.543 97.0001 103.103 96.5833 104.478 95.7913C105.853 94.9994 106.995 93.8602 107.789 92.4885C108.582 91.1167 109 89.5606 109 87.9767C109 86.3927 108.582 84.8367 107.788 83.4651L63.8334 7.51049C63.0397 6.13913 61.8982 5.00033 60.5236 4.20858C59.149 3.41682 57.5896 3 56.0024 3C54.4151 3 52.8558 3.41682 51.4811 4.20858C50.1065 5.00033 48.965 6.13913 48.1713 7.51049Z"
                            fill="#FBBF24"/>
                        <path id="Vector_2" d="M56.5 78C58.433 78 60 76.433 60 74.5C60 72.567 58.433 71 56.5 71C54.567 71 53 72.567 53 74.5C53 76.433 54.567 78 56.5 78Z" fill="#FBBF24"/>
                        <rect id="Rectangle 15" x="53" y="32" width="7" height="36" rx="3.5" fill="#FBBF24"/>
                    </svg>}
                </Flex>}
                <Flex className={classes.contentWrapper}>
                    {children}
                </Flex>
                <SimpleGrid cols={2} className={classes.buttonWrapper}>
                    {cancelButton && <Button variant="outline" className={cn(classes.button, classes.secondary)} onClick={cancelButton.handler}>{cancelButton.title}</Button>}
                    {confirmButton && <Button className={cn(classes.button, classes.primary)} onClick={confirmButton.handler}>{confirmButton.title}</Button>}
                </SimpleGrid>
            </Flex>
        </Modal>
    );

};
