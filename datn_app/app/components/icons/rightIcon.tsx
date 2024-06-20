import {Center, View} from 'native-base';
import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const RighIconComponent = props => (
    <View>
        <Svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <G id="SVGRepo_bgCarrier" strokeWidth={0} />
            <G
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <G id="SVGRepo_iconCarrier">
                <Path
                    d="M10 7L15 12L10 17"
                    stroke="#686D76"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
        </Svg>
    </View>
);
export default RighIconComponent;
