import dayjs from 'dayjs';

export const formatDate = (date?: Date | string, format = 'YYYY-MM-DD') => {
    return dayjs(date).format(format);
};
export const formatDateTime = (date?: Date | string) => {
    return dayjs(date).format('YYYY-MM-DD HH:MM:ss');
};
