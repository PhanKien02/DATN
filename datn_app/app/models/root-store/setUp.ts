import {KeyAsyncStorage} from '../../constants/asyncStorage';
import {load} from '../../utils/storage';
export const setUpRootStore = async () => {
    const user = (await load(KeyAsyncStorage.USER)) || {};
    const token = (await load(KeyAsyncStorage.TOKEN)) || '';

    return {user, token};
};
