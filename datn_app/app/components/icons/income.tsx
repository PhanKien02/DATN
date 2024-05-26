import {Icon} from 'native-base';
import * as React from 'react';
import {G, Path} from 'react-native-svg';
const IncomeTab = props => (
    <Icon
        fill="#FBC632"
        viewBox="0 0 24 14"
        xmlns="http://www.w3.org/2000/svg"
        size="3xl"
        {...props}>
        <Path
            stroke="#FBC632"
            d="M6 5v.5A2.5 2.5 0 013.5 8H3v4h.541a2.5 2.5 0 012.5 2.5v.5H18v-.5a2.5 2.5 0 012.5-2.5h.5V8h-.5A2.5 2.5 0 0118 5.5V5H6zM5 5h-.5A1.5 1.5 0 003 6.5V7h.5A1.5 1.5 0 005 5.5V5zm.041 10v-.5a1.5 1.5 0 00-1.5-1.5H3v.5A1.5 1.5 0 004.5 15h.541zm.684 1a.499.499 0 01-.367 0H4.5A2.5 2.5 0 012 13.5v-7A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v7a2.5 2.5 0 01-2.5 2.5H5.725h0zM19 15h.5a1.5 1.5 0 001.5-1.5V13h-.5a1.5 1.5 0 00-1.5 1.5v.5zm0-10v.5A1.5 1.5 0 0020.5 7h.5v-.5A1.5 1.5 0 0019.5 5H19zm-7 9a4 4 0 110-8 4 4 0 010 8zm0-1a3 3 0 100-6 3 3 0 000 6zm-9.5 5a.5.5 0 110-1h19a.5.5 0 110 1h-19zm0 2a.5.5 0 110-1h19a.5.5 0 110 1h-19z"
        />
    </Icon>
);
export default IncomeTab;
