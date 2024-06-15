import moment from 'moment';

export const getTimeStops = (start: string, end: string, duration: number) => {
    const startTime = moment(start, 'hh:mm a');
    const endTime = moment(end, 'hh:mm a');
    console.log(startTime, endTime);
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

export const addDuration = (time: string, duration: string) => {
    const startTime = moment(time);
    const formattedDuration = moment(duration).minutes();
    return startTime.add(formattedDuration, 'minutes').format('hh:mm a');
};
