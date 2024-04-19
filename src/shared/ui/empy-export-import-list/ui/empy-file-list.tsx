import React from 'react';
import { Flex } from '@mantine/core';
import { useStyles } from './styles';
import { Trans } from '@lingui/macro';

export const EmptyFileList: React.FC = () => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.wrapper}>
            <div className={classes.icon}>
                <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.12" d="M69.875 86H16.125C0 86 0 78.7814 0 69.875V16.125C0 0 7.21863 0 16.125 0H69.875C78.7814 0 86 0 86 16.125V69.875C86 78.7814 86 86 69.875 86Z" fill="#6B7280"/>
                    <path
                        d="M64.3361 43.5948L57.2357 28.2088C56.3596 26.3114 54.4461 25.0859 52.3552 25.0859H33.6502C31.5593 25.0859 29.6431 26.3114 28.7697 28.2088L21.6666 43.5948C21.5564 43.8286 21.5 44.0866 21.5 44.3446V55.5434C21.5 58.5077 23.9107 60.9184 26.875 60.9184H59.125C62.0893 60.9184 64.5 58.5077 64.5 55.5434V44.3446C64.5 44.0866 64.4436 43.8286 64.3361 43.5948ZM32.0216 29.7084C32.3118 29.0769 32.9514 28.6684 33.6475 28.6684H52.3525C53.0486 28.6684 53.6882 29.0769 53.9784 29.7084L60.114 43.0008H56.4241C55.0293 43.0008 53.8226 43.8984 53.4221 45.2341L51.5006 51.6384C51.4441 51.8293 51.2721 51.9583 51.0706 51.9583H34.9241C34.7252 51.9583 34.5532 51.8293 34.4941 51.6384L32.5725 45.2368C32.1747 43.8984 30.9681 43.0008 29.5732 43.0008H25.886L32.0216 29.7084Z"
                        fill="#6B7280"/>
                    <defs>
                        <clipPath id="clip0_5825_39494">
                            <rect width="86" height="86" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>

            </div>
            <div className={classes.text}>
                <Trans>File list is empty</Trans>
            </div>
        </Flex>
    );

};
