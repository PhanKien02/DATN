import {Center, Icon} from 'native-base';
import React from 'react';
import {G, Path} from 'react-native-svg';
interface Props {
    color?: string;
}
function NotificationIcon({color}: Props) {
    return (
        <Center>
            <Icon viewBox="0 0 30 16" fill="none" size={10}>
                <G
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill={color || '#FBC632'}>
                    <Path d="M14.802 19.832a.76.76 0 01.742 1.122 3.132 3.132 0 01-.841.966c-.353.272-.763.48-1.203.62-.44.141-.907.212-1.376.212-.469 0-.936-.07-1.376-.211-.44-.14-.85-.35-1.202-.621a3.13 3.13 0 01-.841-.966.76.76 0 01.741-1.122c.193.019 1.697.166 2.678.166.981 0 2.486-.147 2.678-.166zM15.742 1.987a8.643 8.643 0 00-7.213.1C6.277 3.166 4.853 5.375 4.853 7.793v1.274A6.606 6.606 0 014 12.308l-.227.403c-1.397 2.483.13 5.554 3.018 6.067a30.5 30.5 0 0010.665 0l.16-.028c2.85-.506 4.438-3.46 3.219-5.987l-.266-.55a6.76 6.76 0 01-.675-2.94V8.01c0-2.548-1.54-4.863-3.946-5.931l-.205-.092zM9.748 13.998a.75.75 0 000 1.5h5a.75.75 0 100-1.5h-5z" />
                </G>
            </Icon>
        </Center>
    );
}

export default NotificationIcon;
