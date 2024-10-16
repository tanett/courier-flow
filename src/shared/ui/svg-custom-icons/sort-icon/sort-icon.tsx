import React from 'react';
import { typeSvgCustomIcon } from 'shared/ui/svg-custom-icons/types';

export const SortIcon: React.FC<typeSvgCustomIcon & {color1: string, color2: string}> = ({
    color1 = '#000',
    color2 = '#000',
    width = 11,
    height = 24
}) => {
    return (
        <div style={ {
            color: color1,
            width: width,
            height: height
        } }>
            <svg width="11" height="22" viewBox="0 0 11 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.46854 12.9375H1.53146C1.2934 12.9375 1.16047 13.1889 1.3079 13.3605L5.27644 17.9622C5.39003 18.0939 5.60876 18.0939 5.72356 17.9622L9.6921 13.3605C9.83953 13.1889 9.7066 12.9375 9.46854 12.9375Z" fill={color1}
                      />
                <path d="M9.6921 9.63806L5.72356 5.03629C5.60997 4.90457 5.39124 4.90457 5.27644 5.03629L1.3079 9.63806C1.16047 9.80965 1.2934 10.061 1.53146 10.061H9.46854C9.7066 10.061 9.83953 9.80965 9.6921 9.63806Z" fill={color2} />
            </svg>
        </div>
    );

};
