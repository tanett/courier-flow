import React from 'react';
import { typeSvgCustomIcon } from 'shared/ui/svg-custom-icons/types';

export const BarcodeScanIconOutline: React.FC<typeSvgCustomIcon> = ({
        color = '#000',
        width = 24,
        height = 24
    }) => {
        return (
            <div style={ {
                color: color,
                width: width,
                height: height
            } }>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.29167 21H6.5V22H3.29167C2.0285 22 1 20.878 1 19.5V16H1.91667V19.5C1.91667 20.327 2.53358 21 3.29167 21ZM22.0833 19.5C22.0833 20.327 21.4664 21 20.7083 21H17.5V22H20.7083C21.9715 22 23 20.878 23 19.5V16H22.0833V19.5ZM20.7083 2H17.5V3H20.7083C21.4664 3 22.0833 3.673 22.0833 4.5V8H23V4.5C23 3.122 21.9715 2 20.7083 2ZM1 4.5V8H1.91667V4.5C1.91667 3.673 2.53358 3 3.29167 3H6.5V2H3.29167C2.0285 2 1 3.122 1 4.5ZM4.66667 6V18H5.58333V6H4.66667ZM13.8333 18H14.75V6H13.8333V18ZM7.41667 18H9.25V6H7.41667V18ZM10.1667 18H12V6H10.1667V18ZM19.3333 6H17.5V18H19.3333V6ZM15.6667 18H16.5833V6H15.6667V18Z"
                    />
                </svg>

            </div>
        );

    }
;
