import * as Yup from 'yup';

const availabilityFormValidation = Yup.object().shape({
    businessHours: Yup.string().required('Business hours are required'),
    numberOfSlots: Yup.number()
        .required('Number of slots is required')
        .min(1, 'At least one slot is required'),
    businessDays: Yup.array().of(Yup.string()).required('At least one business day is required'),
});

export default availabilityFormValidation;
