import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const BackIcon = props => (
    <Svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        {...props}>
        <G id="SVGRepo_bgCarrier" strokeWidth={0} />
        <G
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <G id="SVGRepo_iconCarrier">
            <Path
                fill="#fff"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            />
            <Path
                fill="#fff"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            />
        </G>
    </Svg>
);
export default BackIcon;
