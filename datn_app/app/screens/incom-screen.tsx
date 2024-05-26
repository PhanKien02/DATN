import {Text, View} from 'native-base';
import {useAppSelector} from '../models/root-store/root-store';

export const IncomeScreen = () => {
    const user = useAppSelector(state => state.auth);
    return (
        <>
            <View w="100%" h="72" margin={0}>
                <Text>Income {user.user.fullName}</Text>
            </View>
        </>
    );
};
