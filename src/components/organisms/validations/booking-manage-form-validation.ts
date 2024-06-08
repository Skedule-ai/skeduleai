import * as Yup from 'yup';

const BookinManageSchema = Yup.object().shape({
    meetingDuration: Yup.string().required('Meeting Duration is Required'),
    selectDate: Yup.date().required('Date is Required'),
    selectTime: Yup.string().required('Time is Required'),
    timeZone: Yup.string().required('Time Zone is Required'),
});

export default BookinManageSchema;
