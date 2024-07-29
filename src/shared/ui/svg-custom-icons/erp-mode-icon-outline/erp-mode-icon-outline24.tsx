import React from 'react';
import { typeSvgCustomIcon } from 'shared/ui/svg-custom-icons/types';

export const ErpModeIconOutline24: React.FC<typeSvgCustomIcon> = ({
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
            <svg width={ width } height={ height } viewBox={ `0 0 ${ width } ${ height }` } fill="currentColor" xmlns="http://www.w3.org/2000/svg">

                <g clipPath="url(#clip0_8548_61300)">
                    <path
                        d="M8.61175 10.4844C9.54367 10.4498 9.54297 9.11239 8.61175 9.07812H7.10547C6.71716 9.07812 6.40234 9.39294 6.40234 9.78125V14.3C6.40234 14.6883 6.71716 15.0031 7.10547 15.0031H8.61175C9.54367 14.9685 9.54297 13.6311 8.61175 13.5969H7.80859V12.7437H8.2352C9.16713 12.7092 9.16642 11.3718 8.2352 11.3375H7.80859V10.4844H8.61175Z"
                        />
                    <path
                        d="M18.3512 11.2875C18.3512 10.6968 18.1212 10.1418 17.7039 9.725C17.2867 9.30786 16.7319 9.07812 16.1418 9.07812H15.3887C15.0004 9.07812 14.6855 9.39294 14.6855 9.78125V14.3C14.7201 15.2319 16.0575 15.2312 16.0918 14.3V13.4969H16.1418C16.7317 13.4969 17.2865 13.267 17.7035 12.8499C18.1152 12.4389 18.3512 11.8694 18.3512 11.2875ZM16.1418 12.0906H16.0918V10.4843H16.1418C17.2029 10.5214 17.2087 12.0495 16.1418 12.0906Z"
                        />
                    <path
                        d="M13.8336 11.2875C13.8336 10.0671 12.8469 9.07812 11.6242 9.07812H10.8711C10.4828 9.07812 10.168 9.39294 10.168 9.78125V14.3C10.2026 15.2319 11.54 15.2312 11.5742 14.3V13.7381L12.6333 14.7972C12.9078 15.0717 13.353 15.0718 13.6276 14.7972C13.9022 14.5226 13.9022 14.0774 13.6276 13.8028L12.9093 13.0844C13.8779 12.3883 13.8336 11.3141 13.8336 11.2875ZM11.6242 12.0906H11.5742V10.4843H11.6242C12.6849 10.5212 12.6915 12.0493 11.6242 12.0906Z"
                        />
                    <path
                        d="M12 0.0390625C5.38317 0.0390625 0 5.42223 0 12.0391C0.603281 27.9368 23.3992 27.9325 24 12.0389C24 5.42223 18.6168 0.0390625 12 0.0390625ZM12 19.6203C7.81969 19.6203 4.41877 16.2194 4.41877 12.0391C4.79991 1.9953 19.2016 1.99806 19.5813 12.0392C19.5812 16.2194 16.1803 19.6203 12 19.6203ZM1.40625 12.0391C1.40625 10.8518 1.60256 9.70956 1.96444 8.64306L3.45291 9.2597C2.86941 10.9944 2.86941 13.0836 3.45291 14.8183L1.96439 15.4348C1.60256 14.3684 1.40625 13.2262 1.40625 12.0391ZM20.5471 9.2597L22.0356 8.64306C22.7752 10.7552 22.7752 13.3227 22.0357 15.4348L20.5471 14.8184C21.1306 13.0836 21.1306 10.9944 20.5471 9.2597ZM21.495 7.34481L20.0077 7.96094C19.1451 6.27395 17.7649 4.89377 16.0779 4.03117L16.694 2.54392C18.7712 3.57503 20.4639 5.26769 21.495 7.34481ZM15.3959 2.00345L14.7792 3.49192C13.0446 2.90847 10.9554 2.90847 9.22078 3.49192L8.60414 2.00345C10.7162 1.26391 13.2838 1.26391 15.3959 2.00345ZM7.30594 2.54397L7.92206 4.03122C6.23503 4.89381 4.85484 6.274 3.9922 7.96098L2.505 7.34481C3.53611 5.26769 5.22877 3.57503 7.30594 2.54397ZM2.50486 16.733L3.9922 16.117C4.8548 17.804 6.23498 19.1842 7.92197 20.0468L7.30584 21.5341C5.22858 20.503 3.53592 18.8102 2.50486 16.733ZM8.604 22.0746L9.22064 20.5861C10.9553 21.1696 13.0447 21.1696 14.7794 20.5861L15.396 22.0746C13.2838 22.8142 10.7161 22.8142 8.604 22.0746ZM16.6942 21.5341L16.0781 20.0468C17.7651 19.1842 19.1453 17.804 20.0078 16.117L21.4952 16.733C20.4641 18.8102 18.7714 20.503 16.6942 21.5341Z"
                        />
                </g>
                <defs>
                    <clipPath id="clip0_8548_61300">
                        <rect width={ width } height={ height } fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    );

};
