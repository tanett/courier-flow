import React from 'react';
import { typeSvgCustomIcon } from 'shared/ui/svg-custom-icons/types';

export const AdvanceIconOutline24: React.FC<typeSvgCustomIcon> = ({
    color = '#000',
    width = 24,
    height = 24
}) => {

    return (
        <div style={ {
            color: color,
            width: width,
            height: height,
        } }>

            <svg width={ width } height={ height } viewBox={ `'0 0 ${ width } ${ height } ` } fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_8548_61248)">
                    <path
                        d="M14.3163 5.88205L15.9608 7.09864C16.1459 7.23556 16.0523 7.53856 15.8183 7.54002L15.3022 7.54316C15.3017 7.54316 15.3012 7.54316 15.3007 7.54316C15.168 7.54316 15.0596 7.43572 15.0588 7.30297C15.0564 6.91466 14.7399 6.60102 14.3514 6.6042C13.9631 6.60659 13.6502 6.92333 13.6526 7.31164C13.6572 8.06187 14.1652 8.693 14.8536 8.88734V8.92137C14.8536 9.30969 15.1685 9.6245 15.5567 9.6245C15.945 9.6245 16.2598 9.30969 16.2598 8.92137V8.88589C16.5337 8.80995 16.7845 8.66389 16.9896 8.45614C17.2991 8.14273 17.468 7.72761 17.4649 7.28609V7.28169C17.4614 6.76597 17.2117 6.27491 16.7971 5.96816L15.1527 4.75161C14.9659 4.61342 15.064 4.31567 15.2967 4.31567H15.8135C15.947 4.31567 16.0555 4.42409 16.0555 4.55736C16.0555 4.94567 16.3703 5.26048 16.7586 5.26048C17.1469 5.26048 17.4617 4.94567 17.4617 4.55736C17.4617 3.80338 16.9523 3.16644 16.2597 2.97134V2.9375C16.2597 2.54919 15.9449 2.23438 15.5567 2.23438C15.1684 2.23438 14.8536 2.54919 14.8536 2.9375V2.97041C14.1594 3.16442 13.6484 3.80216 13.6484 4.55736C13.6485 5.07744 13.8981 5.57263 14.3163 5.88205Z"
                      />
                    <path
                        d="M15.5558 11.8741C18.8304 11.8741 21.4944 9.2108 21.4944 5.93705C21.4944 2.6633 18.8303 0 15.5558 0C12.2812 0 9.61719 2.66334 9.61719 5.93709C9.61719 9.21084 12.2812 11.8741 15.5558 11.8741ZM15.5558 1.40625C18.055 1.40625 20.0882 3.4388 20.0882 5.93709C20.0882 8.43539 18.055 10.4679 15.5558 10.4679C13.0566 10.4679 11.0234 8.43539 11.0234 5.93709C11.0234 3.4388 13.0566 1.40625 15.5558 1.40625Z"
                     />
                    <path
                        d="M23.5165 13.4715C22.756 12.4924 21.3832 12.3083 20.3949 12.9939L17.7197 14.7836C17.348 14.0914 16.617 13.6195 15.7777 13.6195H13.8694C12.9061 12.7161 11.6201 12.2031 10.2936 12.2031C9.29803 12.2031 8.32955 12.4844 7.49297 13.0165C6.73917 13.496 6.12258 14.1583 5.69888 14.9403L5.34066 15.1593L5.24785 14.8879C5.12222 14.5205 4.72266 14.3245 4.35525 14.45L0.475925 15.7756C0.108659 15.901 -0.0876531 16.3009 0.0379719 16.6684L2.38514 23.5338C2.51082 23.9014 2.91052 24.0971 3.27774 23.9717L7.15707 22.6462C7.50352 22.5278 7.73049 22.1497 7.58724 21.7307L13.7429 21.5401C15.4193 21.5379 17.0269 21.023 18.3925 20.0511L23.0346 16.7491C24.0989 15.9916 24.3186 14.5034 23.5165 13.4715ZM3.4883 22.4137L1.59605 16.8789L4.14469 16.0081C4.41924 16.8111 5.75358 20.714 6.03694 21.5429L3.4883 22.4137ZM22.2194 15.6033L17.5773 18.9052C16.448 19.709 15.1182 20.1338 13.7318 20.1338C13.7245 20.1338 13.7172 20.1339 13.71 20.1341L7.11127 20.3384L5.80674 16.5226L6.59963 16.0377C6.59982 16.0376 6.59996 16.0375 6.60014 16.0374C6.71686 15.9659 6.80813 15.8611 6.86382 15.7476C7.51092 14.4287 8.82516 13.6093 10.2936 13.6093C11.3548 13.6093 12.3404 14.0341 13.0688 14.8055C13.203 14.9476 13.3958 15.0257 13.58 15.0257H15.7777C16.217 15.0257 16.5744 15.3828 16.5744 15.8219C16.5744 16.2564 16.223 16.6182 15.7777 16.6182H11.8107C11.4224 16.6182 11.1076 16.933 11.1076 17.3213C11.1076 17.7096 11.4225 18.0244 11.8107 18.0244H15.7777C16.3666 18.0244 16.9199 17.7951 17.3351 17.3793C17.6257 17.0888 17.8247 16.7315 17.9187 16.3423L21.1822 14.159C21.1861 14.1564 21.19 14.1537 21.1939 14.151C21.5787 13.8821 22.1118 13.9553 22.4061 14.3342C22.7165 14.7336 22.6316 15.3099 22.2194 15.6033Z"
                        />
                </g>
                <defs>
                    <clipPath id="clip0_6771_33770">
                        <rect width={ width } height={ height } fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    );

};
