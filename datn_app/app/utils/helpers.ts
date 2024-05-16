import {ITEMS_LIMIT} from './constant';

export const isPhone = (number: string) => {
    return /([\\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
};

export const addCurrencySeparator = val => {
    return String(val).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'); // 1234 -> 1,234
};

export const cutCurrencySeparator = val => {
    return String(val).replace(/,/g, ''); // 1,234 -> 1234
};

export const getCurrentPage = (total: number, limit = ITEMS_LIMIT) => {
    return Math.floor((total + limit - 1) / limit);
};

export const stringToSlug = str => {
    // remove accents
    const from =
        'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ';
    const to =
        'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, ' ')
        .replace(/-+/g, '');

    return str;
};

export const getBlobFile = async (uri: string) => {
    const fetchFile = await fetch(uri);
    const imgBlob = await fetchFile.blob();
    return imgBlob;
};

export const ConstRegex = {
    VALIDATE_EMAIL:
        /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i,
};

export const isEmail = email => {
    return email.match(ConstRegex.VALIDATE_EMAIL);
};

export const getFileName = fullPath => {
    const filename = fullPath.replace(/^.*[\\\/]/, '');
    return filename;
};
export const generateId = length => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
};
