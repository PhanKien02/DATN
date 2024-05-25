import {Center, Icon} from 'native-base';
import React from 'react';
import {G, Path} from 'react-native-svg';
interface Props {
    color?: string;
}
function LocationIcon({color}: Props) {
    return (
        <Center>
            <Icon size={12} viewBox="0 4 40 20" color={'#FBC632'}>
                <Path
                    d="M118 422a3 3 0 100 6 3 3 0 000-6zm0 8a5 5 0 110-10 5 5 0 010 10zm0-17c-6.627 0-12 5.373-12 12 0 5.018 10.005 20.011 12 20 1.964.011 12-15.05 12-20 0-6.627-5.373-12-12-12z"
                    transform="translate(-106 -413)"
                    fill={color || '#FBC632'}
                    stroke="none"
                    strokeWidth={1}
                    fillRule="evenodd"
                />
            </Icon>
        </Center>
    );
}

export default LocationIcon;
