import {Center, Icon} from 'native-base';
import React from 'react';
import {G, Path} from 'react-native-svg';

function SortDescending() {
    return (
        <Center>
            <Icon size={10} viewBox="0 0 28 24" color={'#FBC632'}>
                <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <G id="SVGRepo_iconCarrier">
                    <Path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z"></Path>
                </G>
            </Icon>
        </Center>
    );
}

export default SortDescending;
