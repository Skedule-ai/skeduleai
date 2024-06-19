import * as Yup from 'yup';

const organizationDetailsSchema = Yup.object().shape({
    organizationName: Yup.string().min(2, 'Minimum 2 characters required').required('Required'),
    timezone: Yup.string().min(2, 'Minimum 2 characters required').required('Required'),
    currency: Yup.string().min(2, 'Minimum 2 characters required').required('Required'),
});

const availabilityDetailsSchema = Yup.object().shape({
    businessHours: Yup.string().required('Business hours are required'),
    duration: Yup.number()
        .required('Number of slots is required')
        .min(1, 'At least one slot is required'),
    businessDays: Yup.array().of(Yup.string()).required('At least one business day is required'),
});

export { organizationDetailsSchema, availabilityDetailsSchema };
