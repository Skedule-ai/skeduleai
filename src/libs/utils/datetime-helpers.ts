import moment from 'moment';
import { DaysEnum } from './enums';

export const getTimeStops = (start: string, end: string, duration: number) => {
    const startTime = moment(start, 'YYYY-MM-DD HH:mm:ss');
    const endTime = moment(end, 'YYYY-MM-DD HH:mm:ss');

    if (endTime.isBefore(startTime)) {
        endTime.add(1, 'day');
    }

    const timeStops = [];
    while (startTime <= endTime) {
        timeStops.push({
            startTime: moment(startTime).format('hh:mm a'),
            endTime: startTime.add(duration, 'minutes').format('hh:mm a'),
        });
    }
    return timeStops;
};

export const formatDate = (date: string) => {
    return moment(date, 'dd-mm-yyyy').toDate();
};

export const formatTime = (time: string) => {
    return moment(time).format('hh:mm a');
};

export const getTodayDate = (): Date => {
    return new Date();
};

export const addDuration = (time: string, duration: string) => {
    const startTime = moment(time);
    const formattedDuration = moment(duration).minutes();
    return startTime.add(formattedDuration, 'minutes').format('hh:mm a');
};

export const getTodaysDay = () => {
    return new Date().getDay() + 1;
};

export const DAYS_LIST = [
    DaysEnum.SUNDAY,
    DaysEnum.MONDAY,
    DaysEnum.TUESDAY,
    DaysEnum.WEDNESDAY,
    DaysEnum.THURSDAY,
    DaysEnum.FRIDAY,
    DaysEnum.SATURDAY,
];

export const getDefaultTimeZone = () => {
    return moment.tz.guess();
};
