import React from 'react';
import { typeDialogProps } from './types';
import { Button, Flex, ScrollArea, SimpleGrid } from '@mantine/core';
import cn from 'classnames';
import { useStyles } from './styles';

export const Dialog: React.FC<typeDialogProps> = ({ children, icon = 'attention', withMarginTopFat, withScroll, withoutPadding, confirmButton, cancelButton }) => {

    const { classes } = useStyles();

    return (
        <Flex className={cn(classes.dialogWrapper, { [ classes.withoutPadding ]: withoutPadding, [ classes.withMarginTopFat ]: withMarginTopFat })}>
            <ScrollArea h={withScroll ? '40vh' : undefined} type="auto">
                {icon !== 'none' && <Flex className={classes.iconWrapper}>
                    {icon === 'attention' && <svg className={classes.iconAttention} viewBox="0 0 112 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" opacity="0.12"
                            d="M48.1713 7.51049L4.21232 83.4651C3.41827 84.8367 3.00015 86.3927 3 87.9767C2.99985 89.5606 3.41768 91.1167 4.21148 92.4885C5.00528 93.8602 6.14708 94.9994 7.52208 95.7913C8.89709 96.5833 10.4568 97.0001 12.0445 97H99.9555C101.543 97.0001 103.103 96.5833 104.478 95.7913C105.853 94.9994 106.995 93.8602 107.789 92.4885C108.582 91.1167 109 89.5606 109 87.9767C109 86.3927 108.582 84.8367 107.788 83.4651L63.8334 7.51049C63.0397 6.13913 61.8982 5.00033 60.5236 4.20858C59.149 3.41682 57.5896 3 56.0024 3C54.4151 3 52.8558 3.41682 51.4811 4.20858C50.1065 5.00033 48.965 6.13913 48.1713 7.51049Z"
                            fill="#FBBF24"/>
                        <path id="Vector_2" d="M56.5 78C58.433 78 60 76.433 60 74.5C60 72.567 58.433 71 56.5 71C54.567 71 53 72.567 53 74.5C53 76.433 54.567 78 56.5 78Z" fill="#FBBF24"/>
                        <rect id="Rectangle 15" x="53" y="32" width="7" height="36" rx="3.5" fill="#FBBF24"/>
                    </svg>}
                    {icon === 'success' && <svg className={classes.iconSuccess} viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M47 1C37.9021 1 29.0084 3.69785 21.4438 8.7524C13.8791 13.8069 7.98319 20.9912 4.50156 29.3966C1.01993 37.802 0.108978 47.051 1.8839 55.9741C3.65882 64.8973 8.03989 73.0937 14.4731 79.5269C20.9063 85.9601 29.1027 90.3412 38.0259 92.1161C46.949 93.891 56.1981 92.9801 64.6035 89.4984C73.0089 86.0168 80.1931 80.1209 85.2476 72.5562C90.3022 64.9916 93 56.0979 93 47C92.9838 34.805 88.1322 23.1141 79.5091 14.4909C70.8859 5.86777 59.195 1.01616 47 1ZM72.7025 34.3692L43.9525 63.1192C43.5995 63.4773 43.1787 63.7618 42.7148 63.9559C42.2509 64.15 41.7529 64.25 41.25 64.25C40.7471 64.25 40.2492 64.15 39.7852 63.9559C39.3213 63.7618 38.9006 63.4773 38.5475 63.1192L25.1309 49.7025C24.4141 48.9857 24.0114 48.0136 24.0114 47C24.0114 45.9864 24.4141 45.0142 25.1309 44.2975C25.8476 43.5807 26.8197 43.1781 27.8334 43.1781C28.847 43.1781 29.8191 43.5807 30.5359 44.2975L41.25 54.9925L67.2975 28.9642C68.0143 28.2474 68.9864 27.8447 70 27.8447C71.0136 27.8447 71.9858 28.2474 72.7025 28.9642C73.4193 29.6809 73.8219 30.653 73.8219 31.6667C73.8219 32.6803 73.4193 33.6524 72.7025 34.3692Z"
                            fill="#22C55E"/>
                    </svg>}
                    {icon === 'error' && <svg className={classes.iconSuccess} viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M47 0C37.7043 0 28.6173 2.7565 20.8882 7.92093C13.1591 13.0854 7.135 20.4257 3.57768 29.0139C0.0203648 37.602 -0.910392 47.0521 0.903113 56.1692C2.71662 65.2863 7.19293 73.6609 13.766 80.234C20.3391 86.8071 28.7137 91.2834 37.8308 93.0969C46.9479 94.9104 56.398 93.9796 64.9861 90.4223C73.5743 86.865 80.9146 80.8409 86.0791 73.1118C91.2435 65.3827 94 56.2957 94 47C93.9955 34.5362 89.0423 22.5842 80.2291 13.7709C71.4158 4.9577 59.4638 0.00448455 47 0ZM62.4787 58.092C62.7757 58.3749 63.0122 58.7151 63.1738 59.0922C63.3354 59.4692 63.4188 59.8751 63.4188 60.2853C63.4188 60.6955 63.3354 61.1014 63.1738 61.4785C63.0122 61.8555 62.7757 62.1958 62.4787 62.4787C62.1991 62.78 61.8595 63.0193 61.4817 63.1812C61.1039 63.3431 60.6963 63.424 60.2853 63.4187C59.8753 63.418 59.4695 63.3344 59.0926 63.1728C58.7157 63.0113 58.3753 62.7752 58.092 62.4787L47 51.3867L35.908 62.4787C35.6247 62.7752 35.2843 63.0113 34.9074 63.1728C34.5305 63.3344 34.1248 63.418 33.7147 63.4187C33.3037 63.424 32.8961 63.3431 32.5183 63.1812C32.1406 63.0193 31.8009 62.78 31.5213 62.4787C31.2243 62.1958 30.9878 61.8555 30.8262 61.4785C30.6646 61.1014 30.5813 60.6955 30.5813 60.2853C30.5813 59.8751 30.6646 59.4692 30.8262 59.0922C30.9878 58.7151 31.2243 58.3749 31.5213 58.092L42.6133 47L31.5213 35.908C30.9493 35.3243 30.6307 34.5384 30.6349 33.7211C30.639 32.9039 30.9655 32.1213 31.5434 31.5434C32.1213 30.9655 32.9039 30.639 33.7212 30.6349C34.5384 30.6307 35.3243 30.9493 35.908 31.5213L47 42.6133L58.092 31.5213C58.379 31.2285 58.7211 30.9955 59.0987 30.8357C59.4763 30.6759 59.8818 30.5926 60.2918 30.5905C60.7018 30.5885 61.1082 30.6677 61.4873 30.8236C61.8665 30.9796 62.211 31.2091 62.5009 31.4991C62.7909 31.789 63.0204 32.1335 63.1764 32.5127C63.3323 32.8918 63.4115 33.2982 63.4095 33.7082C63.4074 34.1182 63.3241 34.5237 63.1643 34.9013C63.0045 35.2789 62.7715 35.621 62.4787 35.908L51.3867 47L62.4787 58.092Z"
                            fill="#EF4444"/>
                    </svg>}
                </Flex>}
                <Flex className={classes.contentWrapper}>
                    {children}
                </Flex>
                {(cancelButton || confirmButton) && <SimpleGrid cols={2} className={classes.buttonWrapper}>
                    {(!cancelButton || !confirmButton) && <div></div>}
                    {cancelButton && <Button variant="outline" className={cn(classes.button, classes.secondary)} disabled={cancelButton.disabled} onClick={cancelButton.handler}>{cancelButton.title}</Button>}
                    {confirmButton && <Button className={cn(classes.button, classes.primary)} disabled={confirmButton.disabled} onClick={confirmButton.handler}>{confirmButton.title}</Button>}
                </SimpleGrid>}
            </ScrollArea>
        </Flex>
    );

};
